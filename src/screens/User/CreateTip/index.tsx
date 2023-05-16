import { useNavigation } from "@react-navigation/native";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import { Container } from "../../../styles/global";
import { Button, ButtonCancel, ButtonTitle } from "./styles";
import { ActivityIndicator, TextInput } from "react-native";
import { useContext, useState } from "react";
import { ITip } from "../../../interfaces/tip";
import { showNotification } from "../../../utils/notification";
import { AppContext } from "../../../context";

const perguntas = [
    'pergunta'
]

export default function CreateTip() {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { createTip } = useContext(AppContext)
    const [form, setForm] = useState<ITip>({
        title: '',
        description: ''
    })

    async function handleCreateTip() {
        setIsLoading(true)
        if (form.title != "" && form.description != "") {
            await createTip(form)
            navigation.navigate("ManageTips")
            return
        }
        showNotification({
            title: "Aviso",
            description: "Preencha os campos corretamente",
            type: "warn",
            duration: 2000
        })
        setIsLoading(false)

    }
    return (
        <>
            <Header title="Criar Recomendação" />
            <Container>
                <Input title="Titulo" onChangeText={(value) => setForm({ ...form, title: value })} />
                <Input title="Mensagem" onChangeText={(value) => setForm({ ...form, description: value })} textArea />
                <Button onPress={handleCreateTip} disable={isLoading}>
                    {
                        isLoading ?
                            <ActivityIndicator size={'small'} animating />
                            :
                            <ButtonTitle>
                                Enviar
                            </ButtonTitle>
                    }

                </Button>
                <ButtonCancel onPress={() => navigation.navigate("Home")} disable={isLoading}>
                    <ButtonTitle>
                        Cancelar
                    </ButtonTitle>
                </ButtonCancel>
            </Container>
        </>
    )
}
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import { Container } from "../../../styles/global";
import { Button, ButtonCancel, ButtonTitle } from "./styles";
import { ActivityIndicator, TextInput } from "react-native";
import { useContext, useEffect, useState } from "react";
import { ITip } from "../../../interfaces/tip";
import { showNotification } from "../../../utils/notification";
import { AppContext } from "../../../context";

export default function CreateTip() {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const route = useRoute()
    const data = route.params?.data ?? null
    const { createTip, updateTip } = useContext(AppContext)
    const [form, setForm] = useState<ITip>({
        title: '',
        description: ''
    })

    useEffect(() => {
        async function getTipUpdate() {
            setIsLoading(true)
            console.log("update")

            setForm(data)

            setIsLoading(false)
        }
        if (data != null) {
            getTipUpdate()
        }
    }, [])

    async function handleCreateTip() {
        setIsLoading(true)
        if (form.title != "" && form.description != "") {
            if (data != null) {
                await updateTip(data.id, form)
                navigation.navigate("Home")
            } else {
                await createTip(form)
                navigation.navigate("Home")
            }
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
                <Input title="Titulo" onChangeText={(value) => setForm({ ...form, title: value })} value={form.title} />
                <Input title="Mensagem" onChangeText={(value) => setForm({ ...form, description: value })} textArea value={form.description} />
                <Button onPress={handleCreateTip} disable={isLoading}>
                    {
                        isLoading ?
                            <ActivityIndicator size={'small'} animating />
                            :

                            data != null ?
                                <ButtonTitle>
                                    Atualizar
                                </ButtonTitle>
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
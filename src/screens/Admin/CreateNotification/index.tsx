import { useNavigation } from "@react-navigation/native";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import { Container } from "../../../styles/global";
import { Button, ButtonCancel, ButtonTitle } from "./styles";
import { useContext, useState } from "react";
import { INotification } from "../../../interfaces/notification";
import { showNotification } from "../../../utils/notification";
import { AppContext } from "../../../context";
import { ActivityIndicator } from "react-native";

export default function CreateNotification() {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { createNotification } = useContext(AppContext)
    const [form, setForm] = useState<INotification>({
        title: '',
        description: ''
    })


    async function handleSendNotification() {
        try {
            if (form.title !== '' && form.description !== '') {
                await createNotification(form)
                showNotification({
                    title: "Aviso",
                    description: "Foi enviado com sucesso a notificação",
                    type: "success",
                    duration: 2000
                })
                navigation.navigate("ManageNotifications")
                return
            }
            showNotification({
                title: "Aviso",
                description: "Preencha os campos corretamente",
                type: "warn",
                duration: 2000
            })
        } catch (error) {
            showNotification({
                title: "Aviso",
                description: "Erro ao enviar, tenta mais tarde",
                type: "error",
                duration: 2000
            })
        }
    }

    return (
        <>
            <Header title="Enviar uma notificação" />
            <Container>
                <Input title="Titulo" onChangeText={(value) => setForm({ ...form, title: value })} />
                <Input title="Mensagem" onChangeText={(value) => setForm({ ...form, description: value })} textArea />
                <Button onPress={handleSendNotification} disable={isLoading}>
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
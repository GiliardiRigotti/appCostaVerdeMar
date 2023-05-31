import { useNavigation } from "@react-navigation/native";

import Header from "../../../components/Header";
import Input from "../../../components/Input";
import { Container } from "../../../styles/global";
import { Button, ButtonCancel, ButtonTitle } from "./styles";
import { showNotification } from "../../../utils/notification";
import { IUser } from "../../../interfaces/user";
import { useContext, useState } from "react";
import { AppContext } from "../../../context";
import Checkbox from "../../../components/Checkbox";
import { ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { colors } from "../../../constants/colors";

export default function CreateOrder() {
    const { createOrder, userAuth } = useContext(AppContext)
    const [isLoad, setIsLoad] = useState<boolean>(false)
    const [form, setForm] = useState<IOrder>({
        title: "",
        description: "",
        idClient: userAuth?.id,
        status: 'open',
    })
    const navigation = useNavigation()

    async function handleSignUp() {
        try {
            setIsLoad(true)
            if (form.title !== "" && form.description !== "") {
                const newOrder = await createOrder(form)
                if (newOrder) {
                    showNotification({
                        title: "Aviso",
                        description: "Foi aberto o chamado",
                        type: "success",
                        duration: 2000
                    })

                }
            } else {
                showNotification({
                    title: "Aviso",
                    description: "Preencha os campos corretamente",
                    type: "warn",
                    duration: 2000
                })
            }
            navigation.navigate("ManageOrders")
        } catch (error) {
            showNotification({
                title: "Aviso",
                description: "Erro ao abrir o chamado, tenta mais tarde",
                type: "error",
                duration: 2000
            })
        } finally {
            setIsLoad(false)
        }
    }
    return (
        <>
            <Header title="Abertura de chamado técnico" />
            <Container>
                <Input title="Titulo" onChangeText={(value) => setForm({ ...form, title: value })} />
                <Input title="Descrição" onChangeText={(value) => setForm({ ...form, description: value })} textArea />

                <Button onPress={handleSignUp} disabled={isLoad}>
                    {
                        isLoad ?
                            <ActivityIndicator size={20} color={colors.white} animating />
                            :
                            <ButtonTitle>
                                Abrir chamado
                            </ButtonTitle>
                    }
                </Button>
                <ButtonCancel onPress={() => navigation.navigate("Home")} disabled={isLoad}>
                    <ButtonTitle>
                        Cancelar
                    </ButtonTitle>
                </ButtonCancel>
            </Container>
        </>
    )
}
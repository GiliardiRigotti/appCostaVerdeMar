import Header from "../../../components/Header";
import Input from "../../../components/Input";
import { Container } from "../../../styles/global";
import { Button, ButtonCancel, ButtonTitle } from "./styles";
import { showNotification } from "../../../utils/notification";
import { useContext, useState } from "react";
import { AppContext } from "../../../context";
import Checkbox from "../../../components/Checkbox";
import { ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { colors } from "../../../constants/colors";
import { serverTimestamp } from "firebase/firestore";
import { IOrder } from "../../../interfaces/orders";

export default function CreateOrder({ navigation }) {
    const { createOrder, userAuth } = useContext(AppContext)
    const [isLoad, setIsLoad] = useState<boolean>(false)
    const date = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
    const [form, setForm] = useState<IOrder>({
        title: "",
        description: "",
        idClient: userAuth?.id,
        status: 'aberto',
        create_at: date,
    })

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
            navigation.navigate("OpenOrders")
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
                <Input title="Titulo" onChangeText={(value) => setForm({ ...form, title: value })} width={100} />
                <Input title="Descrição" onChangeText={(value) => setForm({ ...form, description: value })} width={100} textArea />

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
                <ButtonCancel onPress={() => navigation.navigate("OpenOrders")} disabled={isLoad}>
                    <ButtonTitle>
                        Cancelar
                    </ButtonTitle>
                </ButtonCancel>
            </Container>
        </>
    )
}
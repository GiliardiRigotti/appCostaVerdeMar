import { useNavigation, useRoute } from "@react-navigation/native";

import Header from "../../../components/Header";
import Input from "../../../components/Input";
import { Container } from "../../../styles/global";
import { Button, ButtonCancel, ButtonTitle } from "./styles";
import { showNotification } from "../../../utils/notification";
import { IUser } from "../../../interfaces/user";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context";
import Checkbox from "../../../components/Checkbox";
import { KeyboardAvoidingView, Platform } from "react-native";

export default function CreateUser() {
    const route = useRoute()
    const data = route.params?.data ?? null
    const { createUser, updateUser } = useContext(AppContext)
    const [isLoad, setIsLoad] = useState<boolean>(false)
    const [form, setForm] = useState<IUser>({
        name: "",
        address: "",
        city: "",
        district: "",
        email: "",
        number: "",
        phone: "",
        password: "",
        administrator: false
    })
    const navigation = useNavigation()

    useEffect(() => {
        async function getUserUpdate() {
            setIsLoad(true)
            console.log("update")

            setForm(data)

            setIsLoad(false)
        }
        if (data != null) {
            getUserUpdate()
        }
    }, [])

    async function handleSignUp() {
        setIsLoad(true)
        if (form.name !== "" && form.address !== "" && form.city !== "" && form.district !== "" && form.email !== "" && form.number !== "" && form.phone !== "" && form.password !== "") {
            if (data != null) {
                await updateUser(data.id, form)
                navigation.canGoBack()
            } else {
                await createUser(form)
                navigation.canGoBack()
            }

        } else {
            setIsLoad(false)
            showNotification({
                title: "Aviso",
                description: "Preencha os campos corretamente",
                type: "warn",
                duration: 2000
            })
        }
    }
    if (isLoad) {
        return (
            <>
                <Header />
                <Container>

                </Container>
            </>
        )
    }
    return (
        <>
            <Header title="Criação de usuário" />
            <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: 1, width: "100%" }}
                keyboardVerticalOffset={80}
            >
                <Container>
                    <Input title="Nome" onChangeText={(value) => setForm({ ...form, name: value })} value={form.name} />
                    <Input title="E-mail" onChangeText={(value) => setForm({ ...form, email: value })} value={form.email} />
                    <Input title="Senha" onChangeText={(value) => setForm({ ...form, password: value })} secureTextEntry value={form.password} />
                    <Input title="DDD + Telefone" onChangeText={(value) => setForm({ ...form, phone: value })} value={form.phone} />
                    <Input title="Cidade" onChangeText={(value) => setForm({ ...form, city: value })} value={form.city} />
                    <Input title="Bairro" onChangeText={(value) => setForm({ ...form, district: value })} value={form.district} />
                    <Input title="Endereço" onChangeText={(value) => setForm({ ...form, address: value })} value={form.address} />
                    <Input title="Numero" onChangeText={(value) => setForm({ ...form, number: value })} value={form.number} />{/* 
                    <Checkbox title="Administrador?" value={form.administrator} onPress={() => setForm({ ...form, administrator: !form.administrator })} /> */}
                    <Button onPress={handleSignUp} disabled={isLoad}>
                        {
                            data != null ?
                                <ButtonTitle>
                                    Atualizar
                                </ButtonTitle>
                                :
                                <ButtonTitle>
                                    Cadastrar
                                </ButtonTitle>
                        }
                    </Button>
                    <ButtonCancel onPress={() => navigation.navigate("Home")} disabled={isLoad}>
                        <ButtonTitle>
                            Cancelar
                        </ButtonTitle>
                    </ButtonCancel>
                </Container>
            </KeyboardAvoidingView>
        </>
    )
}
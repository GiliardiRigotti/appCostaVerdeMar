import { useNavigation, useRoute } from "@react-navigation/native";
import * as DocumentPicker from 'expo-document-picker';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import Header from "../../../components/Header";
import Input from "../../../components/Input";
import { Button, ButtonCancel, ButtonTitle, Container } from "./styles";
import { showNotification } from "../../../utils/notification";
import { IUser } from "../../../interfaces/user";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context";
import Checkbox from "../../../components/Checkbox";
import { storage } from "../../../config/firebase";
import { Alert } from "react-native";
import { enigma } from "../../../utils/enigma";
import { Load } from "../../../components/LoadUpload";
import { View } from "react-native";
import { colors } from "../../../constants/colors";
import InputMask from "../../../components/InputMask";

export default function CreateUser() {
    const route = useRoute()
    const data = route.params?.data ?? null
    const { createUser, updateUser } = useContext(AppContext)
    const [isLoad, setIsLoad] = useState<boolean>(false)
    const [fileName, setFileName] = useState<string>()
    const [blobFile, setBlobFile] = useState()
    const [form, setForm] = useState<IUser>({
        name: " ",
        address: " ",
        city: " ",
        district: " ",
        email: " ",
        number: " ",
        phone: " ",
        password: " ",
        contractUrl: " ",
        administrator: false
    })
    const navigation = useNavigation()

    useEffect(() => {
        async function getUserUpdate() {
            setIsLoad(true)

            setForm(data)

            setIsLoad(false)
        }
        if (data != null) {
            getUserUpdate()
        }
    }, [])

    const uploadFile = (blobFile, fileName) => {

        setIsLoad(true)

        if (!blobFile) {
            Alert.prompt('Selecione novamente o arquivo')

            return ''
        }
        const sotrageRef = ref(storage, `contratos/${fileName}`); //LINE A
        const uploadTask = uploadBytesResumable(sotrageRef, blobFile); //LINE B
        uploadTask.on(
            "state_changed", null,
            (error) => {
                console.error(error)
                Alert.prompt('Erro ao subir o arquivo', JSON.stringify(error))
                setIsLoad(false)
                return ''
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => { //LINE C
                    console.log("File available at", downloadURL.split("o/")[1]);
                    //return downloadURL.split("o/")[1]
                    setForm({ ...form, contractUrl: downloadURL.split("o/")[1] })
                    setIsLoad(false)
                });
            }
        );
    }

    const pickDocument = async () => {
        const result = await DocumentPicker.getDocumentAsync({})
        console.log(result)
        if (result.type == "success") {
            setIsLoad(true)
            const r = await fetch(result.uri);
            const b = await r.blob();
            setFileName(result.name)
            setBlobFile(b)
            uploadFile(b, result.name)

        }
    }

    async function handleSignUp() {
        setIsLoad(true)
        if (form.name !== "" && form.address !== "" && form.city !== "" && form.district !== "" && form.email !== "" && form.number !== "" && form.phone !== "" && form.password !== "") {
            if (data != null) {
                await updateUser(data.id, form)
                setIsLoad(false)
                navigation.goBack()
            } else {
                await createUser(form)
                setIsLoad(false)
                navigation.goBack()
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

    useEffect(() => { console.log(form.contractUrl) }, [form])
    useEffect(() => { console.log(isLoad) }, [isLoad])

    if (isLoad) {
        return (
            <View style={{ flex: 1, backgroundColor: colors.green }}>
                <Header />
                <Load />
            </View>
        )
    }
    return (
        <>
            <Header title="Criação de usuário" />
            <Container>
                <Input title="Nome" onChangeText={(value) => setForm({ ...form, name: value })} value={form.name} width={80} />
                <Input title="E-mail" onChangeText={(value) => setForm({ ...form, email: value })} value={form.email} width={80} />
                <Input title="Senha" onChangeText={async (value) => setForm({ ...form, password: await enigma(value) })} secureTextEntry placeholder="Senha" width={80} />
                <InputMask title="DDD + Telefone" onChangeText={(text, rawText) => { console.log(text, rawText) }} width={80} mask="(99)99999-9999" keyboardType="decimal-pad" />
                <Input title="Cidade" onChangeText={(value) => setForm({ ...form, city: value })} value={form.city} width={80} />
                <Input title="Bairro" onChangeText={(value) => setForm({ ...form, district: value })} value={form.district} width={80} />
                <Input title="Endereço" onChangeText={(value) => setForm({ ...form, address: value })} value={form.address} width={80} />
                <Input title="Numero" onChangeText={(value) => setForm({ ...form, number: value })} value={form.number} width={80} />
                <Checkbox title="Administrador?" value={form.administrator} onPress={() => setForm({ ...form, administrator: !form.administrator })} />
                <Button onPress={pickDocument} disabled={isLoad}>
                    {
                        fileName ?
                            <ButtonTitle>
                                Contrato adicionado
                            </ButtonTitle>
                            :
                            <ButtonTitle>
                                Adicionar Contrato
                            </ButtonTitle>
                    }
                </Button>
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
        </>
    )
}
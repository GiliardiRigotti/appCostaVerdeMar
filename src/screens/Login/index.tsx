import { ActivityIndicator, Image, KeyboardAvoidingView } from "react-native";
import Input from "../../components/Input";
import { images } from "../../assets/images";
import { Button, ButtonTitle, Link, LinkTitle } from "./styles";
import { useContext, useState } from "react";
import { ISignIn } from "../../interfaces/user";
import { useNavigation } from "@react-navigation/native";
import { showNotification } from "../../utils/notification";
import { AppContext } from "../../context";
import { Container } from "../../styles/global";
import { colors } from "../../constants/colors";

export default function Login() {
    const navigation = useNavigation()
    const [isLoad, setIsLoad] = useState<boolean>(false)
    const { login, findUser, userAuth } = useContext(AppContext)
    const [formLogin, setFormLogin] = useState<ISignIn>({
        email: '',
        password: ''
    })

    async function handleSignIn() {
        setIsLoad(true)
        if (formLogin.email != '' && formLogin.password != '') {
            //const auth = await login(formLogin)
            await login(formLogin)
            setIsLoad(false)
            return
        }
        setIsLoad(false)
        showNotification({
            title: "Aviso",
            description: "Verifica se os campos foram preenchidos",
            type: "warn",
            duration: 2000,
        })
    }

    async function handleForgotPassword() {
        setIsLoad(true)
        if (formLogin.email != '') {
            await login(formLogin)
            setIsLoad(false)
            return
        }
        showNotification({
            title: "Aviso",
            description: "Digite seu e-mail para poder mandar o e-mail para redefinição de senha",
            type: "warn",
            duration: 2000,
        })
        setIsLoad(false)
    }

    return (
        <Container>
            <KeyboardAvoidingView
                behavior="position"
                keyboardVerticalOffset={40}
                contentContainerStyle={{
                    alignItems: "center",
                    width: "100%",
                }}
                style={{ width: "100%" }}
            >
                <Image source={images.logo} style={{ width: 450, height: 300, resizeMode: "contain" }} />
                <Input title="E-mail" onChangeText={(value) => setFormLogin({ ...formLogin, email: value })} placeholder="exemplo@email.com" />
                <Input title="Senha" onChangeText={(value) => setFormLogin({ ...formLogin, password: value })} placeholder="senha" secureTextEntry />
            </KeyboardAvoidingView>
            <Button onPress={handleSignIn} disable={isLoad}>
                {
                    isLoad ?
                        <ActivityIndicator size="small" animating color={colors.white} />
                        :
                        <ButtonTitle>
                            Entrar
                        </ButtonTitle>
                }
            </Button>
            <Link onPress={handleForgotPassword} disable={isLoad}>
                {
                    isLoad ?
                        <ActivityIndicator size="small" animating color={colors.white} />
                        :
                        <LinkTitle>
                            Esqueceu a senha?
                        </LinkTitle>
                }

            </Link>
        </Container>
    )
}
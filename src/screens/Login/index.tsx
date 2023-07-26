import { ActivityIndicator, Image, KeyboardAvoidingView } from "react-native";
import Input from "../../components/Input";
import { images } from "../../assets/images";
import { Button, ButtonTitle, Container, Link, LinkTitle } from "./styles";
import { useContext, useState } from "react";
import { ISignIn } from "../../interfaces/user";
import { showNotification } from "../../utils/notification";
import { AppContext } from "../../context";
import { colors } from "../../constants/colors";

export default function Login() {
    const [isLoad, setIsLoad] = useState<boolean>(false)
    const { login } = useContext(AppContext)
    const [formLogin, setFormLogin] = useState<ISignIn>({
        email: '',
        password: ''
    })

    async function handleSignIn() {
        setIsLoad(true)
        if (formLogin.email != '' && formLogin.password != '') {
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

            <Image source={images.logo} style={{ width: 450, height: 300, resizeMode: "contain" }} />
            <Input title="E-mail" onChangeText={(value) => setFormLogin({ ...formLogin, email: value })} placeholder="exemplo@email.com" width={80} />
            <Input title="Senha" onChangeText={(value) => setFormLogin({ ...formLogin, password: value })} placeholder="senha" secureTextEntry width={80} />

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
            
        </Container>
    )
}
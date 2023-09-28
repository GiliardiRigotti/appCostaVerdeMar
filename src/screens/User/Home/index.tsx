import { useContext } from "react";
import Card from "../../../components/Card";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import { colors } from "../../../constants/colors";
import { AppContext } from "../../../context";
import { Container } from "./styles";
import { Alert, Linking } from "react-native";


export default function Home() {
    const { userAuth } = useContext(AppContext)
    const linkDownload = "https://firebasestorage.googleapis.com/v0/b/appelevador-d1bdb.appspot.com/o/"

    function handleDownloadContract() {
        Linking.openURL(linkDownload + userAuth.contractUrl)
    }

    return (
        <>
            <Header title={userAuth ? userAuth.name : 'Usuario'} />
            <Container>
                <Card
                    title="SUPORTE"
                    description="Abrir chamados tecnicos "
                    goTo="OpenOrders" bgColor={colors.green}
                    fontColor={colors.white}
                />
                <Card
                    title="NOTIFICAÇÕES"
                    description=""
                    goTo="ListNotifications" bgColor={colors.yellow}
                    fontColor={colors.black}
                />
                <Card
                    title="DADOS CONTRATUAIS"
                    description=""
                    bgColor={colors.blue}
                    onPress={handleDownloadContract}
                    fontColor={colors.white}
                />
                <Card
                    title="RECOMENDAÇÕES"
                    description="Recomendaçõs tecnicos para cuidado do elevador"
                    goTo="ListTips" bgColor={colors.green}
                    fontColor={colors.white}
                />
            </Container>
            <Footer />
        </>

    )
}
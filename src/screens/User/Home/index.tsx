import { useContext } from "react";
import Card from "../../../components/Card";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import { colors } from "../../../constants/colors";
import { AppContext } from "../../../context";
import { Container } from "./styles";


export default function Home() {
    const { userAuth } = useContext(AppContext)
    return (
        <>
            <Header title={userAuth ? userAuth.name : 'Usuario'} />
            <Container>
                <Card
                    title="Suporte"
                    description="Abrir chamados tecnicos "
                    goTo="OpenOrders" bgColor={colors.green}
                    fontColor={colors.white}
                />
                <Card
                    title="Notificações"
                    description=""
                    goTo="ListNotifications" bgColor={colors.yellow}
                    fontColor={colors.black}
                />
                <Card
                    title="Recomendações"
                    description="Recomendaçõs tecnicos para cuidado do elevador"
                    goTo="ListTips" bgColor={colors.blue}
                    fontColor={colors.white}
                />
            </Container>
            <Footer />
        </>

    )
}
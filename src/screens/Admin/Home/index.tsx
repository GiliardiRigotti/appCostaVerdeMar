import Card from "../../../components/Card";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import { colors } from "../../../constants/colors";
import { Container } from "../../../styles/global";


export default function Home() {
    return (
        <>
            <Header title="Inicio" />
            <Container>
                <Card
                    title="Usuarios"
                    description="Gerencie os usuarios"
                    goTo="ManageUsers" bgColor={colors.green}
                    fontColor={colors.white}
                />
                <Card
                    title="Notificações"
                    description="Gerencie as notificações"
                    goTo="ManageNotifications" bgColor={colors.yellow}
                    fontColor={colors.black}
                />
                <Card
                    title="Dicas"
                    description="Gerencie as dicas"
                    goTo="ManageTips" bgColor={colors.blue}
                    fontColor={colors.white}
                />
                <Card
                    title="Ordem de serviço"
                    description="Gerencie as ordens de serviços"
                    goTo="ManageOrderofService" bgColor={colors.blueLight}
                    fontColor={colors.black}
                />
            </Container>
            <Footer />
        </>

    )
}
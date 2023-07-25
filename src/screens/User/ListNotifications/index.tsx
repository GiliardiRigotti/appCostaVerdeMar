import { useContext } from "react";
import CardUser from "../../../components/CardItem";
import Header from "../../../components/Header";
import { Container } from "../../../styles/global";
import { AppContext } from "../../../context";
import AddButton from "../../../components/AddButton";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Footer from "../../../components/Footer";


export default function ListNotifications() {
    const navigation = useNavigation()
    const { listNotifications } = useContext(AppContext)
    return (
        <>
            <Header title="Notificações" />
            <Container>
                <ScrollView
                    style={{
                        width: "100%"
                    }}
                    contentContainerStyle={{
                        alignItems: "center",
                    }}
                >
                    {
                        listNotifications.map((item, index) => <CardUser key={index} id={`${item.id}`} name={item.title} description={item.description} type="notification" />)
                    }
                </ScrollView>
            </Container>
            <Footer />
        </>

    )
}
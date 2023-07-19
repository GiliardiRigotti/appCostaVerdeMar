import { useContext } from "react";
import Header from "../../../components/Header";
import { AppContext } from "../../../context";
import { ScrollView } from "react-native";
import AddButton from "../../../components/AddButton";
import Footer from "../../../components/Footer";
import { ContainerScroll } from "./styles";
import Order from "../../../components/Order";
import { Container } from "../../../styles/global";


export default function ManageOrders({ navigation }) {
    const { listOrders } = useContext(AppContext)
    console.log(listOrders)
    return (
        <>
            <Header title="Suporte" />
            <Container>
                <ContainerScroll>
                    {
                        listOrders.map((item, index) => <Order key={item.id} data={item} />)
                    }
                </ContainerScroll>
            </Container>
            <Footer />
            <AddButton onPress={() => navigation.navigate("CreateOrder")} />
        </>

    )
}
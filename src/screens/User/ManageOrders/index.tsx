import { useContext, useMemo } from "react";
import Header from "../../../components/Header";
import { AppContext } from "../../../context";
import { ScrollView } from "react-native";
import AddButton from "../../../components/AddButton";
import Footer from "../../../components/Footer";
import { ContainerScroll } from "./styles";
import Order from "../../../components/Order";
import { Container } from "../../../styles/global";


export default function ManageOrders({ navigation }) {
    const { listOrders, userAuth } = useContext(AppContext)
    console.log(listOrders)
    const list = useMemo(() => {
        const listFiltered = listOrders.filter(item => item.idClient == userAuth.id)
        return listFiltered
    }, [listOrders])
    return (
        <>
            <Header title="Suporte" />
            <Container>
                <ContainerScroll>
                    {
                        list.map((item, index) => <Order key={item.id} data={item} />)
                    }
                </ContainerScroll>
            </Container>
            <Footer />
            <AddButton onPress={() => navigation.navigate("CreateOrder")} />
        </>

    )
}
import { useContext } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Header from "../../../components/Header";
import Order from "../../../components/Order";
import { AppContext } from "../../../context";
import { Container } from "./styles";

export default function ManageOrderofService() {
    const { listOrders } = useContext(AppContext)
    return (
        <>
            <Header title="Ordens de Serviços" />
            <ScrollView>
                <Container>
                    {
                        listOrders.map((item, index) => <Order key={index} data={item} type='admin' />)
                    }
                </Container>
            </ScrollView>
        </>
    )
}
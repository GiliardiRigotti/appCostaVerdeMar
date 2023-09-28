import { useContext, useMemo } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Header from "../../../components/Header";
import Order from "../../../components/Order";
import { AppContext } from "../../../context";
import { Container } from "../../../styles/global";

export default function ManageOrderofService() {
    const { listOrders } = useContext(AppContext)
    const list = useMemo(() => {
        const listSorted = listOrders.sort(function (a, b) {

            if (a.status > b.status) {
                return 1;
            }
            if (a.status < b.status) {
                return -1;
            }

            return 0;
        })
        return listSorted
    }, [listOrders])
    return (
        <>
            <Header title="Ordens de Serviços" />
            <Container>
                <ScrollView
                    style={{ width: "100%" }}
                    contentContainerStyle={{ width: "100%" }}
                >
                    {
                        list.map((item, index) => <Order key={index} data={item} type='admin' />)
                    }
                </ScrollView>
            </Container>
        </>
    )
}
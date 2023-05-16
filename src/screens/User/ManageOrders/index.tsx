import { useContext } from "react";
import Header from "../../../components/Header";
import { Container } from "../../../styles/global";
import { AppContext } from "../../../context";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import AddButton from "../../../components/AddButton";
import CardItem from "../../../components/CardItem";
import { useNavigation } from "@react-navigation/native";
import Footer from "../../../components/Footer";
import { Button, ButtonTitle } from "./styles";
import Order from "../../../components/Order";


export default function ManageOrders() {
    const navigation = useNavigation()
    const { listOrders } = useContext(AppContext)
    return (
        <>
            <Header title="Suporte" />
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
                        listOrders.map((item, index) => <Order key={item.id} data={item} />)
                    }
                    {
                        listOrders.length == 0 &&
                        <Button onPress={() => navigation.navigate("CreateOrder")} >
                            <ButtonTitle>
                                Abrir chamado para o suporte
                            </ButtonTitle>
                        </Button>
                    }
                </ScrollView>
            </Container>
            <Footer />
            {
                listOrders.length != 0 &&
                <AddButton onPress={() => navigation.navigate("CreateOrder")} />
            }
        </>

    )
}
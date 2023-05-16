import { useContext } from "react";
import Header from "../../../components/Header";
import { Container } from "../../../styles/global";
import { AppContext } from "../../../context";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import AddButton from "../../../components/AddButton";
import CardItem from "../../../components/CardItem";
import { useNavigation } from "@react-navigation/native";
import Footer from "../../../components/Footer";


export default function ManageUsers() {
    const navigation = useNavigation()
    const { listUsers } = useContext(AppContext)
    return (
        <>
            <Header title="Usuários" />
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
                        listUsers.map((item, index) => <CardItem key={item.id} id={`${item.id}`} name={item.name} description={item.address} data={item} type='user' />)
                    }
                </ScrollView>
            </Container>
            <Footer />
            <AddButton onPress={() => navigation.navigate("CreateUser")} />
        </>

    )
}
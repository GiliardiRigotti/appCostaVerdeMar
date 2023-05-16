import { useContext } from "react";
import Header from "../../../components/Header";
import { Container } from "../../../styles/global";
import { AppContext } from "../../../context";
import CardItem from "../../../components/CardItem";
import Footer from "../../../components/Footer";
import { ScrollView } from "react-native";
import AddButton from "../../../components/AddButton";
import { useNavigation } from "@react-navigation/native";


export default function ManageTips() {
    const navigation = useNavigation()
    const { listTips } = useContext(AppContext)
    return (
        <>
            <Header title="Recomendações" />
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
                        listTips.map((item, index) => <CardItem key={index} id={`${item.id}`} name={item.title} description={item.description} type="tip" data={item} />)
                    }
                </ScrollView>
            </Container>
            <Footer />
            <AddButton onPress={() => navigation.navigate("CreateTip")} />
        </>
    )
}
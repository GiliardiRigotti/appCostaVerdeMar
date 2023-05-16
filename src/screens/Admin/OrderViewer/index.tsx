import { useRoute } from "@react-navigation/native";
import Header from "../../../components/Header";
import { Container } from "../../../styles/global";
import { Box, Description, Label, Status, Title, Wrapper } from "./styles";

export default function OrderViewer() {
    const route = useRoute()
    const data = route.params?.data ?? null
    return (
        <>
            <Header />
            <Container>
                <Box>
                    <Title>
                        {data.title}
                    </Title>
                    <Label>
                        Descrição:
                    </Label>
                    <Wrapper>
                        <Description>
                            {data.description}
                        </Description>
                    </Wrapper>
                    <Label>
                        Status:
                    </Label>
                    <Status>
                        {
                            data.status == "open" ?
                                "Aberto"
                                :
                                data.status == "close" ?
                                    "Finalizado"
                                    :
                                    "Em Andamento"
                        }
                    </Status>
                </Box>
            </Container>
        </>

    )
}
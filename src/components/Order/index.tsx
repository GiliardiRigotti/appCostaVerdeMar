import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Container, ContainerTouch, Description, Label, Status, Title, Wrapper } from "./styles";
import { View } from "react-native";

interface Props {
    data: IOrder
    type?: 'admin' | 'user'
}

export default function Order({ data, type = 'user' }: Props) {
    const navigation = useNavigation()
    if (type == 'admin') {
        return (
            <ContainerTouch style={{ borderColor: data.status == "open" ? "green" : data.status == "close" ? "red" : "orange" }} onPress={() => navigation.navigate("OrderView", { data: data })}>
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
            </ContainerTouch>
        )
    }
    return (
        <Container>
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
        </Container>
    )
}
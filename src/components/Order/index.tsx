import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Container, ContainerTouch, Description, Label, Status, Title, Wrapper } from "./styles";
import { IOrder } from "../../interfaces/orders";
import { View } from "react-native";
import { AppContext } from "../../context";

interface Props {
    data: IOrder
    type?: 'admin' | 'user'
}

export default function Order({ data, type = 'user' }: Props) {
    const navigation = useNavigation()
    const { userAuth } = useContext(AppContext)
    console.log(userAuth.administrator)
    if (userAuth.administrator) {
        return (
            <ContainerTouch style={{ borderColor: data.status == "aberto" ? "green" : data.status == "finalizado" ? "red" : "orange" }} onPress={() => navigation.navigate("OrderView", { data: data })}>
                <Label>
                    Titulo:
                </Label>
                <Title>
                    {data.title}
                </Title>
                <Label>
                    Descrição:
                </Label>
                <Description>
                    {data.description}
                </Description>
                <Wrapper>
                    <View>
                        <Label>
                            Status:
                        </Label>
                        <Status>
                            {data.status.toUpperCase()}
                        </Status>
                    </View>
                    <View>
                        <Label>
                            Data da abertura:
                        </Label>
                        <Status>
                            {data.create_at}
                        </Status>
                    </View>
                </Wrapper>
            </ContainerTouch>
        )
    }
    return (
        <Container style={{ borderColor: data.status == "aberto" ? "green" : data.status == "finalizado" ? "red" : "orange" }} >
            <Label>
                Titulo:
            </Label>
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
            {
                data.solution &&
                <>
                    <Label>
                        Solução:
                    </Label>
                    <Wrapper>
                        <Description>
                            {data.solution}
                        </Description>
                    </Wrapper>
                </>
            }
            <Wrapper>
                <View>
                    <Label>
                        Status:
                    </Label>
                    <Status>
                        {data.status.toUpperCase()}
                    </Status>
                </View>
                <View>
                    <Label>
                        Data da abertura:
                    </Label>
                    <Status>
                        {data.create_at}
                    </Status>
                </View>
            </Wrapper>
        </Container>
    )
}
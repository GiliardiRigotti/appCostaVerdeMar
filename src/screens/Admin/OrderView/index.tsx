import { useRoute } from "@react-navigation/native";
import Header from "../../../components/Header";
import { Box, Button, ButtonTitle, Card, Container, Description, Item, Label, List, Title, Wrapper } from "./styles";
import { colors } from "../../../constants/colors";
import { useContext, useState } from "react";
import { AppContext } from "../../../context";
import { ActivityIndicator } from "react-native";
import Input from "../../../components/Input";
import { IOrder } from "../../../interfaces/orders";

interface Props {
    data: IOrder
}

interface Items {
    name: string | null
    amount: number | null
    price: number | null
}

export default function OrderView({ navigation }) {
    const route = useRoute()
    const { data } = route.params as Props
    const [load, setLoad] = useState<boolean>(false)
    const [form, setForm] = useState<IOrder>(data)
    const [items, setItems] = useState<Items[]>([])
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [item, setItem] = useState<Items>({
        name: '',
        amount: 0,
        price: 0
    })
    const { updateOrder } = useContext(AppContext)

    async function handleUpdateStatusOrder() {
        setLoad(true)
        try {
            const date = `${new Date().getDate() + 1}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
            if (data.status == "aberto") {
                await updateOrder(data.id, { ...data, status: "executando", })
                navigation.navigate('ManageOrderofService')
                return
            } else if (data.status == "executando") {
                await updateOrder(data.id, { ...data, items: items, status: "finalizado", close_at: date })
                navigation.navigate('ManageOrderofService')
                return
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoad(false)
        }
    }

    function handleAddItemToItems() {
        if (item.name != null) {
            items.push(item)
            setItem({
                name: null,
                amount: null,
                price: null
            })
            if (items.length > 0) {
                items.map((item) => {
                    setTotalPrice(totalPrice + item.price)
                })
            }
        }
    }
    return (
        <>
            <Header title="Chamada" />
            <Container>
                <Card>
                    <Wrapper>
                        <Box>
                            <Label>
                                Problema
                            </Label>
                            <Description>
                                {data.description}
                            </Description>
                        </Box>
                    </Wrapper>
                    <Wrapper>
                        <Box>
                            <Label>
                                Resumo
                            </Label>
                            <Description>
                                {data.description}
                            </Description>
                        </Box>
                    </Wrapper>
                    <Wrapper>
                        <Box>
                            <Label>
                                Status
                            </Label>
                            <Description>
                                {data.status}
                            </Description>
                        </Box>
                        {
                            data.status == "finalizado" ?
                                <Box>
                                    <Label>
                                        Data Conclusão
                                    </Label>
                                    <Description>
                                        {data.close}
                                    </Description>
                                </Box>
                                :
                                <Box>
                                    <Label>
                                        Data Abertura
                                    </Label>
                                    <Description>
                                        {data.create_at}
                                    </Description>
                                </Box>
                        }
                    </Wrapper>
                    {
                        data.solution &&
                        <Box>
                            <Label>
                                Solução
                            </Label>
                            <Description>
                                {data.solution}
                            </Description>
                        </Box>
                    }
                    {
                        data.status == "executando" &&
                        <Input title="Solução" textArea onChangeText={(value) => setForm({ ...form, solution: value })} width={100} />
                    }
                    {
                        data.status == "executando" &&
                        <>
                            {
                                items.length > 0 &&
                                <>
                                    <Label>
                                        Item usado
                                    </Label>
                                    <List>
                                        <Wrapper>
                                            <Item>
                                                <Title>
                                                    Item
                                                </Title>
                                            </Item>
                                            <Item>
                                                <Title>
                                                    Quantidade
                                                </Title>
                                            </Item>
                                            <Item>
                                                <Title>
                                                    Valor Unitario
                                                </Title>
                                            </Item>
                                            <Item>
                                                <Title>
                                                    Valor
                                                </Title>
                                            </Item>
                                        </Wrapper>
                                        {
                                            items?.map((item, index) => (
                                                <Wrapper key={index}>
                                                    <Item>
                                                        <Description>
                                                            {item.name}
                                                        </Description>
                                                    </Item>
                                                    <Item>
                                                        <Description>
                                                            {item.amount}
                                                        </Description>
                                                    </Item>
                                                    <Item>
                                                        <Description>
                                                            R${' ' + item.price}
                                                        </Description>
                                                    </Item>
                                                    <Item>
                                                        <Description>
                                                            R${' ' + item.amount * item.price}
                                                        </Description>
                                                    </Item>
                                                </Wrapper>
                                            ))
                                        }
                                        <Wrapper>
                                            <Item>
                                                <Title>
                                                    Total
                                                </Title>
                                            </Item>
                                            <Item>
                                                <Title>
                                                    R$
                                                    {' ' + totalPrice}
                                                </Title>
                                            </Item>
                                        </Wrapper>
                                    </List>
                                </>
                            }
                            <Wrapper>
                                <Input title="Nome" onChangeText={(value) => setItem({ ...item, name: value })} width={35} value={item.name} />
                                <Input title="Quantidade" onChangeText={(value) => setItem({ ...item, amount: parseInt(value) })} keyboardType="decimal-pad" width={25} />
                                <Input title="Valor" onChangeText={(value) => setItem({ ...item, price: parseInt(value) })} keyboardType="decimal-pad" width={25} />
                            </Wrapper>
                            <Button onPress={handleAddItemToItems}>
                                <ButtonTitle>
                                    Adicionar Item
                                </ButtonTitle>
                            </Button>
                        </>
                    }
                </Card>
                {
                    data.status !== "finalizado" &&
                    <Button style={{ backgroundColor: data.status == "executando" ? colors.red : colors.green }} onPress={handleUpdateStatusOrder}>
                        {
                            load ?
                                <ActivityIndicator size={20} color={colors.white} animating />
                                :
                                data.status == "executando" ?
                                    <ButtonTitle>
                                        Finalizar a manutenção
                                    </ButtonTitle>
                                    :
                                    <ButtonTitle>
                                        Iniciar a manutenção
                                    </ButtonTitle>
                        }
                    </Button>
                }
                <Button onPress={() => navigation.goBack()}>
                    <ButtonTitle>
                        Voltar
                    </ButtonTitle>
                </Button>
            </Container >
        </>
    )
}
import { StatusBar } from "expo-status-bar";
import { Button, Container, Title } from "./styles";
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from "../../constants/colors";
import { useContext } from "react";
import { AppContext } from "../../context";

interface Props {
    title?: string
}


export default function Header({ title = "" }: Props) {
    const { logout } = useContext(AppContext)
    return (
        <>
            <StatusBar style="light" />
            <Container>
                <Title>
                    {title}
                </Title>
                <Button onPress={logout}>
                    <Icon name="logout" size={20} color={colors.white} />
                </Button>
            </Container>
        </>
    )
}
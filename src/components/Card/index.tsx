import { useNavigation } from "@react-navigation/native";
import { Container, Description, Title, Wrapper } from "./styles";
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

interface Props {
    title: string
    description?: string
    goTo: string
    bgColor?: string
    fontColor?: string
    icon?: string
}

export default function Card({ title, description, goTo, icon, bgColor, fontColor }: Props) {
    const navigation = useNavigation()

    return (
        <Container onPress={() => navigation.navigate(goTo)} style={{ backgroundColor: bgColor }}>
            <Wrapper>
                <Title style={{ color: fontColor }}>
                    {title}
                </Title>
                {
                    description &&
                    <Description style={{ color: fontColor }}>
                        {description}
                    </Description>
                }
                {/* {
                    icon &&
                    <Icon name={icon} size={26} color={fontColor} />
                } */}
            </Wrapper>
        </Container>
    )
}
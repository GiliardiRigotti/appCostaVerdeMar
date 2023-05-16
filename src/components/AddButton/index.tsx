import Icon from "@expo/vector-icons/MaterialCommunityIcons"
import { Container } from "./styles";
import { colors } from "../../constants/colors";

interface Props {
    onPress: () => void
}

export default function AddButton({ onPress }: Props) {
    return (
        <Container onPress={onPress}>
            <Icon name="plus" size={20} color={colors.white} />
        </Container>
    )
}
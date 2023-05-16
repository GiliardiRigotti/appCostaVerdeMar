import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from '../../constants/colors';
import { Container, Title } from "./styled";

interface Props {
    title: string
    value: boolean
    onPress: () => void
}

export default function Checkbox({ title, value, onPress }: Props) {
    return (
        <Container onPress={onPress}>
            {
                value ?
                    <Icon name='checkbox-outline' size={16} color={colors.green} />
                    :
                    <Icon name='checkbox-blank-outline' size={16} color={colors.green} />
            }
            <Title>
                {title}
            </Title>
        </Container>
    )
}
import { useNavigation } from "@react-navigation/native";
import { Box, Button, Container, Description, Options, Title, Wrapper, styles } from "./styles";
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from "../../constants/colors";
import { showNotification } from "../../utils/notification";
import { useContext, useState } from "react";
import { AppContext } from "../../context";
import { ActivityIndicator, View } from "react-native";
import { IUser } from "../../interfaces/user";
import { ITip } from "../../interfaces/tip";

interface Props {
    id: string
    name: string
    description?: string
    type: 'user' | 'tip' | 'notification'
    data?: IUser | ITip
}

export default function CardItem({ id, name, description, type, data }: Props) {
    const [isLoad, setIsLoad] = useState<boolean>(false)
    const { deleteUser, deleteTip } = useContext(AppContext)
    const navigation = useNavigation()


    async function handleDelete() {
        if (type == 'user') {
            await deleteUser(id)
        } else if (type == 'tip') {
            await deleteTip(id)
        } else if (type == 'notification') {
        } else {
            showNotification({
                title: 'Aviso',
                description: 'Não existe esta opção',
                type: 'error',
                duration: 1500
            })
        }
    }

    async function handleUpdate() {
        if (type == 'user') {
            navigation.navigate("CreateUser", { data: data })
        } else if (type == 'tip') {
            navigation.navigate("CreateTip", { data: data })
        } else if (type == 'notification') {

        } else {
            showNotification({
                title: 'Aviso',
                description: 'Não existe esta opção',
                type: 'error',
                duration: 1500
            })
        }
    }

    return (
        <Container style={styles.shadow}>
            <Title>
                {name}
            </Title>

            {
                description &&
                <Description>
                    {description}
                </Description>
            }
            {
                type !== 'notification' &&
                <Options>
                    <Button style={styles.shadow} onPress={handleUpdate}>
                        <Icon name="pencil" size={20} color={colors.blue} />
                    </Button>
                    <Button style={styles.shadow} onPress={handleDelete}>
                        {
                            isLoad ?
                                <ActivityIndicator size='small' animating color={colors.red} />
                                :
                                <Icon name="delete" size={20} color={colors.red} />
                        }
                    </Button>
                </Options>
            }

        </Container>
    )
}
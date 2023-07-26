import { useState } from "react"
import { TouchableOpacity } from "react-native"
import Icon from "@expo/vector-icons/MaterialCommunityIcons"
import { Box, Container, TextInput, Title, Wrapper } from "./styles"
import { colors } from "../../constants/colors"

interface Props {
    title: string
    onChangeText: (value: string) => void
    placeholder?: string
    secureTextEntry?: boolean
    textArea?: boolean
    value?: string
    width?: number
    keyboardType?: "decimal-pad" | "default"
    max?: number
}

export default function Input({ title, onChangeText, placeholder, secureTextEntry = false, textArea = false, value, width = 50, keyboardType = "default", max = 100 }: Props) {
    const [hide, setHide] = useState(true);

    return (
        <Container style={{ width: `${width}%` }}>
            <Title>
                {title}
            </Title>
            <Box>
                {
                    textArea ?
                        <TextInput
                            placeholder={placeholder}
                            onChangeText={onChangeText}
                            textAlignVertical="top"
                            editable
                            multiline={true}
                            numberOfLines={10}
                            value={value}
                            keyboardType={keyboardType}
                        />
                        :
                        secureTextEntry?
                        <Wrapper>
                            <TextInput placeholder={placeholder} onChangeText={onChangeText} secureTextEntry={hide} value={value} keyboardType={keyboardType} maxLength={max} style={{ width: '90%' }}/>
                            <TouchableOpacity onPress={()=> setHide(!hide)} style={{width:'30%'}}>
                                {
                                    hide?
                                    <Icon name="eye-off-outline" size={25} color={colors.gray}/>
                                    :
                                    <Icon name="eye-outline" size={25} color={colors.gray}/>
                                }
                            </TouchableOpacity>
                        </Wrapper>
                        :
                        <TextInput placeholder={placeholder} onChangeText={onChangeText} value={value} keyboardType={keyboardType} maxLength={max} />
                }
            </Box>
        </Container>
    )
}
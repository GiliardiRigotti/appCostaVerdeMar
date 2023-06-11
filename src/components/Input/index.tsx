import { Box, Container, TextInput, Title } from "./styles"

interface Props {
    title: string
    onChangeText: (value: string) => void
    placeholder?: string
    secureTextEntry?: boolean
    textArea?: boolean
    value?: string
    width?: number
}

export default function Input({ title, onChangeText, placeholder, secureTextEntry = false, textArea = false, value, width = 50 }: Props) {
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
                        />
                        :
                        <TextInput placeholder={placeholder} onChangeText={onChangeText} secureTextEntry={secureTextEntry} value={value} />
                }
            </Box>
        </Container>
    )
}
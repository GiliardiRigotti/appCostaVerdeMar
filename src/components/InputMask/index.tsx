import { useState } from "react"
import { MaskedTextInput } from "react-native-mask-text";
import { Box, Container, TextInput, Title, Wrapper } from "./styles"
import { colors } from "../../constants/colors"
import { StyleSheet } from "react-native";

interface Props {
    title: string
    onChangeText: (text: string, rawText: string) => void
    placeholder?: string
    secureTextEntry?: boolean
    textArea?: boolean
    value?: string
    width?: number
    keyboardType?: "decimal-pad" | "default"
    max?: number
    mask?: string
}

export default function InputMask({ title, onChangeText, placeholder, value, width = 50, mask, keyboardType = 'default' }: Props) {

    return (
        <Container style={{ width: `${width}%` }}>
            <Title>
                {title}
            </Title>
            <Box>
                <MaskedTextInput
                    mask={mask}
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    value={value}
                    keyboardType={"decimal-pad"}
                    style={styles.input}
                />
            </Box>
        </Container>
    )
}

const styles = StyleSheet.create({
    input: {
        padding: 5,
        backgroundColor: colors.white,
        borderRadius: 8,
        fontSize: 18,
    }
})
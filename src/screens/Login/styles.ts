import styled from "styled-components/native";
import { colors } from "../../constants/colors";

export const Button = styled.TouchableOpacity`
    margin-top:8px;
    width:50%;
    height:5%;
    background-color:${colors.green};
    border-radius:8px;
    align-items: center;
    justify-content: center;
`;

export const ButtonTitle = styled.Text`
    font-size: 16px;
    font-weight:bold;
    color:${colors.white};
`;

export const Link = styled.TouchableOpacity`
    margin-top:8px;
    width:60%;
    height:5%;
    align-items: center;
    justify-content: center;
`;

export const LinkTitle = styled.Text`
    font-size: 12px;
    font-weight:bold;
    color:${colors.blue};
`;

export const Container = styled.KeyboardAvoidingView.attrs({
    behavior: "position",
    enabled: true,
    contentContainerStyle: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    }
})`
height:100%;
width:100%;
align-items:center;
`;
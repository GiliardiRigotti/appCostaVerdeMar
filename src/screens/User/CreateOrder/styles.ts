import styled from "styled-components/native";
import { colors } from "../../../constants/colors";

export const Button = styled.TouchableOpacity`
    margin-top:10px;
    width:100%;
    height:50px;
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

export const ButtonCancel = styled.TouchableOpacity`
    margin-top:8px;
    width:100%;
    height:50px;
    background-color:${colors.red};
    border-radius:8px;
    align-items: center;
    justify-content: center;
`;
import styled from "styled-components/native"
import { colors } from "../../constants/colors"

export const Container = styled.View`
    margin-top:15px;
`;

export const Box = styled.View`
    border-width:1px;
    border-radius:8px;
    border-color:${colors.gray};
`;

export const Title = styled.Text`
    font-size:14px;
    color:${colors.green};
`;

export const TextInput = styled.TextInput`
    padding:5px;
    background-color: ${colors.white};
    border-radius: 8px;
`;
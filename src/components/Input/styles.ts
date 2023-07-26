import styled from "styled-components/native"
import { colors } from "../../constants/colors"

export const Container = styled.View`
    margin-top:8px;
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
    font-size: 18px;
`;

export const Wrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-right: 10px;
`;
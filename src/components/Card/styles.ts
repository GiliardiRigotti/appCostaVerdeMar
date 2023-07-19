import styled from "styled-components/native";
import { colors } from "../../constants/colors";

export const Container = styled.TouchableOpacity`
    flex-direction:row;
    height:20%;
    border-radius:10px;
    margin-top:10px;
    padding:10px;
`;

export const Wrapper = styled.View`
    width: 100%;
`;

export const Title = styled.Text`
    font-size:20px;
    font-weight:bold;
`;

export const Description = styled.Text`
    font-size:16px;
`;
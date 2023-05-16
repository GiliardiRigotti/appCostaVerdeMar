import styled from "styled-components/native";
import { colors } from "../../constants/colors";

export const Container = styled.View`
    flex-direction:row;
    padding-top:10px;
    padding-right: 10px;
    padding-left: 10px;
    height:15%;
    width:100%;
    background-color:${colors.blueDark};
    align-items:center;
    justify-content:space-between;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
`;

export const Title = styled.Text`
    font-size:20px;
    font-weight:bold;
    color:${colors.white};
`;

export const Button = styled.TouchableOpacity`
`;
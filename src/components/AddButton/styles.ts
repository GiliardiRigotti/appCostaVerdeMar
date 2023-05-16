import styled from "styled-components/native";
import { colors } from "../../constants/colors";

export const Container = styled.TouchableOpacity`
    border-radius:20px;
    width:40px;
    height:40px;
    align-items:center;
    justify-content:center;
    position:absolute;
    bottom:40px;
    right:20px;
    background-color:${colors.red};
`;
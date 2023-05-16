import styled from "styled-components/native";
import { colors } from "../../constants/colors";
import { StyleSheet } from "react-native";

export const Container = styled.View`
    width:90%;
    border-radius:10px;
    margin-top:10px;
    border-width:1px;
    border-color:#fffffa;
    padding:10px;
    background-color:#fffffa;
`;

export const Wrapper = styled.View`
    width: 100%;
    flex-direction:row;
    align-items:center;
    justify-content: space-between;
`;

export const Options = styled.View`
    margin-top:10px;
    flex-direction:row;
    align-items:center;
    justify-content: space-around;
`;

export const Title = styled.Text`
    font-size:20px;
    font-weight:bold;
`;

export const Description = styled.Text`
    font-size:16px;
`;

export const Button = styled.TouchableOpacity`
    border-width:1px;
    border-radius:10px;
    width: 30%;
    height: 30px;
    align-items:center;
    justify-content:center;
`;

export const Box = styled.View`
    border-width:1px;
    border-radius:10px;
`;

export const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    }
})
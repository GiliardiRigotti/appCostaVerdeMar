import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const ContainerTouch = styled.TouchableOpacity`
    margin-top: 10px;
    padding: 10px;
    width: 100%;
    border-radius: 8px;
`;

export const Container = styled.View`
    margin-top: 10px;
    padding: 10px;
    width: 100%;
    border-radius: 8px;
`;

export const Wrapper = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Title = styled.Text`
    font-size: 14px;
    margin-bottom: 10px;
`;

export const Description = styled.Text`
    font-size: 14px;
    margin-bottom: 10px;
`;

export const Status = styled.Text`
    font-size: 14px;
`;

export const Label = styled.Text`
    font-size: 10px;
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
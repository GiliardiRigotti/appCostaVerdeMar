import styled from 'styled-components/native';
import { colors } from '../../../constants/colors';

export const Button = styled.TouchableOpacity`
    margin-top:20px;
    width:60%;
    height:60px;
    border-radius: 8px;
    background-color: ${colors.red};
    align-items: center;
    justify-content: center;
`;

export const ButtonTitle = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${colors.white};
`;

import LottieView from 'lottie-react-native';
import { View } from 'react-native';
import { animations } from '../../assets/images';
import { colors } from '../../constants/colors';

export function Load() {
    return (
        <View style={{ flex: 1, backgroundColor: colors.green }}>
            <LottieView
                autoPlay
                source={animations.elevatorOpenCloseDoor}
                resizeMode='center'
            />
        </View>
    )
}
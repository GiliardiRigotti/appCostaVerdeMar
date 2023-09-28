import LottieView from 'lottie-react-native';
import { View } from 'react-native';
import { animations } from '../../assets/images';

export function Load() {
    return (
        <View style={{ flex: 1 }}>
            <LottieView
                autoPlay
                source={animations.elevatorUp}
                resizeMode='cover'
            />
        </View>
    )
}
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/Routes';
import { AppProvider } from './src/context';
import { NotifierWrapper } from 'react-native-notifier';

export default function App() {
  return (
    <NavigationContainer>
      <AppProvider>
        <NotifierWrapper>
          <Routes />
        </NotifierWrapper>
      </AppProvider>
    </NavigationContainer>
  );
}

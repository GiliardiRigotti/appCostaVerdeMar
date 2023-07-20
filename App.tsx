import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import * as Updates from 'expo-updates';
import Routes from './src/Routes';
import { AppProvider } from './src/context';
import { NotifierWrapper } from 'react-native-notifier';
import { system } from './src/constants/system';
import { Alert } from 'react-native';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';

export default function App() {

  useEffect(() => {
    async function availableUpdate() {
      if (!system.isDevice) return;

      const { isAvailable } = await Updates.checkForUpdateAsync();

      if (isAvailable) {
        const { isNew } = await Updates.fetchUpdateAsync();

        if (isNew) {
          Alert.alert(
            'Nova atualização disponível',
            'Uma nova atualização disponível, deseja aplicar agora?',
            [
              {
                text: 'Não',
                onPress: () => { },
                style: 'cancel',
              },
              {
                text: 'Sim',
                onPress: () => Updates.reloadAsync().then(),
              },
            ],
            { cancelable: false },
          );
        }
      }
    }
    availableUpdate();
  }, []);

  return (
    <NavigationContainer>
      <AppProvider>
        <Provider store={store}>
          <NotifierWrapper>
            <Routes />
          </NotifierWrapper>
        </Provider>
      </AppProvider>
    </NavigationContainer>
  );
}

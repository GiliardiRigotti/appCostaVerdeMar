import { Platform } from 'react-native';
import { Notifier, NotifierComponents } from 'react-native-notifier';

interface showNotification {
  title: string;
  description: string;
  type?: 'info' | 'warn' | 'success' | 'error';
  duration?: number;
  onPress?: Function;
  onHidden?: Function;
  hideOnPress?: boolean;
}

export function showNotification({
  title,
  description,
  type = 'info',
  duration,
  onPress,
  onHidden,
  hideOnPress = true,
}: showNotification) {
  Notifier.showNotification({
    title: Platform.OS === 'android' ? `\n${title}` : title,
    description: String(description),
    Component: NotifierComponents.Alert,
    duration: duration ?? 0,
    onPress: () => onPress && onPress(),
    onHidden: () => onHidden && onHidden(),
    hideOnPress,
    componentProps: {
      alertType: type,
    },
  });
}

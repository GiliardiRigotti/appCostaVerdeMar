import { Platform } from 'react-native';

import * as Application from 'expo-application';
import Constants from 'expo-constants';

const isDevice = Application.applicationName !== 'Expo Go';
const isAndroid = Platform.OS === 'android';
const isIOS = Platform.OS === 'ios';
const { deviceName } = Constants;
const { platform } = Constants;
const { systemVersion } = Constants;
const { applicationName } = Application;
const { applicationId } = Application;
const { nativeApplicationVersion } = Application;
const { nativeBuildVersion } = Application;
const applicationUserAgent = `${Application}/${nativeApplicationVersion}`;

export const system = {
  isDevice,
  isAndroid,
  isIOS,
  deviceName,
  platform,
  systemVersion,
  applicationName,
  applicationId,
  nativeApplicationVersion,
  nativeBuildVersion,
  applicationUserAgent,
};

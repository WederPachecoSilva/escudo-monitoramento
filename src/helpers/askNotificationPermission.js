import { Permissions, Notifications } from 'expo';
import config from '../config';
import { AsyncStorage } from 'react-native';

const PUSH_ENDPOINT = `${config.URL_BASE}/auth/by-cpfcnpf`;

/**
 * Pede permissão do usuário para receber notificações
 * e retorna uma promise com o token se permitido
 * @returns {Promise<(string|void)>}
 */
async function askNotificationPermission() {
   let hasToken = await AsyncStorage.getItem('pushToken');
   if (hasToken) {
      return hasToken;
   }

   const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
   );

   let finalStatus = existingStatus;
   if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
   }

   if (finalStatus !== 'granted') {
      return;
   }

   let token = await Notifications.getExpoPushTokenAsync();
   await AsyncStorage.setItem('pushToken', token);

   return token;
}

export default askNotificationPermission;

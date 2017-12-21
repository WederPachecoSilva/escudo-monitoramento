import config from '../config';
import axios from 'axios';
import { AsyncStorage, Alert } from 'react-native';

/**
 * Checa se tem um token no AsyncStorage e
 * se não tiver, faz requisição de token pro
 * backend
 * @param {string} cpfcnpj
 * @param {string} pushToken
 * @returns {Promise<string>}
 */
async function getBackendToken(cpfcnpj, pushToken) {
    let backendToken = await AsyncStorage.getItem('backendToken');
    if (!backendToken) {
        try {
            let response = await axios.post(
                `${config.URL_BASE}/auth/by-cpfcnpj`,
                {
                    cpfcnpj,
                    token: pushToken
                }
            );
            backendToken = response.data.token;
        } catch {
            Alert.alert(
                'Ocorreu um erro na pesquisa',
                'Favor verificar seu CPF ou CNPJ',
                [{ text: 'OK' }],
                { cancelable: false }
            );
        }
    }
    return backendToken;
}

export default getBackendToken;

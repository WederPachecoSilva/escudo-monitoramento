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
    let response = await axios.post(`${config.URL_BASE}/auth/by-cpfcnpj`, {
        cpfcnpj,
        token: pushToken
    });
    const backendToken = response.data.token;
    AsyncStorage.setItem('backendToken', backendToken);

    return backendToken;
}

export default getBackendToken;

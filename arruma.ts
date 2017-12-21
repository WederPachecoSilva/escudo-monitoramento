import { AsyncStorage } from 'react-native';

let axios, config, Alert;

async function buscaBoletos(cpfcnpj) {
    const { navigate } = this.props.navigation;
    axios.defaults.baseURL = config.URL_BASE;
    let backendToken;

    try {
        backendToken = await AsyncStorage.getItem('backendToken');
        if (!backendToken) {
            const res = await axios.post(`/auth/by-cpfcnpj`, {
                cpfcnpj: this.state.cpfcnpj,
                token: this.state.token
            });

            backendToken = res.data.token;
            AsyncStorage.setItem('backendToken', backendToken);
        }
    } catch (error) {
        Alert.alert(
            'Ocorreu um erro na pesquisa',
            'Favor verificar seu CPF ou CNPJ',
            [{ text: 'OK' }],
            { cancelable: false }
        );
    }

    try {
        const response = await axios({
            method: 'get',
            url: '/boletos',
            headers: { Authorization: 'JWT ' + backendToken.data.token }
        });

        const boletos = response.data;
        ordenaPorData(boletos);

        navigate('ListaBoletos', { boletos, token: this.state.token });
    } catch (error) {
        {
            Alert.alert('Ocorreu um erro', 'Favor tentar novamente', [
                { text: 'OK' }
            ]);
        }
    }
}

const ordenaPorData = arrBoletos => {
    arrBoletos.sort((a, b) => {
        return a.data_vencimento > b.data_vencimento
            ? 1
            : a.data_vencimento < b.data_vencimento ? -1 : 0;
    });
};

export default ordenaPorData;

// buscaBoletos(cpfcnpj) {
//    const { navigate } = this.props.navigation;
//    axios.defaults.baseURL = config.URL_BASE;
//    axios
//       .post(`/auth/by-cpfcnpj`, {
//          cpfcnpj: this.state.cpfcnpj,
//          token: this.pushToken
//       })
//       .then(response => {
//          this.backendToken = response.data.token;
//          axios({
//             method: 'get',
//             url: '/boletos',
//             headers: { Authorization: 'JWT ' + this.backendToken }
//          })
//             .then(response => {
//                // Ordena boletos por data
//                response.data.sort((a, b) => {
//                   return a.data_vencimento > b.data_vencimento
//                      ? 1
//                      : a.data_vencimento < b.data_vencimento ? -1 : 0;
//                });
//                navigate('ListaBoletos', {
//                   boletos: response.data,
//                   token: this.backendToken
//                });
//             })
//             .catch(err => {
//                Alert.alert('Ocorreu um erro', 'Favor tentar novamente', [
//                   { text: 'OK' }
//                ]);
//             });
//       })
//       .catch(err => {
//          Alert.alert(
//             'Ocorreu um erro na pesquisa',
//             'Favor verificar seu CPF ou CNPJ',
//             [{ text: 'OK' }],
//             { cancelable: false }
//          );
//       });
// }

const buscaBoleto = async cpfcnpj => {
    // @ts-ignore
    const { navigate } = this.props.navigation;
    axios.defaults.baseURL = config.URL_BASE;
    let backendToken;
    try {
        backendToken = await AsyncStorage.getItem('backendToken');
        if (!backendToken) {
            const res = await axios.post(`/auth/by-cpfcnpj`, {
                cpfcnpj: this.state.cpfcnpj,
                token: this.state.token
            });
            backendToken = res.data.token;
            AsyncStorage.setItem('backendToken', backendToken);
        }
    } catch (error) {
        Alert.alert(
            'Ocorreu um erro na pesquisa',
            'Favor verificar seu CPF ou CNPJ',
            [
                {
                    text: 'OK'
                }
            ],
            {
                cancelable: false
            }
        );
    }
    try {
        const response = await axios({
            method: 'get',
            url: '/boletos',
            headers: {
                Authorization: 'JWT ' + backendToken
            }
        });
        const boletos = response.data;
        ordenaPorData(boletos);

        navigate('ListaBoletos', {
            boletos,
            token: this.state.token
        });
    } catch (error) {
        Alert.alert('Ocorreu um erro', 'Favor tentar novamente', [
            {
                text: 'OK'
            }
        ]);
    }
};

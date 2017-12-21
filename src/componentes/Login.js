import React, { Component } from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    View,
    Image,
    Picker,
    Alert,
    AsyncStorage
} from 'react-native';
import axios from 'axios';
import { TextInputMask } from 'react-native-masked-text';

import config from '../config';
import askNotificationPermission from '../helpers/askNotificationPermission';
import ordenaPorData from '../helpers/ordenaPorData';
import getBackendToken from '../helpers/getBackendToken';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tipoDeBusca: 'cpf',
            cpfcnpj: ''
        };
        this.pushToken = '';
        this.backendToken = '';
        this.buscaBoletos = this.buscaBoletos.bind(this);
        // @ts-ignore
        this.navigate = this.props.navigation.navigate.bind(this);
    }

    async componentWillMount() {
        let token = await AsyncStorage.getItem('pushToken');
        if (!token) {
            const askToken = await askNotificationPermission();
            if (askToken) {
                token = askToken;
            }
        }
        this.pushToken = token;
    }

    async buscaBoletos(cpfcnpj) {
        // @ts-ignore
        const { navigate } = this.props.navigation;
        // @ts-ignore
        this.backendToken = await getBackendToken(
            this.state.cpfcnpj,
            this.pushToken
        );
        axios({
            method: 'get',
            url: '/boletos',
            headers: { Authorization: 'JWT ' + this.backendToken }
        })
            .then(response => {
                ordenaPorData(response.data);
                navigate('ListaBoletos', {
                    boletos: response.data,
                    token: this.backendToken
                });
            })
            .catch(err => {
                Alert.alert('Ocorreu um erro', 'Favor tentar novamente', [
                    { text: 'OK' }
                ]);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    // @ts-ignore
                    source={require('../../assets/logo_md.png')}
                />
                <Picker
                    style={styles.picker}
                    selectedValue={this.state.tipoDeBusca}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({
                            tipoDeBusca: itemValue
                        })
                    }
                >
                    <Picker.Item label="Pesquisar com :  CPF" value="cpf" />
                    <Picker.Item label="Pesquisar com :  CNPJ" value="cnpj" />
                </Picker>
                <KeyboardAvoidingView behavior="padding">
                    <TextInputMask
                        style={styles.input}
                        value={this.state.cpfcnpj}
                        type={this.state.tipoDeBusca}
                        onSubmitEditing={cpfcnpj =>
                            this.buscaBoletos(this.state.cpfcnpj)
                        }
                        onChangeText={cpfcnpj =>
                            this.setState({
                                cpfcnpj
                            })
                        }
                        placeholder="Insira seu CPF ou CNPJ"
                    />
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    image: {
        width: 210,
        height: 210,
        marginBottom: 40
    },
    picker: {
        width: 210,
        backgroundColor: '#ececec',
        justifyContent: 'center'
    },
    input: {
        marginTop: 15,
        width: 270,
        textAlign: 'center'
    }
});

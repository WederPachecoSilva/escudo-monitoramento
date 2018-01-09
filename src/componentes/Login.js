import React, { Component } from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    View,
    Image,
    Alert,
    AsyncStorage,
    Animated,
    Keyboard
} from 'react-native';
import axios from 'axios';
import { TextInputMask } from 'react-native-masked-text';
import { CheckBox, Button } from 'react-native-elements';

import config, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL } from '../config';
import askNotificationPermission from '../helpers/askNotificationPermission';
import ordenaPorData from '../helpers/ordenaPorData';
import getBackendToken from '../helpers/getBackendToken';
import LogoAnimada from './LogoAnimada';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tipoDeBusca: 'cpf',
            cpfcnpj: ''
        };
        this.pushToken = '';
        this.buscaBoletos = this.buscaBoletos.bind(this);
        // @ts-ignore
        this.navigate = this.props.navigation.navigate.bind(this);
    }

    async componentWillMount() {
        const backendToken = await AsyncStorage.getItem('backendToken');
        if (backendToken) {
            this.navegaParaListaBoletos(backendToken);
        }

        let _pushToken = await AsyncStorage.getItem('pushToken');
        if (!_pushToken) {
            const askToken = await askNotificationPermission();
            if (askToken) {
                _pushToken = askToken;
            }
        }
        this.pushToken = _pushToken;
    }

    navegaParaListaBoletos(backendToken) {
        // @ts-ignore
        const { navigate } = this.props.navigation;
        axios.defaults.baseURL = config.URL_BASE;
        axios({
            method: 'get',
            url: '/boletos',
            headers: { Authorization: 'JWT ' + backendToken }
        })
            .then(response => {
                ordenaPorData(response.data);
                this.navigate('ListaBoletos', {
                    boletos: response.data,
                    token: backendToken
                });
            })
            .catch(err => {
                Alert.alert('Ocorreu um erro', 'Favor tentar novamente', [
                    { text: 'OK' }
                ]);
            });
    }

    buscaBoletos(cpfcnpj) {
        if (this.validaEntrada() === 'erro') {
            return;
        }
        // prettier-ignore
        getBackendToken(cpfcnpj, this.pushToken)
            .then(backendToken => {
                this.navegaParaListaBoletos(backendToken)
            })
            .catch(
                err => {
                    Alert.alert(
                        'Ocorreu um erro na pesquisa',
                        'Favor verificar seu CPF ou CNPJ',
                        [{ text: 'OK' }],
                        { cancelable: false }
                    );
                }
            )
    }

    checkCPF() {
        if (this.state.tipoDeBusca === 'cpf') {
            return true;
        }
        return false;
    }

    checkCNPJ() {
        if (this.state.tipoDeBusca === 'cnpj') {
            return true;
        }
        return false;
    }

    validaEntrada() {
        if (
            this.state.tipoDeBusca === 'cpf' &&
            this.state.cpfcnpj.length !== 14
        ) {
            Alert.alert(
                'Ocorreu um erro na pesquisa',
                'O CPF precisa ter exatamente 11 dígitos',
                [{ text: 'OK' }],
                { cancelable: false }
            );
            return 'erro';
        }

        if (
            this.state.tipoDeBusca === 'cnpj' &&
            this.state.cpfcnpj.length !== 17
        ) {
            Alert.alert(
                'Ocorreu um erro na pesquisa',
                'O CNPJ precisa ter exatamente 14 dígitos',
                [{ text: 'OK' }],
                { cancelable: false }
            );
            return 'erro';
        }

        return 'sucesso';
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <LogoAnimada source={require('../../assets/logo_md.png')} />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}
                >
                    <CheckBox
                        title="CPF"
                        checked={this.checkCPF()}
                        onPress={() =>
                            this.setState({
                                tipoDeBusca: 'cpf',
                                cpfcnpj: ''
                            })
                        }
                        checkedIcon="dot-circle-o"
                        checkedColor="#3399ff"
                        uncheckedIcon="circle-o"
                    />
                    <CheckBox
                        title="CNPJ"
                        checked={this.checkCNPJ()}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checkedColor="#3399ff"
                        onPress={() =>
                            this.setState({
                                tipoDeBusca: 'cnpj',
                                cpfcnpj: ''
                            })
                        }
                    />
                </View>
                <TextInputMask
                    style={styles.input}
                    value={this.state.cpfcnpj}
                    type={this.state.tipoDeBusca}
                    onSubmitEditing={cpfcnpj => {
                        this.buscaBoletos(this.state.cpfcnpj);
                        Keyboard.dismiss;
                    }}
                    onChangeText={cpfcnpj =>
                        this.setState({
                            cpfcnpj
                        })
                    }
                    placeholder={'Insira seu CPF / CNPJ'}
                />
                <Button
                    title="Enviar"
                    onPress={() => this.buscaBoletos(this.state.cpfcnpj)}
                    raised
                    fontSize={14}
                    buttonStyle={styles.button}
                    borderRadius={3}
                />
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    input: {
        marginTop: 20,
        width: 250,
        fontSize: 18,
        paddingVertical: 8,
        textAlign: 'center'
    },
    button: {
        height: 30,
        width: 250
    }
});

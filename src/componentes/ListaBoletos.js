import React from 'react';
import { FlatList, Alert } from 'react-native';
import axios from 'axios';
import { Constants } from 'expo';

import Boleto from './Boleto';
import config from '../config';
import LogoutButton from './LogoutButton';
import Logo from './Logo';

export default class ListaBoletos extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'SEUS BOLETOS',
        // header: ({ state, setParams }) => ({
        //     style: {
        //         height: 40,
        //         backgroundColor: '#0099ff',
        //         justifyContent: 'center'
        //     },
        //     titleStyle: {},
        //     tintColor: '#fff'
        // }),
        headerTitleStyle: {
            color: 'white'
            // marginRight: 'auto',
            // marginLeft: 'auto'
        },
        headerStyle: {
            backgroundColor: 'black',
            paddingTop: Constants.statusBarHeight,
            height: 80
        },
        headerBackTitle: null,
        headerRight: <LogoutButton navigation={navigation} />,
        headerLeft: <Logo />
    });

    constructor(props) {
        super(props);
        this.params = props.navigation.state.params;
        this.confirmaBusca = this.confirmaBusca.bind(this);
        this.enviaEmail = this.enviaEmail.bind(this);
    }

    enviaEmail(idBoleto) {
        axios.defaults.baseURL = config.URL_BASE;
        axios({
            method: 'get',
            url: '/boletos/lembrete/' + idBoleto,
            headers: { Authorization: 'JWT ' + this.params.token }
        }).then(response => {
            if (response.status === 200) {
                Alert.alert('Seu e-mail foi enviado com sucesso!');
            } else {
                Alert.alert(
                    'Ocorreu um erro na tentativa de envio',
                    'Favor tentar novamente'
                );
            }
        });
    }

    confirmaBusca(idBoleto) {
        axios.defaults.baseURL = config.URL_BASE;
        axios({
            method: 'get',
            url: '/boletos/barcode/' + idBoleto,
            headers: { Authorization: 'JWT ' + this.params.token }
        }).then(response => {
            Alert.alert(
                'Você receberá um e-mail com o boleto requerido!',
                'Número do seu código de barras: \n \n' + response.data.barcode,
                [
                    {
                        text: 'Enviar Por E-mail',
                        onPress: () => this.enviaEmail(idBoleto)
                    },
                    { text: 'Cancelar', style: 'cancel' }
                ],
                { cancelable: false }
            );
        });
    }

    render() {
        return (
            <FlatList
                keyExtractor={(item, index) => item.id_boletos}
                data={this.params.boletos}
                renderItem={({ item }) => (
                    <Boleto boleto={item} confirmaBusca={this.confirmaBusca} />
                )}
            />
        );
    }
}

import React, { Component } from 'react';
import {
   KeyboardAvoidingView,
   StyleSheet,
   View,
   Image,
   Picker,
   Alert
} from 'react-native';
// import OneSignal from 'react-native-onesignal';
import axios from 'axios';
import { TextInputMask } from 'react-native-masked-text';
import config from '../config';
import PropTypes from 'prop-types';

export default class Login extends Component {
   constructor(props) {
      super(props);
      this.state = {
         tipoDeBusca: 'cpf',
         cpfcnpj: '',
         token: '',
         notification: '',
         AUTH_TOKEN: ''
      };
      this.buscaBoletos = this.buscaBoletos.bind(this);
      this.navigate = this.props.navigation.navigate.bind(this);
   }

   componentDidMount() {
      OneSignal.addEventListener('ids', ({ userId, pushToken }) => {
         this.setState({ token: pushToken });
      });
      // Falta cocluir
      OneSignal.addEventListener('opened', opened => this.buscaBoletos(opened));
   }

   componentWillUnmount() {
      OneSignal.removeEventListener('opened');
      OneSignal.removeEventListener('ids');
   }

   buscaBoletos(cpfcnpj) {
      const { navigate } = this.props.navigation;
      axios.defaults.baseURL = config.URL_BASE;
      axios
         .post(`/auth/by-cpfcnpj`, {
            cpfcnpj: this.state.cpfcnpj,
            token: this.state.token
         })
         .then(response => {
            axios({
               method: 'get',
               url: '/boletos',
               headers: { Authorization: 'JWT ' + response.data.token }
            })
               .then(response => {
                  // Ordena boletos por data
                  response.data.sort((a, b) => {
                     return a.data_vencimento > b.data_vencimento
                        ? 1
                        : a.data_vencimento < b.data_vencimento ? -1 : 0;
                  });
                  navigate('ListaBoletos', {
                     boletos: response.data,
                     token: this.state.token
                  });
               })
               .catch(err => {
                  Alert.alert('Ocorreu um erro', 'Favor tentar novamente', [
                     { text: 'OK' }
                  ]);
               });
         })
         .catch(err => {
            Alert.alert(
               'Ocorreu um erro na pesquisa',
               'Favor verificar seu CPF ou CNPJ',
               [{ text: 'OK' }],
               { cancelable: false }
            );
         });
   }

   render() {
      return (
         <View style={styles.container}>
            <Image
               style={styles.image}
               source={require('../img/logo_md.png')}
            />
            <Picker
               style={styles.picker}
               selectedValue={this.state.tipoDeBusca}
               onValueChange={(itemValue, itemIndex) =>
                  this.setState({ tipoDeBusca: itemValue })
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
                  onChangeText={cpfcnpj => this.setState({ cpfcnpj })}
                  placeholder="Insira seu CPF ou CNPJ"
               />
            </KeyboardAvoidingView>
         </View>
      );
   }
}

Login.propTypes = {
   navigation: PropTypes.object.isRequired
};

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
      width: 270,
      textAlign: 'center'
   }
});

import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

import ListaBoletos from './src/componentes/ListaBoletos';
import Login from './src/componentes/Login';

const Stack = StackNavigator({
   Home: {
      screen: Login,
      navigationOptions: {
         title: 'ESCUDO MONITORAMENTO',
         headerTitleStyle: {
            color: 'white'
         },
         headerStyle: {
            backgroundColor: 'black'
         }
      }
   },
   ListaBoletos: {
      screen: ListaBoletos,
      navigationOptions: {
         title: 'SEUS BOLETOS',
         headerTitleStyle: {
            color: 'white'
         },
         headerBackStyle: {
            color: 'white',
            backgroundColor: 'white'
         },
         headerStyle: {
            backgroundColor: 'black'
         }
      }
   }
});

export default class App extends Component {
   render() {
      return <Stack style={styles.container} />;
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
   }
});

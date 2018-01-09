import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Constants } from 'expo';

import ListaBoletos from './src/componentes/ListaBoletos';
import Login from './src/componentes/Login';

const Stack = StackNavigator({
    Home: {
        screen: Login,
        navigationOptions: {
            title: 'ESCUDO MONITORAMENTO',
            headerTitleStyle: {
                color: 'white',
                marginRight: 'auto',
                marginLeft: 'auto'
            },
            headerStyle: {
                height: 80,
                backgroundColor: 'black',
                paddingTop: Constants.statusBarHeight
            }
        }
    },
    ListaBoletos: {
        screen: ListaBoletos
    }
});

const App = () => <Stack />;

export default App;

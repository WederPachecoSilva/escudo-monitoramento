import React from 'react';
import { StyleSheet, TouchableOpacity, Text, AsyncStorage } from 'react-native';

const LogoutButton = ({ navigation }) => {
    const onClickBackButton = () => {
        AsyncStorage.removeItem('backendToken');
        navigation.goBack();
    };

    return (
        <TouchableOpacity onPress={onClickBackButton}>
            <Text style={styles.text}>SAIR</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    text: {
        padding: 4,
        fontSize: 14,
        color: 'white'
    }
});

export default LogoutButton;

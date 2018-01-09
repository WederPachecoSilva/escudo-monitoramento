// @ts-nocheck

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { FontAwesome } from '@expo/vector-icons';
// import('moment/locale/pt-br');

export default function Boleto({ boleto, confirmaBusca }) {
    const dataVencimento = moment(boleto.data_vencimento).format('DD/MM/YYYY');
    const valor = boleto.valor_corrigido.replace('.', ',');
    valorCorrigido = 'R$' + valor.replace(valor.charAt(1), '.');
    return (
        <View style={styles.table}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <FontAwesome
                    style={styles.icon}
                    name="barcode"
                    color="#66b2ff"
                    size={30}
                />
                <View>
                    <Text style={styles.text}>
                        Vencimento: {dataVencimento}
                    </Text>
                    <Text style={styles.text}>Valor: {valorCorrigido}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.button}
                color="blue"
                onPress={() => confirmaBusca(boleto.id_boletos)}
            >
                <View style={styles.buttonContent}>
                    <Text style={styles.buttonText}>CÓDIGO DE BARRAS</Text>
                    <FontAwesome
                        style={styles.buttonIcon}
                        name="envelope"
                        color="white"
                        size={20}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    table: {
        marginTop: 8,
        backgroundColor: '#ffffff',
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        borderWidth: 0.5,
        elevation: 10
    },
    text: {
        marginLeft: 25,
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    icon: {
        margin: 15
    },
    button: {
        borderRadius: 5,
        backgroundColor: '#acacac'
    },
    buttonText: {
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10,
        color: 'white'
    },
    buttonIcon: {
        margin: 10,
        marginLeft: 15
    },

    buttonContent: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

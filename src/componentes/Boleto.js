import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import moment from 'moment';
import { FontAwesome } from '@expo/vector-icons';
require('moment/locale/pt-br');

export default function Boleto({ boleto, confirmaBusca }) {
   const dataVencimento = moment(boleto.data_vencimento)
      .locale('pt-BR')
      .subtract(10, 'days')
      .calendar();
   const valorCorrigido = 'R$' + boleto.valor_corrigido.replace('.', ',');
   return (
      <View style={styles.table}>
         <View style={{ flexDirection: 'row', flex: 1 }}>
            // @ts-ignore
            <FontAwesome
               style={styles.icon}
               name="barcode"
               color="#66b2ff"
               size={30}
            />
            <View>
               <Text style={styles.text}>Vencimento: {dataVencimento}</Text>
               <Text style={styles.text}>Valor: {valorCorrigido}</Text>
            </View>
         </View>
         <Button
            style={styles.button}
            title="Envie por Email"
            color="blue"
            onPress={() => confirmaBusca(boleto.id_boletos)}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   table: {
      marginTop: 8,
      backgroundColor: '#ffffff',
      borderRadius: 15,
      borderWidth: 0.5,
      borderColor: '#d6d7da'
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
      marginLeft: 5,
      marginRight: 5,
      borderRadius: 20
   }
});

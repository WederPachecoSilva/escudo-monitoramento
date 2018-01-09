import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
    <Image style={styles.image} source={require('../../assets/logo.png')} />
);

const styles = StyleSheet.create({
    image: {
        marginLeft: 15,
        width: 40,
        height: 40,
        borderRadius: 15
    }
});

export default Logo;

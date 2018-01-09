import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
    <Image
        style={{ marginLeft: 15, width: 30, height: 30, borderRadius: 15 }}
        source={require('../../assets/logo.png')}
    />
);

const styles = StyleSheet.create({
    image: {}
});

export default Logo;

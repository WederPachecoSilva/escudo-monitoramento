import React, { Component } from 'react';
import { Image, Keyboard, Animated, StyleSheet } from 'react-native';
import { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL } from '../config';

export default class LogoAnimada extends Component {
    constructor(props) {
        super(props);
        this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
    }

    componentWillMount() {
        this.keyboardDidShow = Keyboard.addListener(
            'keyboardDidShow',
            // this.keyboardDidShow,
            this._keyboardDidShow
        );

        this.keyboardDidHide = Keyboard.addListener(
            'keyboardDidHide',
            // this._keyboardDidHide
            this._keyboardDidHide
        );
    }

    componentWillUnmount() {
        this.keyboardDidShow.remove();
        this.keyboardDidHide.remove();
    }

    _keyboardDidShow = event => {
        Animated.timing(this.imageHeight, {
            duration: 500,
            toValue: IMAGE_HEIGHT_SMALL
        }).start();
    };

    _keyboardDidHide = event => {
        Animated.timing(this.imageHeight, {
            duration: 500,
            toValue: IMAGE_HEIGHT
        }).start();
    };

    render() {
        return (
            <Animated.Image
                {...this.props}
                style={[
                    styles.image,
                    {
                        height: this.imageHeight,
                        width: this.imageHeight
                    }
                ]}
            />
        );
    }
}

const styles = StyleSheet.create({
    image: {
        marginBottom: 36
    }
});

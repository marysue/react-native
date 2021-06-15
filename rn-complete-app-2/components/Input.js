import React from 'react';
import { TextInput, StyleSheet, TouchableHighlightComponent } from 'react-native';


const Input = props => {
    // You can pass ALL the props you would normally set on the TextInput component from the
    // parent component ... and just spread them, and setting style= ... again is not a problem
    // because you want to overwrite the generic component's styles with the passed in styles
    return (
        <TextInput {...props} style={{...styles.input, ...props.style}}/>
    )
};

styles = StyleSheet.create({
    input: {
        height: 30,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginVertical: 10
    }
})

export default Input;

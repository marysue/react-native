//Because you cannot set the style for font-family on the parent view, and have it cascade down to the child <Text>
//element, you MUST set each <Text> element individually with the fontFamily you want to use.
//
//To work around this you can create a "thin wrapper" around your Text component where you simply set the text style,
// then use that  component throughout your project.

import React from 'react';
import { Text, StyleSheet } from 'react-native';

const BodyText = props => <Text style={{...styles.body, ...props.style}} >{props.children}</Text>;

const styles = StyleSheet.create({
    body: {
       fontFamily: 'open-sans-bold',
    }
});

export default BodyText;

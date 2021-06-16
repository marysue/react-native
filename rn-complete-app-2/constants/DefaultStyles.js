//An alternative to creating a thin wrapper to apply styles, you can create
//this stylesheet, then import it into your file and set your elements style
//using this:
//     import DefaultStyles from '../constants/DefaultStyles'
//     <Text style={DefaultStyles.bodyText}></Text>

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    bodyText: {
        fontFamily: 'open-sans',
        color: 'red'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    }
});

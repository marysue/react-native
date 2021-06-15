import { object } from 'prop-types';
import React from 'react';
import { View, StyleSheet } from 'react-native';

//the only purpose of this Card is to supply some styles to the surrounding container

//props.children is the special prop that you specify between the opening and closing tag of your component
//for instance <Card title="My title", inputValue={value}, visible={false}></Card>
// you would have:  props.children.title, probs.children.inputValue and props.children.visible

const Card = props => {
    // so that you can pass more styles into the card, you can use the spread operator with an object inside the object
    // the spread operator will take whatever you pass in, and append the card styles defined below
    // because you put props.style second in the spread list, props.children will overwrite any styles in the
    // styles.card object.
    return <View style={{...styles.card, ...props.style}}>{props.children}</View>

}

const styles = StyleSheet.create({
    card: {

        //ONLY FOR iOS these shadow properties work!  for shadow use a color, offset, opacity and radius
        //shadowRadius controls where the shadow is present, because width is 0, if our radius was 0 we would only have a
        //shadow at the bottom.  But setting the shadowRadius up a bit, we see the shadow surrounds the view.
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        //for android, use Elevation for the shadow:
        elevation: 5,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
    },
});

export default Card;

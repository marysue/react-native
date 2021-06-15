import React, { useState }from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputText => {
        //[^0-9] : look for anything that's NOT a 0 through 9
        //   /g -> globally ... or throughout the inputText string
        // '' -> replace that character with an empty string.  Essentially, removing the non-digit value from the string.

        //This is for android, because the number-pad doesn't work on android ... so you're just removing any
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    //You can actually change the value of setEnteredValue('') because it will only be changed
    //the next time the component is rerendered!
    const confirmInputHandler = () => {
        setConfirmed(true);
        setSelectedNumber(parseInt(enteredValue));
        setEnteredValue('');

    }
    //TouchableWithoutFeedback closes the keyboard if you touch somewhere else on the screen
    //It detects that you touched outside of the keyboard, and will dismiss the keyboard.
    //You need the Keyboard component from React to use this function.
    return (
        <TouchableWithoutFeedback onPress={ Keyboard.dismiss()}>
        <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>
            <Card style={styles.inputContainer}>
                <Text>Select a Number</Text>
                {/* on iOS blurOnSubmit does not work - only on android */}
                {/* also, keyboardType='numeric' will allow you to enter a decimal value; use number-pad for iOS */}
                {/* for android you need to do something different because it still allows you to type a decimal */}
                <Input
                    keyboardType='number-pad'
                    maxLength={2}
                    blurOnSubmit
                    style={styles.input}
                    // remember, these always come in pairs:  onChangeText feeds the value displayed back into value
                    onChangeText={numberInputHandler}
                    value={enteredValue}
                >
                </Input>
                <View style={styles.buttonContainer}>
                    {/* can't style the individual buttons but you can surround it by a view and style the view for each button */}
                    <View style={styles.buttons}><Button title="Reset" color={Colors.accent} onPress={resetInputHandler}></Button></View>
                    <View style={styles.buttons}><Button title="Confirm" color={Colors.primary} onPress={() => {}}></Button></View>
                </View>
            </Card>

        </View>
        </TouchableWithoutFeedback>
    )

}

const styles = StyleSheet.create ({
    // with flex 1 here it will take all the space below the header to the
    // bottom of the screen.
    screen: {
        flex: 1,
        padding: 10,
        //alignItems: 'center', //cross axis left-to-right
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    title: {
        fontSize: 20,
        marginVertical: 10, //spacing on the vertical axis
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%', //a little responsive design where if the width of 300 is > screen size, then set it to 80%
        alignItems: 'center', //center along cross axis (horizontally), which is left to right on input container as default flex is columns, so                      //axis is top to bottom, which would be justify content, and cross axis is left to right.
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',  //need 100% because otherwise it would set the width only as wide as the 2 buttons; we want it the size of the parent container
        justifyContent: 'space-between', //the main axis is left to right with a row
        paddingHorizontal: 15 //so the buttons don't sit right on the left and right margins
    },
    buttons: {
        width: '40%',
    },
    input: {
        width: 50,
        textAlign: 'center',
        color: 'black'
    }

});

export default StartGameScreen;

import React, {useState} from 'react';

import {View, TextInput, Button, StyleSheet} from 'react-native';

const GoalInput = props => {
    const [enteredGoal, setEnteredGoal] = useState('');

    const goalInputHandler = (enteredText) => {
        setEnteredGoal(enteredText);
      }



    return (
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Course Goal"
                style={styles.input}
                onChangeText={goalInputHandler}
                value={enteredGoal}
            />
            <Button title="ADD"
            
            onPress={props.onAddGoal.bind(this, enteredGoal)}
            />
        </View>
    );

};

const styles = StyleSheet.create( {
    inputContainer: {
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems: 'center'
      },
      input: {
        padding: 5,
        borderColor: 'black',
        borderWidth: 1,
        marginRight: 5,
        width: '80%'
      }
})

export default GoalInput;

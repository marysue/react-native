import React, {useState} from 'react';

import { View, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';

const GoalInput = props => {
    const [enteredGoal, setEnteredGoal] = useState('');

    const goalInputHandler = (enteredText) => {
        setEnteredGoal(enteredText);
      }

    const onAddGoal = () => {
        props.onAddGoal(enteredGoal);
        setEnteredGoal('');
    }

// To center the model on the screen, a few things to know:
// 1.  View doesn't take the full space available. It ONLY takes the space the children need.
// 2.  Modal does take the full space available.
//    To fix this, take the View's style, and set flex: 1 - which now will take ALL the space
//    available from the parent style (the Modal).
    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Course Goal"
                    style={styles.input}
                    onChangeText={goalInputHandler}
                    value={enteredGoal}
                />
                {/* Because the view only takes up the space needed for its children, we need to
                set a width on the style for the View to take up 60% of the available space.
                Because the parent view takes up 80%, we set the buttons slightly less ... 60% */}
                 <View style={styles.buttonContainer}>
                     {/* Because you cannot set an inline style on Button (is that right?) we need to use
                     a parent view to set the style, so we wrap each button in a view and style it. */}
                     <View style={styles.button}>
                        <Button title="CANCEL" color='red' onPress={props.onCancel}/>
                     </View>
                    <View style={styles.button}>
                        <Button title="ADD"
                            onPress={onAddGoal} />
                    </View>
                </View>
            </View>
        </Modal>
    );

};

const styles = StyleSheet.create( {
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      input: {
        padding: 5,
        borderColor: 'black',
        borderWidth: 1,
        marginRight: 5,
        width: '80%',
        marginBottom: 10
      },
      buttonContainer: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '80%'
      },
      button: {
          width: '40%'
      }

})

export default GoalInput;

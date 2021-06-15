// useRef allows you to bind to inputElements in your code
//  but it also allows you to set the element to a value that will survive re-render!
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert,  } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        console.log("generateRandomBetween:  calling recursively with min: ", min, " max: ", max, " exclude: ", exclude);
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));
    const [rounds, setRounds] = useState(0);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { onGameOver, userChoice } = props;


    //After the component has been rendered, the useEffect function will run.  Not before, not simultaneously ... after!
    useEffect(() => {
        if (currentGuess === userChoice) {
           console.log("currentGuess: ", currentGuess, " UserChoice:  ", userChoice);
           console.log("calling onGameOver with the number of rounds: ", rounds);
           onGameOver(rounds);
           //Alert.alert('Game over!', `You guessed this in ${rounds} rounds ...`, [{text: 'Congratulations!', style: 'cancel'}])
        }

    }, [currentGuess, userChoice, onGameOver ]);



    const nextGuessHandler = direction => {
        console.log("nextGuessHandler - CurrentHigh: ", currentHigh.current);
        console.log("nextGuessHandler - CurrentLow: ", currentLow.current);

        if (direction === 'lower' && currentGuess < props.userChoice) {
            Alert.alert('Don\'t lie!', 'You know that this is wrong...', [{text: 'Sorry!', style: 'cancel'}])
        }

        if (direction === 'higher' && currentGuess > props.userChoice) {
            Alert.alert('Don\'t lie!', 'You know that this is wrong...', [{text: 'Sorry!', style: 'cancel'}])
        }

        if (direction === 'lower') {
            //So, just below this component's declaration we initialize currentLow and currentHigh.  React then
            //recognizes that they have been initialized and stores them outside the component.  When we change the
            //value, React knows to go outside the component and change the value so it will survive re-render.
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }
            const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
            setCurrentGuess(nextNumber);
            setRounds(curRounds => curRounds + 1)
        }


    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')}/>
                <Button title="HIGHER" onPress={nextGuessHandler.bind(this, 'higher')}/>
            </Card>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    // whenever you set a width, set a max width to make sure your width never exceeds the bounds of the parent screen
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'

    }


});

export default GameScreen;

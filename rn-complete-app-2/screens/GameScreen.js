import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton'
import DefaultStyles from '../constants/DefaultStyles';
import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

//This version of renderListItem works fine with Scrollview, but with FlatList we need to change it
// const renderListItem = (value, numOfRound) => {
//   return (
//     <View key={value} style={styles.listItem}>
//         <BodyText>#{numOfRound}:  </BodyText>
//         <BodyText>{value}</BodyText>
//     </View>
//   )
// }

//we don't need a key here, because the key is done by FlatList
//itemData.item and itemData.index come with itemData automatically
//we are binding listLength to the first arg of renderListItem, where normally
//FlatList would simply take a function call back ... but we need to pass in the listLength arg for the
//guess number.
const renderListItem = (listLength, itemData) => {
  return (
    <View  style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}:  </BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
  )
}

const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  //detatched state handling:  useState uses default state upon first
  //render, and subsequent rerenders it will not use the default state again.
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);



  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' }
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    //setRounds(curRounds => curRounds + 1);
    setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]);
  };

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}><Ionicons size={24} name="md-remove" /></MainButton>
        <MainButton
          onPress={nextGuessHandler.bind(this, 'greater')}
        ><Ionicons size={24} name="md-add" /></MainButton>
      </Card>
      {/* Scrolling on ScrollView won't work properly on Android unless the view is set to flex: 1 */}
      <View style={styles.listContainer}>
        {/* To set styling on ScrollView or ListView you cannot use style={}, ;you need to use contentContainerStyle={} */}
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, idx) => renderListItem(guess, (pastGuesses.length - idx)))}
        </ScrollView> */}
        {/* FlatList requires a key, which in this case we can use the item because the guesses are unique.  But also, the past guesses need to be a string, and right
        now they are a number ... so in this code I've changed all of the pastGuesses to strings.  For ScrollView this isn't necessary */}

        {/* style doesn't allow you ;;to align the content in the list, but contentContainerStyle will allow this */}
        <FlatList
          keyExtractor={item => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}

        />
      </View>

    </View>
  );
};

//Styling list items can only be done to a point.  For instance, if you want to make the list item box larger, it's better to do
//that in a View wrapper.
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 400,
    maxWidth: '90%'
  },
  listContainer: {
    flex: 1,
    width: '80%'
  },
  list: {
    alignItems: 'center', //to control layout across the cross-axis
    justifyContent: 'flex-end',
    flexGrow: 1  //more flexible than flex; flex 1 means to take up all the space in the container you're able to get
                //flexGrow means to take all the available space in the container it needs as it grows, but to start scrolling
                //when it exceeds the boundaries of the container.  This way the list doesn't hide behind the + - icons as
                //it would with flex 1.
  },
  listItem: {
    borderColor: '#ccc',
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '30%'
  }
});

export default GameScreen;

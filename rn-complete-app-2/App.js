import React, { useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';


//to load fonts when app starts
//expo-font should be included by default, but run expo install expo-font to be sure
import * as Font from 'expo-font';
//import { AppLoading } from 'expo';
import AppLoading from 'expo-app-loading';

//fetchFonts returns a promise
const fetchFonts = async() => {
  await Font.loadAsync({
      'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold' : require('./assets/fonts/OpenSans-Bold.ttf'),
  });
}
//alternatively, use expo install to install app loading:
// expo install expo-app-loading
//   you can use npm install, but expo-install will assure the right version is installed
//   npm install may install the wrong version and break the app.
//then import it as follows:
//  import AppLoading from 'expo-app-loading';



export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    console.log("Entered if !dataLoaded...");
    return (<AppLoading
      startAsync={fetchFonts}
      onFinish={() => setDataLoaded(true)}
      onError={(err) => console.log(err)}
    />)
  }

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
      setUserNumber(selectedNumber);
      setGuessRounds(0);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  let content =
    <StartGameScreen
      onStartGame={startGameHandler}/>;

  if (userNumber && guessRounds <= 0) {
    content =
      <GameScreen
        userChoice={userNumber}
        onGameOver={gameOverHandler} />
  } else if (guessRounds > 0) {
    content =
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onRestart={configureNewGameHandler}/>;
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
     {content}

    </View>
  );
}

const styles = StyleSheet.create({
  // flex: 1 ensures that it takes up all the space it can get
  screen: {
    flex: 1,
  },
});

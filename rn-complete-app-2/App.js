import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';

export default function App() {
  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
    </View>
  );
}

const styles = StyleSheet.create({
  // flex: 1 ensures that it takes up all the space it can get
  screen: {
    flex: 1,
  },
});

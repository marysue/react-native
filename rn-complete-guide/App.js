import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList} from 'react-native';

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);



  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText);
  }

  const addGoalHandler = () => {
    console.log(enteredGoal);
    //setCourseGoals([...courseGoals, enteredGoal]);
    //To avoid latency issues, use anonymous function to spread courseGoals ...
    setCourseGoals(currentGoals => [...currentGoals, { id: Math.random().toString(), value: enteredGoal}]);
  }

  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Course Goal"
          style={styles.input}
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        <Button title="ADD"
          onPress={addGoalHandler}
        />

    </View>
    {/* <ScrollView>
        {courseGoals.map((goal, idx) => {return (
          <View style={styles.listItem} key={idx}>
            <Text >{goal}</Text>
          </View>)})}
      </ScrollView> */}

        <FlatList
          keyExtractor={(item, index) => item.id}
          data={courseGoals}
          renderItem={ itemData => (
            <View style={styles.listItem}>
              <Text>{itemData.item.value}</Text>
            </View>
          )
        }
        />

    </View>
  );
}

const styles = StyleSheet.create(
  {
    screen: {
      padding: 50
    },
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
    },
    listItem: {
      padding: 10,
      backgroundColor: '#ccc',
      borderColor: 'black',
      borderWidth: 1,
      marginVertical: 10
  }
}
);

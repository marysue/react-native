import React, {useState} from 'react';
import { StyleSheet, View, Button, FlatList} from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {

  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = (goalTitle) => {
    console.log(goalTitle);
    //setCourseGoals([...courseGoals, enteredGoal]);
    //To avoid latency issues, use anonymous function to spread courseGoals ...
    setCourseGoals(currentGoals => [
      ...currentGoals,
      { id: Math.random().toString(), value: goalTitle}
    ]);
    setIsAddMode(false);
  }

  const removeGoalHandler = (goalId) => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.id !== goalId)
    });
  }

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false)

  }

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
      <GoalInput
        visible={isAddMode}
        onDelete={removeGoalHandler}
        onAddGoal={addGoalHandler}
        onCancel={cancelGoalAdditionHandler}></GoalInput>

    {/* <ScrollView>
        {courseGoals.map((goal, idx) => {return (
          <View style={styles.listItem} key={idx}>
            <Text >{goal}</Text>
          </View>)})}
      </ScrollView> */}

        <FlatList
          //in the case your object doesn't have a key property,
          //use keyExtractor to get the actual key for the item.
          //in this case, the item's key is "id"
          //if the object had a key named "key", it wouldn't need
          //the keyExtractor.
          keyExtractor={(item, index) => item.id}
          data={courseGoals}
          renderItem={ itemData => (
            <GoalItem title={itemData.item.value} id={itemData.item.id} onDelete={removeGoalHandler}/>
          )
        }
        // Or you can just bind the removeGoalHandler to the id when setting your props as follows:
        // onDelete={removeGoalHandler.bind(this, itemData.item.id)}
        />

    </View>
  );
}

const styles = StyleSheet.create(
  {
    screen: {
      padding: 50
    },

}
);

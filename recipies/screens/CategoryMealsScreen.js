//Loads the meals for a chosen type
//where we select a food category
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const CategoryMealsScreen = props => {

    return (
        <View style={styles.screen}>
            <Text>CategoryMealsScreen</Text>
            <Button title="Go to Details" onPress={() => {
                props.navigation.navigate({
                        routeName: 'MealDetail'
                })
            }} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default CategoryMealsScreen;

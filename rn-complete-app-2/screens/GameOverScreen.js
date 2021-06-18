import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';


// All images are faded in ... however, web images are more obvious because they take longer to load.
// you can set that fadeDuration where 300ms is the default.  Subsequent loads are much faster because
// the image is cached.
const GameOverScreen = props => {
    //resizeMode:  'cover' resizes the image to consume the area availabe and keep its aspect ratio
    // but may crop areas to fit; cover is the default
    //             'contain' may not take the entire area available - it may leave space above/below or left/right

    //Styles on parent components are NOT passed down to child components - EXCEPT with Text components.  Text components
    //will pass their styles down to children text components.
    return (
        <View style = {styles.screen}>
            <TitleText> The Game is Over!</TitleText>
            <View style={styles.imageContainer}>
            {/* Local image loading: */}
            <Image
                source={require('../assets/success.png')}
                // source={{uri: 'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg'}}
                style={styles.image}
                resizeMode='cover'
                fadeDuration={300}
            />
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>Your phone needed
                    <Text style={styles.highlight}> {props.roundsNumber}</Text> rounds to guess number
                    <Text style={styles.highlight}> {props.userNumber}</Text>.
                </BodyText>
            </View>

            <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
        </View>
    )

};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    //if the local image is perfectly sized, you do not have to set width and height as react-native is able to
    //determine the size of the image is before it is loaded.

    //for network images you ALWAYS have to set width and height because react-native is not able to compute it.

    image: {
        //cannot use 80% because View needs to set a percentage ... so width needs to be a specific width
        // width: '80%',
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        // width: 300,
        // height: 300,
        // borderRadius: 150,
        // Dynamically calculated:
        width: Dimensions.get('window').width * 0.7, //and because it's supposed to be a square, height should be calc the same
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,  
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden', //so that any part of the image that goes beyond the boundaries is clipped.
        marginVertical: 30
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
        textAlign: 'center'
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: 15
    }

});

export default GameOverScreen;

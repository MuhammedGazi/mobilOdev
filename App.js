import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as FileSystem from 'expo-file-system';

const wordsData = [
  { "word": "Apple", "definition": "A red or green fruit with a sweet taste.", "id": 1 },
  { "word": "Car", "definition": "A vehicle with four wheels that is powered by an engine.", "id": 2 },
  { "word": "Sun", "definition": "The star that is the central body of the solar system.", "id": 3 },
];

const HomeScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleCard = () => {
    setIsFlipped(!isFlipped);
  };

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % wordsData.length);
    setIsFlipped(false);
  };

  const likeWord = async () => {
    try {
      const likedWordsFilePath = `${FileSystem.documentDirectory}likedWords.json`;
      const likedWordsContent = await FileSystem.readAsStringAsync(likedWordsFilePath);
      let likedWords = JSON.parse(likedWordsContent);
      const currentWord = wordsData[currentIndex].word;

      // Check if the word is not already liked
      if (!likedWords.includes(currentWord)) {
        likedWords.push(currentWord);

        // Update the likedWords file
        await FileSystem.writeAsStringAsync(likedWordsFilePath, JSON.stringify(likedWords));

        console.log('Liked word added:', currentWord);

        Alert.alert('Success', `${currentWord} added to liked words.`);
      } else {
        Alert.alert('Info', `${currentWord} is already in liked words.`);
      }
    } catch (error) {
      console.error('Error liking word:', error);
      Alert.alert('Error', 'An error occurred while liking word.');
    }
  };

  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleCard}>
        <View style={[styles.card, isFlipped && styles.flipped]}>
          <Text style={[styles.text, isFlipped && styles.flippedText]}>
            {isFlipped ? wordsData[currentIndex].definition : wordsData[currentIndex].word}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={nextCard}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Next Card</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={likeWord}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Like Word</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Go to Profile</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const ProfileScreen = ({ navigation }) => {
  const [likedWords, setLikedWords] = useState([]);

  const loadLikedWords = async () => {
    try {
      const likedWordsFilePath = `${FileSystem.documentDirectory}likedWords.json`;
      const likedWordsContent = await FileSystem.readAsStringAsync(likedWordsFilePath);
      const parsedLikedWords = JSON.parse(likedWordsContent);
      setLikedWords(parsedLikedWords);
    } catch (error) {
      console.error('Error loading liked words:', error);
    }
  };

  useEffect(() => {
    loadLikedWords();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Liked Words</Text>
      <View>
        {likedWords.map((word) => (
          <Text key={word}>{word}</Text>
        ))}
      </View>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  const createLikedWordsFile = async () => {
    const likedWordsFilePath = `${FileSystem.documentDirectory}likedWords.json`;

    try {
      await FileSystem.writeAsStringAsync(likedWordsFilePath, '[]');
      const likedWordsContent = await FileSystem.readAsStringAsync(likedWordsFilePath);
      console.log('likedWords.json content:', likedWordsContent);
    } catch (error) {
      console.error('Error creating likedWords.json:', error);
    }
  };

  createLikedWordsFile();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
  },
  heading: {
    marginBottom: 30,
    color: 'green',
    fontSize: 30,
    fontWeight: 'bold',
  },
  card: {
    width: 300,
    height: 200,
    borderRadius: 30,
    backgroundColor: 'grey',
    overflow: 'hidden',
  },
  flipped: {
    transform: [{ rotateY: '180deg' }],
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    padding: 20,
    color: 'white',
  },
  flippedText: {
    transform: [{ rotateY: '180deg' }],
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});

export default App;

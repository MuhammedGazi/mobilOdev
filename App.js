import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

const wordsData = [
  { "word": "Apple", "definition": "A red or green fruit with a sweet taste.", "id": 1 },
  { "word": "Car", "definition": "A vehicle with four wheels that is powered by an engine.", "id": 2 },
  { "word": "Sun", "definition": "The star that is the central body of the solar system.", "id": 3 },
];




// Uygulama başladığında veya belirli bir yerde çağrarak dosyayı oluşturun
const createLikedWordsFile = async () => {
  const likedWordsFilePath = `${FileSystem.documentDirectory}likedWords.json`;

  try {
    // Dosya mevcut değilse oluşturun
    await FileSystem.writeAsStringAsync(likedWordsFilePath, '[]');


    const likedWordsContent = await FileSystem.readAsStringAsync(likedWordsFilePath);
    console.log('likedWords.json content:', likedWordsContent);

  } catch (error) {
    console.error('Error creating likedWords.json:', error);
  }



};

createLikedWordsFile();



const FlipCardApp = () => {
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
  
        console.log('Liked word added:', currentWord); // Yeni log eklenen beğenilen kelimeyi gösterir
  
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
    </View>
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
		color: "green", 
		fontSize: 30, 
		fontWeight: "bold", 
	}, 
	card: { 
		width: 300, 
		height: 200, 
		borderRadius: 30, 
		backgroundColor: 'grey', 

		
		overflow: 'hidden', 
	}, 
	shadow: { 
		shadowColor: 'red', 
		shadowOpacity: 1, 
		shadowRadius: 15, 
		shadowOffset: { width: 0, height: 0 }, 
	}, 
	imageContainer: { 
		flex: 1, 
		alignItems: 'center', 
		justifyContent: 'center', 
	}, 
	image: { 
		width: "100%", 
		height: "100%", 
		borderRadius: 4, 
	}, 
	button: { 
		backgroundColor: 'green', 
		padding: "10px 30px 10px 30px", 
		borderRadius: 5, 
		marginTop: 20, 
	}, 
	buttonText: { 
		fontSize: 20, 
		fontWeight: 'bold', 
		textAlign: 'center', 
		color: "white", 
	}, 
});

export default FlipCardApp;

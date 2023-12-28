import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useWords } from './wordsContext';
import { useNavigation } from '@react-navigation/native';

const Flipcard = () => {
  const { words } = useWords();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [favoriteWords, setFavoriteWords] = useState([]);
  const [learnedWords, setLearnedWords] = useState([]);
  const [unknownWords, setUnknownWords] = useState([]);
  const currentWord = words[currentWordIndex];
  const navigation = useNavigation();

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAnswer = (isCorrect, isFavorite, isLearned, isUnknown) => {
    const currentWordInfo = { ...currentWord, isCorrect };

    const isWordAlreadyAdded =
      learnedWords.some((word) => word.id === currentWordInfo.id) ||
      unknownWords.some((word) => word.id === currentWordInfo.id) ||
      favoriteWords.some((word) => word.id === currentWordInfo.id);

    if (!isWordAlreadyAdded) {
      if (isCorrect) {
        setLearnedWords((prevWords) => [...prevWords, currentWordInfo]);
      } else {
        setUnknownWords((prevWords) => [...prevWords, currentWordInfo]);
      }

      if (isFavorite) {
        setFavoriteWords((prevWords) => [...prevWords, currentWordInfo]);
      }

      if (isLearned) { //kullanıcı doğru cevap vermiş ve bu kelime daha önce öğrenilmişse, bu kelimeyi öğrenilmiş kelimeler listesine ekler. 
        setLearnedWords((prevWords) => [...prevWords, currentWordInfo]);
      }
      if (isUnknown) {
        setUnknownWords((prevWords) => [...prevWords, currentWordInfo]);
      }
    }

    setIsFlipped(false);

    if (!isFavorite) {
      if (currentWordIndex < words.length - 1) {
        setCurrentWordIndex((prevIndex) => prevIndex + 1);
      } else {
        setCurrentWordIndex(0);
      }
    }
  };

  const navigateToProfile = () => {
    navigation.navigate('Profile', {
      favoriteWords,
      learnedWords,
      unknownWords,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardText}>{isFlipped ? currentWord.translation : currentWord.word}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={flipCard}>
          <Text style={styles.buttonText}>Flip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAnswer(true, false, true, false)}>
          <Text style={styles.buttonText}>Doğru</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAnswer(false, false, false, true)}>
          <Text style={styles.buttonText}>Yanlış</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAnswer(false, true, false, false)}>
          <Text style={styles.buttonText}>Favori</Text>
        </TouchableOpacity>
      </View>
      {/* Profil sayfasına git butonu */}
      <TouchableOpacity
        style={styles.profileButton}
        onPress={navigateToProfile}>
        <Text style={styles.profileButtonText}>Profil Sayfasına Git</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 250,
    height: 180,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginVertical: 20,
    shadowColor: '#2c3e50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#2ecc71',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  // Profil sayfasına git butonu stilleri
  profileButton: {
    marginTop: 20,
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  profileButtonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default Flipcard;

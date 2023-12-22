import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as FileSystem from 'expo-file-system';

const wordsData = [
  { "word": "Elma", "definition": "Tatlı bir tada sahip kırmızı veya yeşil meyve.", "id": 1 },
  { "word": "Araba", "definition": "Dört tekerlekli, motorla çalışan bir taşıt aracı.", "id": 2 },
  { "word": "Güneş", "definition": "Güneş sisteminin merkezinde bulunan yıldız.", "id": 3 },
];

const HomeScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState(0);

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

      // Kelimenin daha önce beğenilip beğenilmediğini kontrol et
      if (!likedWords.includes(currentWord)) {
        likedWords.push(currentWord);

        // Beğenilen kelimeler dosyasını güncelle
        await FileSystem.writeAsStringAsync(likedWordsFilePath, JSON.stringify(likedWords));

        console.log('Beğenilen kelime eklendi:', currentWord);

        Alert.alert('Başarılı', `${currentWord} beğenilen kelimelere eklendi.`);
      } else {
        Alert.alert('Bilgi', `${currentWord} zaten beğenilen kelimelerde bulunuyor.`);
      }
    } catch (error) {
      console.error('Kelime beğenme hatası:', error);
      Alert.alert('Hata', 'Kelime beğenirken bir hata oluştu.');
    }
  };

  const handleWrongAnswer = () => {
    setWrongAnswers(wrongAnswers + 1);
    // İhtiyaca göre burada başka bir mantık ekleyebilirsiniz.
    Alert.alert('Yanlış Cevap', 'Tekrar deneyin!');
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
          <Text style={styles.buttonText}>Sonraki Kart</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={likeWord}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Kelimeyi Beğen</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleWrongAnswer}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Yanlış Cevap</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.buttonText}>Yanlış Cevap Sayısı: {wrongAnswers}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Profil')}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Profili Görüntüle</Text>
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
      console.error('Beğenilen kelimeleri yükleme hatası:', error);
    }
  };

  useEffect(() => {
    loadLikedWords();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Beğenilen Kelimeler</Text>
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
      console.log('likedWords.json içeriği:', likedWordsContent);
    } catch (error) {
      console.error('Beğenilen kelimeler dosyası oluşturma hatası:', error);
    }
  };

  createLikedWordsFile();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AnaSayfa">
        <Stack.Screen name="AnaSayfa" component={HomeScreen} />
        <Stack.Screen name="Profil" component={ProfileScreen} />
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

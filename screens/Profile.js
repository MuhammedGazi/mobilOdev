import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Profile = ({ route }) => {
  const { favoriteWords, learnedWords, unknownWords } = route.params;

  // Kategoriyi render etme fonksiyonu
  const renderCategory = (title, words) => {
    const uniqueWords = [];

    words.forEach((word) => {
      // Eğer uniqueWords içinde henüz bu kelime yoksa ekleyin
      if (!uniqueWords.some((uniqueWord) => uniqueWord.id === word.id)) {
        uniqueWords.push(word);
      }
    });
    //uniqueWords.map((word) => ( ... )): Bu, her bir kelimenin (word) uniqueWords dizisinde döngü yapar. 
    //Her kelime için bir Text bileşeni oluşturulur. 
    //Bu bileşenin anahtarı (key), kelimenin id özelliği ve kategorinin adıyla birleştirilir. 
    //Her bir kelimenin metni, Text bileşeninin içine yerleştirilir

    return (
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>{title}</Text>
        {uniqueWords.length > 0 ? (
          uniqueWords.map((word) => ( 
            <Text key={`${title.toLowerCase()}-${word.id}`} style={styles.wordItem}>
              {word.word}
            </Text>
          ))
        ) : (
          <Text style={styles.emptyMessage}>{`Henüz ${title.toLowerCase()} kelimeniz yok.`}</Text>
        )}
      </View>
    );
  };

  return ( //içeriğin ekrana sığması ScrollView
    <ScrollView contentContainerStyle={styles.container}>   
      <Text style={styles.title}>Profil Sayfanız</Text>

      {renderCategory('Favori Kelimelerim', favoriteWords)}
      {renderCategory('Öğrendiğim Kelimeler', learnedWords)}
      {renderCategory('Bilmediğim Kelimeler', unknownWords)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  wordItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  emptyMessage: {
    fontStyle: 'italic',
    color: '#888', // Gri tonu
  },
});

export default Profile;

import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, FlatList } from 'react-native';
import { useWords } from './wordsContext';

const Admin = () => {
  // wordsContext'ten gelen state ve setWords fonksiyonunu al
  const { words, setWords } = useWords();
   // Yeni kelime ve çevirisini tutan state'ler
  const [newWord, setNewWord] = useState('');
  const [newTranslation, setNewTranslation] = useState('');

  const addWord = () => {
    if (newWord && newTranslation) {
      // Yeni kelimenin nesnesini oluştur
      const newWordObject = {
        id: words.length + 1,
        word: newWord,
        translation: newTranslation,
      };

       // Kelimeleri güncelle
      setWords((prevWords) => [...prevWords, newWordObject]);
      // Input alanlarını temizle
      setNewWord('');
      setNewTranslation('');
    }
  };

  const removeWord = (id) => {
    const updatedWords = words.filter((word) => word.id !== id);
    setWords(updatedWords);
  };

  // FlatList için renderItem fonksiyonu
  const renderItem = ({ item }) => (
    <View style={styles.wordItem}>
      <Text style={styles.wordText}>{item.word} - {item.translation}</Text>
      <Button title="Remove" onPress={() => removeWord(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Page</Text>
      <TextInput
        style={styles.input}
        placeholder="Word"
        value={newWord}
        onChangeText={(text) => setNewWord(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Translation"
        value={newTranslation}
        onChangeText={(text) => setNewTranslation(text)}
      />
      <Button title="Add Word" onPress={addWord} />
      <FlatList
        style={styles.wordList}
        data={words}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  wordList: {
    marginTop: 20,
    width: '80%',
  },
  wordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ecf0f1',
    borderRadius: 5,
  },
  wordText: {
    fontSize: 16,
  },
});

export default Admin;

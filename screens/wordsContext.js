// wordsContext.js

import React, { createContext, useContext, useState } from 'react';

// Kelimelerin durumunu ve setWords fonksiyonunu içeren bir context oluşturuluyor
const WordsContext = createContext();

// WordsProvider bileşeni, çocuk bileşenlerine words ve setWords'u sağlar
export const WordsProvider = ({ children }) => {
  // Örnek kelimelerle başlangıç durumu
  const [words, setWords] = useState([
    { id: 1, word: 'Hello', translation: 'Merhaba' },
    { id: 2, word: 'World', translation: 'Dünya' },
    // Diğer kelimeler buraya eklenebilir
  ]);

  return (
    // Context değerleri children bileşenlerine sağlanıyor
    <WordsContext.Provider value={{ words, setWords }}>
      {children}
    </WordsContext.Provider>
  );
};

// useWords hook'u, WordsProvider içinde kullanılmadığı durumda hata fırlatır
export const useWords = () => {
  const context = useContext(WordsContext);
  if (!context) {
    throw new Error('useWords must be used within a WordsProvider');
  }
  return context;
};


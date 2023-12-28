import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState(''); //useState hook'unu kullanarak username adında bir durumu ve bu durumu güncellemek için bir fonksiyonu  tanımlar.
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (
      (username === 'user' && password === 'user1') ||
      (username === 'admin' && password === 'admin1')
    ) {
      alert('Giriş başarılı!');
      if (username === 'user') {
        navigation.navigate('Flipcard');
      } else if (username === 'admin') {
        navigation.navigate('Admin');
      }
    } else {
      alert('Kullanıcı adı veya şifre hatalı!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hoş Geldiniz!</Text>
      <TextInput
        style={styles.input}
        placeholder="Kullanıcı Adı"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        title="Giriş Yap"
        onPress={handleLogin}
        color="#841584" // Özel bir renk ekleyebilirsiniz
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ecf0f1', // Arka plan rengi
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    color: '#2c3e50', // Metin rengi
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#3498db', // Çerçeve rengi
    borderWidth: 2,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4, // Köşe yuvarlama
  },
});

export default Login;

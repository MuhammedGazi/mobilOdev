// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WordsProvider } from './screens/wordsContext'; 
import Login from './screens/Login'; 
import Flipcard from './screens/Flipcard';
import Profile from './screens/Profile';
import Admin from './screens/Admin';

const Stack = createStackNavigator();

const App = () => {
  return (
    <WordsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Flipcard" component={Flipcard} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Admin" component={Admin} />
        </Stack.Navigator>
      </NavigationContainer>
    </WordsProvider>
  );
};

export default App;

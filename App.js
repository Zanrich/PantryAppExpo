import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './store';
import { useFonts } from 'expo-font';
// import { StatusBar } from 'expo-status-bar';

import RegistrationScreen from './screens/RegistrationScreen';
import TabNavigator from './navigation/TabNavigator';
import CartScreen from './screens/CartScreen';
import { StyleSheet, View, StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'PlayfairDisplay-Regular': require('./assets/fonts/PlayfairDisplay-Regular.ttf'),
    'PlayfairDisplay-Italic': require('./assets/fonts/PlayfairDisplay-Italic.ttf'),
    'PlayfairDisplay-Medium': require('./assets/fonts/PlayfairDisplay-Medium.ttf'),
    'Avenir': require('./assets/fonts/Avenir-Roman.ttf'),
    'AdobeGaramondProRegular': require('./assets/fonts/AGaramondPro-Bold.otf'),
    'AdobeGaramondProBoldItalic': require('./assets/fonts/AGaramondPro-BoldItalic.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar      
        barStyle="dark-content"
          backgroundColor="#fff"
          hidden={false}
          translucent={false} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen name="MainApp" component={TabNavigator} />
          <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

import UserLoginAndRegisterPage from './screens/UserLoginAndRegisterPage';
import AddFarmPage from './screens/AddFarmPage';

export type RootStackParamList = {
  UserLoginAndRegisterPage: undefined;
  AddFarmPage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const App = () => {
  return (
    <NavigationContainer theme={theme}>
      <StatusBar style="auto" />
      <LinearGradient colors={['transparent', 'green']} style={{ flex: 1, padding: 10 }} start={{ x: 0.25, y: 0.25 }}>
        <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName="UserLoginAndRegisterPage">
          <Stack.Screen name="UserLoginAndRegisterPage" component={UserLoginAndRegisterPage} />
          <Stack.Screen name="AddFarmPage" component={AddFarmPage} />
        </Stack.Navigator>
      </LinearGradient>
    </NavigationContainer>
  );
};

export default App;

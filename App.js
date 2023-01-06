import React from 'react';
import { LogBox } from 'react-native';
import MainStackNavigator from './Navigation';


export default function App() {

  LogBox.ignoreLogs(['Remote debugger']);
  return (
    <MainStackNavigator />
  );
}

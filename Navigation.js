import React from "react";
import { Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';


//screens
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ElevatorStatusScreen from "./screens/ElevatorStatusScreen";


const Stack = createNativeStackNavigator();


//Page controller
function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerShown: true,
        }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen}
          options={{
            title: 'Log In',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen name="HomeScreen" component={HomeScreen}
          options={
            ({navigation}) => (
            {
              title: 'Home',
              headerTitleAlign: 'center',
              headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate ('LoginScreen')}>
                <Text style={styles.text}>Log Out</Text>
              </TouchableOpacity>
            )}
          )}
          />
          <Stack.Screen name="ElevatorStatusScreen" component={ElevatorStatusScreen}
          options={
            ({navigation}) => (
            {
              title: 'Elevator Status',
              headerTitleAlign: 'center',
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate ('HomeScreen')}>
                <Text style={styles.text}>Back</Text>
              </TouchableOpacity>
              ),
              headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate ('LoginScreen')}>
                <Text style={styles.text}>Log Out</Text>
              </TouchableOpacity>
            )}
          )}
          />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    width: '100%',
    marginRight:15,
  },
})

export default MainStackNavigator
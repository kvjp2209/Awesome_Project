import { Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

function HomeScreen() {
  return (
  <SafeAreaView>
    <TouchableOpacity style={styles.button} >
      <Text>
        acxvcxv
      </Text>
    </TouchableOpacity>
  </SafeAreaView>
  );
}
const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name='HomeScreen ' component={HomeScreen}  options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({
  button: {
    width: 300,
    height: 30,
    backgroundColor: "red"
  }
})
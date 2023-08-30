import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Entries from './Components/Entries';
import MyTrips from './Components/MyTrips';
import TripProfile from './Components/TripProfile';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Travel Diary</Text>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.navigate('Entries')}
      >
        <Text style={styles.menuButtonText}>Entries</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.navigate('My Trips')}
      >
        <Text style={styles.menuButtonText}>My Trips</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}/>
        <Stack.Screen name="Entries" component={Entries} />
        <Stack.Screen name="My Trips" component={MyTrips} />
        <Stack.Screen
        name="TripProfile"
        component={TripProfile}
        options={{
          title: 'Trip Profile',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'blue' },
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 65,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
  },
  menuButton: {
    backgroundColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  menuButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default App;

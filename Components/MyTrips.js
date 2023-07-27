import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyTrips = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>My Trips</Text>
      {/* Add content for the "My Trips" screen here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default MyTrips;

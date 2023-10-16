import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, TextInput, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 

const MyTrips = () => {
  const [trips, setTrips] = useState([]);
  const [tripName, setTripName] = useState('');
  const [tripImage, setTripImage] = useState('');
  const [tripNotes, setTripNotes] = useState('');
  const [showForm, setShowForm] = useState(false);
  const navigation = useNavigation(); 

  const addTrip = () => {
    if (tripName && tripNotes) {
      const newTrip = {
        id: Date.now().toString(),
        name: tripName,
        image: tripImage,
        notes: tripNotes,
      };
      setTrips([...trips, newTrip]);
      setTripName('');
      setTripImage('');
      setTripNotes('');
      setShowForm(false);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to select an image.');
      return;
    }
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setTripImage(result.uri);
      }
    } catch (error) {
      console.log('Error while picking an image:', error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <ImageBackground
      source={require('../assets/map.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {trips.map((trip) => (
           <TouchableOpacity
           key={trip.id}
           style={styles.tripItem}
           onPress={() => {
             navigation.navigate('TripProfile', { trip, trips }); // Pass both trip and trips
           }}
         >
            <Text style={styles.tripName}>{trip.name}</Text>
            <Text style={styles.tripNotes}>{trip.notes}</Text>
            <ImageBackground source={{ uri: trip.image }} style={styles.tripImage}>
              {/* You can add any overlay or additional content on the image here */}
            </ImageBackground>
            </TouchableOpacity>
        ))}
        {showForm && (
          <View style={styles.newTripForm}>
            <TouchableOpacity style={styles.addImageButton} onPress={pickImage}>
              <Text style={styles.addImageButtonText}>Add Image</Text>
            </TouchableOpacity>
            {tripImage ? (
              <Image source={{ uri: tripImage }} style={styles.selectedImage} />
            ) : null}

            <TextInput
              style={styles.input}
              placeholder="Location"
              value={tripName}
              onChangeText={(text) => setTripName(text)}
            />

            <TextInput
              style={[styles.input, styles.notesInput]}
              multiline
              placeholder="Notes and memories"
              value={tripNotes}
              onChangeText={(text) => setTripNotes(text)}
            />

            <TouchableOpacity style={styles.addButton} onPress={addTrip}>
              <Text style={styles.addButtonLabel}>Add Trip</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.addTripButton} onPress={toggleForm}>
        <Text style={styles.addTripButtonText}>Add Trip</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentContainer: {
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  tripItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  tripName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tripNotes: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  tripImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 10,
  },
  newTripForm: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  notesInput: {
    height: 100,
  },
  addButton: {
    backgroundColor: 'green',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addImageButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 5,
    borderRadius: 8,
    alignItems: 'center',
    width: 85,
    height: 30,
    marginBottom: 10,
  },
  addImageButtonText: {
    color: 'white',
    fontSize: 15,
  },
  selectedImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  addTripButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -50 }],
    width: 150,
  },
  addTripButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MyTrips;

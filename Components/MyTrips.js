import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, TextInput, ScrollView, Image, KeyboardAvoidingView, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import TripItem from './TripItem';

const MyTrips = () => {
    const [trips, setTrips] = useState([]);
    const [tripName, setTripName] = useState('');
    const [tripImage, setTripImage] = useState('');
    const [tripNotes, setTripNotes] = useState('');
    const [showForm, setShowForm] = useState(false);

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

    const navigation = useNavigation();

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

            if (!result.cancelled) {
                setTripImage(result.uri);
            }
        } catch (error) {
            console.log('Error while picking an image:', error);
        }
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const handleTripClick = (trip) => {
        navigation.navigate('TripProfile', { trip, trips });
    };

    const renderTripItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleTripClick(item)}>
          <View style={styles.tripItem}>
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.tripImage} />
            ) : (
              <View style={styles.tripImagePlaceholder}>
                <MaterialIcons name="photo" size={50} color="white" />
              </View>
            )}
            <Text style={styles.tripName}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      );

      return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.overlay} />
          <FlatList
            data={trips}
            renderItem={renderTripItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.contentContainer}
          />
          {showForm && (
            <View style={styles.newTripForm}>
              {tripImage ? (
                <Image source={{ uri: tripImage }} style={styles.selectedImage} />
              ) : (
                <TouchableOpacity style={styles.addImageButton} onPress={pickImage}>
                  <MaterialIcons name="add-a-photo" size={24} color="white" />
                </TouchableOpacity>
              )}
    
              <TextInput
                style={styles.input}
                placeholder="Trip Name"
                value={tripName}
                onChangeText={setTripName}
              />
    
              <TextInput
                style={[styles.input, styles.notesInput]}
                multiline
                placeholder="Trip Notes"
                value={tripNotes}
                onChangeText={setTripNotes}
              />
    
              <TouchableOpacity style={styles.addButton} onPress={addTrip}>
                <Text style={styles.addButtonLabel}>Add</Text>
              </TouchableOpacity>
            </View>
          )}
            <TouchableOpacity style={styles.addTripButton} onPress={toggleForm}>
            <Text style={styles.addTripButtonText}>Add Trip</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
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
    },
    contentContainer: {
        padding: 20,
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
        color: '#ccc',
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
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 8,
        padding: 20,
        marginTop: 10,
        marginBottom: 100,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    notesInput: {
        height: 50,
    },
    addButton: {
        paddingVertical: 10,
        backgroundColor: 'black',
        width: 50,
        height: 40,
        borderRadius: 10,
        marginTop: 10,
        left: '42%',
    },
    addButtonLabel: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        paddingBottom: 10,
    },
    addImageButton: {
        marginLeft: 280,
        marginBottom: 15,
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
        width: 110,
    },
    addTripButtonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    editButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 5,
        borderRadius: 5,
    },
    deleteButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 5,
        borderRadius: 5,
    },
    tripOverlayText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default MyTrips;

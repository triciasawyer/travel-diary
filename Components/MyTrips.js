import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, TextInput, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
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


    const handleEditTrip = (updatedTrip) => {
        const updatedTrips = trips.map((trip) =>
            trip.id === updatedTrip.id ? updatedTrip : trip
        );
        setTrips(updatedTrips);
    };

    const handleDeleteTrip = (deletedTrip) => {
        const updatedTrips = trips.filter((trip) => trip.id !== deletedTrip.id);
        setTrips(updatedTrips);
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
                    <TripItem
                        key={trip.id}
                        trip={trip}
                        onEdit={handleEditTrip}
                        onDelete={handleDeleteTrip}
                    />
                ))}

                {showForm && (
                    <View style={styles.newTripForm}>
                        <TouchableOpacity style={styles.addImageButton} onPress={pickImage}>
                            <Text style={styles.addImageButtonText}>Add Image</Text>
                        </TouchableOpacity>
                        {tripImage ? (
                            <Image
                                source={{ uri: tripImage }}
                                style={styles.selectedImage}
                            />
                        ) : null}

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

                        <TouchableOpacity
                            style={styles.addButton} onPress={addTrip}>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
    },
    contentContainer: {
        padding: 20,
    },
    tripItem: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white background
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
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white background
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
        height: 100, // Adjust the height of the notes input
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

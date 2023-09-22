import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const EditTrip = ({ route, navigation }) => {
    // Get trip data from route.params
    const { trip } = route.params;

    // State to manage edited trip data
    const [editedTripName, setEditedTripName] = useState(trip.name);
    const [editedTripImage, setEditedTripImage] = useState(trip.image);
    const [editedTripNotes, setEditedTripNotes] = useState(trip.notes);

    // Function to update edited trip
    const saveEditedTrip = () => {
        // Implement logic to update the trip with the edited data
        // You can use setTrips or any other method to update the trips data
        // After updating, you can navigate back to the TripProfile screen
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text>Edit Trip: {trip.name}</Text>
            <TextInput
                placeholder="Edit Trip Name"
                value={editedTripName}
                onChangeText={setEditedTripName}
            />
            <TextInput
                placeholder="Edit Trip Image"
                value={editedTripImage}
                onChangeText={setEditedTripImage}
            />
            <TextInput
                placeholder="Edit Trip Notes"
                value={editedTripNotes}
                onChangeText={setEditedTripNotes}
            />
            <TouchableOpacity onPress={saveEditedTrip}>
                <Text>Save Changes</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default EditTrip;

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TripProfile = ({ route, trips, updateTrips }) => {
    const { trip } = route.params;

    const handleEdit = (updatedTrip) => {
        const updatedTrips = trips.map((t) =>
            t.id === updatedTrip.id ? updatedTrip : t
        );
        updateTrips(updatedTrips);
    };

    const handleDelete = (deletedTrip) => {
        const updatedTrips = trips.filter((t) => t.id !== deletedTrip.id);
        updateTrips(updatedTrips);
    };

    return (
        <View style={styles.container}>
            {trip.image ? (
                <Image
                    source={{ uri: trip.image }}
                    style={styles.tripImage}
                />
            ) : (
                <View style={styles.tripImagePlaceholder}>
                    <MaterialIcons name="photo" size={100} color="white" />
                </View>
            )}
            <View style={styles.tripActions}>
                <TouchableOpacity onPress={handleEdit}>
                    <MaterialIcons name="edit" size={24} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete}>
                    <MaterialIcons name="delete" size={24} color="red" />
                </TouchableOpacity>
            </View>
            <Text style={styles.tripName}>{trip.name}</Text>
            <Text style={styles.tripNotes}>{trip.notes}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
        marginBottom: 10,
    },
    tripImagePlaceholder: {
        width: '100%',
        height: 200,
        backgroundColor: 'gray',
        borderRadius: 8,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tripActions: {
        flexDirection: 'row',
        marginBottom: 10,
        marginLeft: 275,
    },
});

export default TripProfile;

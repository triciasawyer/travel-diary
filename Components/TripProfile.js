import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const TripProfile = ({ route }) => {
    const { trip, trips } = route.params;
    const navigation = useNavigation();
    // console.log('TripProfile trip:', trip);
    // console.log('TripProfile trips:', trips);

    const handleEditTrip = () => {
        navigation.navigate('EditTrip', { trip });
    };

    const handleDeleteTrip = () => {
        Alert.alert(
            'Delete Trip',
            'Are you sure you want to delete this trip?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        const updatedTrips = trips.filter((t) => t.id !== trip.id);
                        // Update the trips state with the new array without the deleted trip
                        setTrips(updatedTrips);
                        navigation.goBack();
                    },
                },
            ],
            { cancelable: false }
        );
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
                <TouchableOpacity onPress={handleEditTrip}>
                    <MaterialIcons name="edit" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDeleteTrip}>
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

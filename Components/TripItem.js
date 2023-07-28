import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, TextInput, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TripItem = ({ trip, onEdit, onDelete }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [editedTripName, setEditedTripName] = useState(trip.name);
  const [editedTripImage, setEditedTripImage] = useState(trip.image);
  const [editedTripNotes, setEditedTripNotes] = useState(trip.notes);

  const handleEditTrip = () => {
    onEdit({
      ...trip,
      name: editedTripName,
      image: editedTripImage,
      notes: editedTripNotes,
    });
    setShowEditForm(false);
  };

  const handleDeleteTrip = () => {
    onDelete(trip);
  };

  return (
    <View style={styles.tripItem}>
      <Text style={styles.tripName}>{trip.name}</Text>
      <Text style={styles.tripNotes}>{trip.notes}</Text>
      <ImageBackground source={{ uri: trip.image }} style={styles.tripImage}>
        <Text style={styles.tripOverlayText}>{trip.name}</Text>
      </ImageBackground>

      {!showEditForm ? (
        <>
          <TouchableOpacity style={styles.editButton} onPress={() => setShowEditForm(true)}>
            <MaterialIcons name="edit" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteTrip}>
            <MaterialIcons name="delete" size={24} color="white" />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Image
            source={{ uri: editedTripImage }}
            style={styles.selectedImage}
          />
          <TextInput
            style={styles.input}
            placeholder="Trip Name"
            value={editedTripName}
            onChangeText={text => setEditedTripName(text)}
          />
          <TextInput
            style={[styles.input, styles.notesInput]}
            multiline
            placeholder="Trip Notes"
            value={editedTripNotes}
            onChangeText={text => setEditedTripNotes(text)}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleEditTrip}>
            <Text style={styles.addButtonLabel}>Update Trip</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // Put your existing styles here
});

export default TripItem;

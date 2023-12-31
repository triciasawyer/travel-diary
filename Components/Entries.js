import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const Entries = () => {
    const [entries, setEntries] = useState([]);
    const [entryName, setEntryName] = useState('');
    const [entryText, setEntryText] = useState('');

    const addEntry = () => {
        if (entryName && entryText) {
            const newEntry = {
                id: Date.now().toString(),
                name: entryName,
                text: entryText,
            };
            setEntries([...entries, newEntry]);
            setEntryName('');
            setEntryText('');
        }
    };

    return (
        <View style={styles.container}>
            {/* List of entries */}
            {entries.map((entry) => (
                <TouchableOpacity
                    key={entry.id}
                    style={styles.entryItem}
                    onPress={() => {
                    }}
                >
                    <Text style={styles.entryName}>{entry.name}</Text>
                    <Text style={styles.entryText}>{entry.text}</Text>
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => deleteEntry(entry.id)}
                    >
                        <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            ))}

            <View style={styles.newEntryForm}>
                <TextInput
                    style={styles.input}
                    placeholder="Entry Name"
                    value={entryName}
                    onChangeText={(text) => setEntryName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Entry Text"
                    value={entryText}
                    onChangeText={(text) => setEntryText(text)}
                />
                <TouchableOpacity style={styles.addButton} onPress={addEntry}>
                    <Text style={styles.addButtonLabel}>Add Entry</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    entryItem: {
        width: '100%',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    entryName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    entryText: {
        fontSize: 16,
        color: '#333',
    },
    deleteButton: {
        marginTop: 5,
        backgroundColor: 'red',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: 'white',
    },
    newEntryForm: {
        width: '100%',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    addButtonLabel: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Entries;

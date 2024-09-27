import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { CropContext } from './CropContext';  

const CropDetailsScreen = ({ navigation }) => {
  const { selectedCrop } = useContext(CropContext);  

  if (!selectedCrop) {
    return (
      <View style={styles.container}>
        <Text style={styles.noCropText}>No crop selected!</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: selectedCrop.image }} style={styles.cropImage} />
      <Text style={styles.cropName}>{selectedCrop.name}</Text>
      <Text style={styles.cropDescription}>{selectedCrop.description}</Text>
      <Text style={styles.cropPrice}>₹{selectedCrop.price}/kg</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {/* Contact Farmer Functionality */}}>
          <Text style={styles.buttonText}>Contact Farmer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {/* Negotiate Functionality */}}>
          <Text style={styles.buttonText}>Negotiate</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Products</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  cropImage: {
    width: '100%', // Make the image responsive
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  cropName: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  cropDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  cropPrice: {
    fontSize: 20,
    color: '#4CAF50',
    marginBottom: 30, // More space above the buttons
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#4CAF50', // Button color
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#ddd', // Color for the back button
    paddingVertical: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noCropText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
});

export default CropDetailsScreen;

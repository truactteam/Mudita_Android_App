/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';


const AddAssociate = () => {
  const [Loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [warehouseName, setWarehouseName] = useState('');
  const [warehouseCity, setWarehouseCity] = useState('');
//   const [warehouseState, setWarehouseState] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [mobNumber, setMobNumber] = useState('');

  const navigation = useNavigation();

  const handleImagePick = async() => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxWidth: 200,
        maxHeight: 200,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.assets && response.assets.length > 0) {
          setImageUri(response.assets[0].uri);
        }
      }
    );
  };

  const handleSubmit = async() => {
    setLoading(true);
    if (pass && mobNumber && name && warehouseName && warehouseCity) {
        if(mobNumber.split('').length !== 10){
            setLoading(false);
            // eslint-disable-next-line no-alert
            alert('Please check the number again');
        }
        else{
            try {
                const token = await AsyncStorage.getItem('jwtToken');
                const response = await axios.post(
                  'https://testing-mudita-850892791.development.catalystserverless.com/server/testing_mudita_function/user/create-user',
                  {
                    Mobile: mobNumber,
                    Password: pass,
                    Name: name,
                    WarehouseCity: warehouseCity,
                    WarehouseName: warehouseName,
                    // token: token,
                  },
                  {
                    headers:{
                        Validation: `Bearer ${token}`,
                    },
                  }
                );
                // console.warn(response);
                if(response.status === 200){
                    navigation.replace('AdminHome');
                }
                setLoading(false);
              } catch (err) {
                // console.warn(err);
                setLoading(false);
              }
        }
    } else {
      setLoading(false);
      // eslint-disable-next-line no-alert
      alert('Please fill all fields.');
    }
  };

  if(Loading){
    return (
        <View style={styles.container}>
          <Spinner
            visible={Loading}
            textContent={'Loading...'}
            textStyle={styles.spinnerText}
          />
        </View>
      );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
      <TouchableOpacity onPress={handleImagePick} style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.addPhotoText}>Add Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Mobile</Text>
      <View style={{paddingLeft: 15}}>
        <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={mobNumber}
            onChangeText={setMobNumber}
            keyboardType="numeric"
        />
      </View>

      <Text style={styles.label}>Password</Text>
      <View style={{paddingLeft: 15}}>
        <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={pass}
            onChangeText={setPass}
            secureTextEntry
        />
      </View>

      <Text style={styles.label}>Name</Text>
      <View style={{paddingLeft: 15}}>
        <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={name}
            onChangeText={setName}
        />
      </View>

      <Text style={styles.label}>Warehouse Name</Text>
      <View style={{paddingLeft: 15}}>
        <TextInput
            style={styles.input}
            placeholder="Enter warehouse name"
            value={warehouseName}
            onChangeText={setWarehouseName}
        />
      </View>

      <Text style={styles.label}>Warehouse City</Text>
      <View style={{paddingLeft: 15}}>
        <TextInput
            style={styles.input}
            placeholder="Enter warehouse city"
            value={warehouseCity}
            onChangeText={setWarehouseCity}
        />
      </View>

      <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignSelf: 'center',
    marginBottom: 24,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  placeholderImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoText: {
    color: '#888',
    fontSize: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    paddingLeft: 15,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 8,
    borderRadius: 10,
    width: '95%',
  },
  button: {
    backgroundColor: '#0045b5',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    width: 80,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: 10, // Ensure some padding at the bottom
  },
});

export default AddAssociate;

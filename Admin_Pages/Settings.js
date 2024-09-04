/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default function SettingsPage() {
  const [name, setName] = useState('');
  const [warehouseCity, setWarehouseCity] = useState('');
  const [warehouseName, setWarehouseName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ImageFound, setImageFound] = useState();

  let navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.setItem('jwtToken', '');
    await AsyncStorage.setItem('userRole', '');
    await AsyncStorage.setItem('Name', '');
    await AsyncStorage.setItem('City', '');
    await AsyncStorage.setItem('WarehouseName', '');
    await AsyncStorage.setItem('Profile', '');

    navigation.replace('Login');
  };

  useFocusEffect(useCallback(()=>{
    const getDetails = async()=>{
      let nameReq = await AsyncStorage.getItem('Name');
      setName(nameReq);
      let CityReq = await AsyncStorage.getItem('City');
      setWarehouseCity(CityReq);
      let WarehouseNameReq = await AsyncStorage.getItem('WarehouseName');
      setWarehouseName(WarehouseNameReq);
    };
    getDetails();

    async function fetchImage() {
      try {
        const Profile_Fold = '20044000000025795';
        let reqProfileImg = await AsyncStorage.getItem('Profile');
        let ReqToken = await AsyncStorage.getItem('jwtToken');
        const response = await axios.post(
          'https://testing-mudita-850892791.development.catalystserverless.com/server/testing_mudita_function/user/showProfileIMG',
          {
            'FOLDER_ID': Profile_Fold,
            'FILE_ID': reqProfileImg, // Use the actual profile image ID
          },
          {
            headers: {
              Validation: `Bearer ${ReqToken}`,
            },
            responseType: 'blob',
          }
        );

        // Convert the blob data to a format that can be used in Image component
        const blob = response.data;
        const reader = new FileReader();
        reader.onload = () => {
          setImageFound(reader.result); // This will be a base64-encoded string
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        // console.error(error);
        Alert.alert('Something went wrong while fetching Image');
      }
    }
    fetchImage();

  },[]));


  const handleSaveChanges = async () => {
    if (!name || !warehouseCity || !warehouseName) {
      return Alert.alert('Please fill all the details');
    }
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('jwtToken');

      const formData = new FormData();
      formData.append('Name', name);
      formData.append('wareHouseCity', warehouseCity);
      formData.append('wareHouseName', warehouseName);

      if (profileImage) {
        formData.append('data', {
          uri: profileImage,
          type: 'image/jpeg',
          name: 'profile.jpg',
        });
      }

      const response = await axios.post(
        'https://testing-mudita-850892791.development.catalystserverless.com/server/testing_mudita_function/user/editProfile',
        formData,
        {
          headers: {
            Validation: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      await AsyncStorage.setItem('Name', name);
      await AsyncStorage.setItem('City', warehouseCity);
      await AsyncStorage.setItem('WarehouseName', warehouseName);
      setLoading(false);
      console.log(response.data);
      Alert.alert('Profile updated successfully');
    } catch (error) {
      setLoading(false);
      console.error(error);
      Alert.alert('Error updating profile');
    }
  };

  const handleImageSelection = () => {
    Alert.alert(
      'Upload Photo',
      'Choose an option',
      [
        {
          text: 'Take Photo',
          onPress: () => launchCamera({}, handleImageResponse),
        },
        {
          text: 'Choose from Library',
          onPress: () => launchImageLibrary({}, handleImageResponse),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const handleImageResponse = (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage || response.errorCode);
    } else if (response.assets && response.assets.length > 0) {
      setImageFound(response.assets[0].uri);
      setProfileImage(response.assets[0].uri); // Set the selected image URI
    } else {
      console.log('No assets found in the response');
    }
  };


  if (loading) {
    return (
      <View style={styles.container}>
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerText}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <TouchableOpacity style={styles.profileImageContainer} onPress={handleImageSelection}>
        {/* <Image
          source={profileImage ? { uri: profileImage } : require('../Assets/Profile_icon.jpg')}
          style={styles.profileImage}
        /> */}
        <Image
              source={ ImageFound ? {uri: ImageFound} : require('../Assets/Profile_icon.jpg') }
              style={styles.profileImage}
        />
        {/* Icon for edit (optional) */}
        {/* <Image
          source={require('../Assets/camera_icon.png')}
          style={styles.cameraIcon}
        /> */}
        <View style={styles.cameraIcon}>
          <MaterialCommunityIcons name="home" color="orange" size={28} />
        </View>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Warehouse Name"
        value={warehouseName}
        onChangeText={setWarehouseName}
      />

      <TextInput
        style={styles.input}
        placeholder="Warehouse City"
        value={warehouseCity}
        onChangeText={setWarehouseCity}
      />

      <View style={styles.container2}>
        <TouchableOpacity onPress={handleSaveChanges} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save changes</Text>
        </TouchableOpacity>
        <View style={styles.saveButton}>
          <TouchableOpacity style={styles.button2} onPress={handleLogout}>
              <Text style={styles.saveButtonText}>Log-Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  container2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: '#242760',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

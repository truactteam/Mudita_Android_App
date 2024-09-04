/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useCallback } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image, BackHandler, Alert } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import DatePicker from 'react-native-date-picker';
import { launchCamera } from 'react-native-image-picker';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function UploadPOD({ navigation }) {
  const [scannedData, setScannedData] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [showQRCodeScanner, setShowQRCodeScanner] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (showQRCodeScanner) {
          setShowQRCodeScanner(false);
          return true;
        }
        return false;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [showQRCodeScanner])
  );

  const onSuccess = (e) => {
    setScannedData(e.data);
    setShowQRCodeScanner(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    toggleDatePicker();
  };

  const toggleDatePicker = () => {
    setIsDatePickerVisible(!isDatePickerVisible);
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}/${year}`;
  };

  const takePhoto = () => {
    setUploadSuccess(false);
    launchCamera({}, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage || response.errorCode);
      } else if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      } else {
        console.log('No assets found in the response');
      }
    });
  };

  const handleSubmit = async () => {
    if (!scannedData || !selectedDate || !imageUri) {
      return Alert.alert('Please fill all the details');
    }

    const docketID = new FormData();
    docketID.append('docketID', scannedData);
    docketID.append('submissionDate', formatDate(selectedDate));

    if (imageUri) {
      docketID.append('data', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'document.jpg',
      });
    }

    try {
      setIsUploading(true);
      const token = await AsyncStorage.getItem('jwtToken');
      await axios.post(
        'https://testing-mudita-850892791.development.catalystserverless.com/server/testing_mudita_function/user/uploadPOD',
        docketID,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Validation': `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            setUploadProgress(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
          },
        }
      );
      setIsUploading(false);
      setUploadProgress(0);
      setUploadSuccess(true);

      // Reset form fields
      setScannedData('');
      setSelectedDate(new Date());
      setImageUri('');

    } catch (err) {
      setIsUploading(false);
      setUploadProgress(0);
      console.warn(err);
    }
  };

  return (
    <View style={styles.container}>
      {showQRCodeScanner ? (
        <QRCodeScanner
          onRead={onSuccess}
          flashMode={RNCamera.Constants.FlashMode.off}
          topContent={
            <Text style={styles.centerText}>
              Scan the barcode to fill the fields
            </Text>
          }
        />
      ) : (
        <View style={styles.imageContainer}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          ) : (
            <Text>No image selected</Text>
          )}
        </View>
      )}

      {showQRCodeScanner ? null : (
        <View style={styles.formContainer}>
          <View style={styles.QrScan}>
            <TextInput
                style={styles.input}
                value={scannedData}
                onChange={(e)=>setScannedData(e)}
                placeholder="Scan QR code here"
                keyboardType="numeric"
            />
            <TouchableOpacity onPress={() =>{
              setUploadSuccess(false);
              setShowQRCodeScanner(true);
              }}
              style={styles.camera}
            >
              <MaterialCommunityIcons name={'camera'} color={'black'} size={28} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={toggleDatePicker} style={{ width: '100%' }}>
            <TextInput
              style={styles.input2}
              value={formatDate(selectedDate)}
              placeholder="Select Date"
              editable={false}
            />
          </TouchableOpacity>

          {isDatePickerVisible && (
            <DatePicker
              date={selectedDate}
              onDateChange={handleDateChange}
              mode="date"
              onClose={toggleDatePicker}
            />
          )}

          <View style={styles.newView}>
            <TouchableOpacity onPress={takePhoto} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Upload image</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>

          {/* Progress bar */}
          {isUploading && (
            <View style={styles.progressContainer}>
              <Progress.Bar progress={uploadProgress / 100} width={null} />
            </View>
          )}

          {/* Success screen */}
          {uploadSuccess && (
            <View style={styles.successContainer}>
              <Image
                source={require('../Assets/Success.png')} // Update this with the correct path to your success image
                style={styles.successImage}
              />
              <Text style={styles.successText}>POD Uploaded</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  newView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  centerText: {
    fontSize: 18,
    padding: 32,
    paddingTop: 5,
    color: '#777',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  input2: {
    height: 50,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: '#242760',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  imagePreview: {
    width: '80%',
    height: '100%',
    resizeMode: 'cover',
    marginBottom: 20,
    marginTop: 20,
  },
  formContainer: {
    flex: 1,
    width: '100%',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successImage: {
    width: 100,
    height: 100,
    marginBottom: 16,
    borderRadius: 50,
    marginTop: 16,
  },
  successText: {
    fontSize: 24,
    color: 'green',
  },
  progressContainer: {
    marginTop: 20,
    width: '100%',
  },
  QrScan: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  camera: {
    position: 'absolute',
    display: 'flex',
    marginLeft: '90%',
    height: '100%',
    alignItems: 'flex-end',
    paddingTop: 30,
    paddingRight: 10,
  },
});

/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { View, Text, Alert, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';

const EditPOD = ({ route, navigation }) => {
    const { img, imgData } = route.params;
    const[docket, setDocket] = useState('');

    const[actual, setActual] = useState(new Date());
    const[delivered, setDelivered] = useState('');
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

    useEffect(()=>{
      if(imgData.PODs.ActualDeliveryDate){
        const dateString = imgData.PODs.ActualDeliveryDate;
        const [day, month, year] = dateString.split('/');
        const initialDate = new Date(`${year}-${month}-${day}T00:00:00`);
        setActual(initialDate);
      }
      setDocket(imgData.PODs.DocketID);
      setDelivered(imgData.PODs.SubmissionDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const handleSaveChanges = async()=> {
      try{
        const token = await AsyncStorage.getItem('jwtToken');
        await axios.post(
          'https://testing-mudita-850892791.development.catalystserverless.com/server/testing_mudita_function/user/edit-pod',
          {
            dockID: docket,
            ActDate: formatDate(actual),
            ROWID: imgData.PODs.ROWID,
          },
          {
            headers: {
              'Validation': `Bearer ${token}`,
            },
          }
        );
        navigation.navigate('Reports');
      }catch(err){
        console.log(err);
      }
    };

    const handleDateChange = (date) => {
      setActual(date);
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

  return (
    <ScrollView>
      <Image source={{uri: img}} style={styles.image}/>

      <TextInput
        style={styles.input}
        placeholder="Docket no."
        value={docket}
        onChangeText={setDocket}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Delivery Date"
        value={delivered}
        onChangeText={setDelivered}
        editable={false}
      />

      <TouchableOpacity onPress={toggleDatePicker} style={{ width: '100%' }}>
        <TextInput
          style={styles.input}
          value={formatDate(actual)}
          placeholder="Select Date"
          editable={false}
        />
      </TouchableOpacity>

      <View style={styles.DatePick}>
          {isDatePickerVisible && (
            <DatePicker
              date={actual}
              onDateChange={handleDateChange}
              mode="date"
              onClose={toggleDatePicker}
            />
          )}
      </View>

      <View style={styles.container2}>
        <TouchableOpacity onPress={handleSaveChanges} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 500,
    resizeMode: 'contain',
    marginTop: 25,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  container2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 20,
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
  DatePick: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditPOD;

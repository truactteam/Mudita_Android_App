/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {

    let navigation = useNavigation();

    const handleLogout = async () => {
        await AsyncStorage.setItem('jwtToken', '');
        await AsyncStorage.setItem('userRole', '');

        navigation.replace('Login');
    };

  return (
    <View style={{width: 100, paddingTop: 30,}}>
        <TouchableOpacity style={styles.button2} onPress={handleLogout}>
            <Text style={styles.buttonText}>Log-Out</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
   button2: {
    backgroundColor: '#242760',
    marginLeft: 16,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Settings;

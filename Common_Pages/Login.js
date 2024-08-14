/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import img from '../Assets/Text-icon.png';
import img2 from '../Assets/Vehicle-icon.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';


const Login = () => {
    const [userMob, setUserMob] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    let navigation = useNavigation();

    const handleLogin = async () => {
        setLoading(true);
      try {
        const response = await axios.post(
          'https://testing-mudita-850892791.development.catalystserverless.com/server/testing_mudita_function/user/login',
          {
            Mobile: userMob,
            password: password,
          },
        );

        const {token, user} = response.data;
        // console.warn(response.data);
        let role = user[0].Users.Role;
        // Store the token and role in AsyncStorage
        await AsyncStorage.setItem('jwtToken', token);
        await AsyncStorage.setItem('userRole', role);
        await AsyncStorage.setItem('Name', user[0].Users.Name);

        // Navigate based on the user role
        if (role === 'Admin') {
          navigation.replace('AdminHome');
        } else if (role === 'user') {
          navigation.replace('UserHome');
        } else {
          setError('Unknown role');
        }
        setLoading(false);
      } catch (err) {
        setError('Invalid credentials');
        console.warn(err);
        setLoading(false);
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
            <View style={styles.middleSection}>
                <Image
                    source={img} // Replace with your image URL or local image reference
                    style={styles.image}
                    resizeMode="contain"
                />
                <TextInput
                    placeholder="Mobile Number"
                    value={userMob}
                    onChangeText={setUserMob}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                />
                {/* {error ? <Text style={styles.error}>{error}</Text> : null} */}
                <View style={styles.buttonContainer}>
                    {/* <Button title="Login" /> */}
                    {error ? <Text style={styles.error}>{error}</Text> : null}
                    <Button title="Login" onPress={handleLogin} />
                </View>
                <Image
                    source={img2} // Replace with your image URL or local image reference
                    style={styles.imageBelow}
                    resizeMode="contain"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7d1c7',
    },
    middleSection: {
        flex: 3, // Adjust this value to control the height of the middle section
        alignItems: 'center',
        // justifyContent: 'center',
    },
    image: {
        marginTop: 100,
        marginBottom: 50,
        width: 350,
        height: 100,
        backgroundColor: '#b9a79f',
        opacity: 0.8,
    },
    input: {
        width: '70%',
        borderBottomWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        fontSize: 20,
    },
    imageBelow: {
        width: 220,
        height: 220,
        marginTop: 40,
        borderRadius: 110,
        padding: 20,
        borderWidth: 4,
        borderColor: '#ff6600',
        overflow: 'hidden',
    },
    buttonContainer: {
        width: '20%',
        borderRadius: 8,
        overflow: 'hidden', // Ensures that button corners are rounded
    },
});

export default Login;

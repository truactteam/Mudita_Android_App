/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import img from '../Assets/Text-icon.png';
import img2 from '../Assets/Vehicle-icon.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';



const ForgetPassword = () => {
    const [userMob, setUserMob] = useState('');
    const [otp, setOTP] = useState('');
    const [password, setPassword] = useState('');
    const [hide,setHide] = useState(true);
    // const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    // const [mobValue, setMobValue] = useState(false);
    // const [passValue, setPassValue] = useState(false);

    let navigation = useNavigation();

    const handleOTP = async()=>{
        setHide(false);
        try{
            await axios.post(
                'https://testing-mudita-850892791.development.catalystserverless.com/server/testing_mudita_function/user/send-otp',
                {
                  phoneNumber: userMob,
                }
              );
        }catch{
            alert('Something went wrong Please try after sometime');
        }
    };

    const handleSubmit = async()=> {
        if(!userMob || !otp){
            return alert('Please Enter all details');
        }
        if(userMob.split('').length !== 10){
            return alert('Please enter the 10 digit number');
        }
        setLoading(true);
        const token = await AsyncStorage.getItem('jwtToken');
        try {
                await axios.post(
                'https://testing-mudita-850892791.development.catalystserverless.com/server/testing_mudita_function/user/change-password',
                {
                    phoneNumber: userMob,
                    otp: otp,
                    newPassword: password,
                },
                {
                    headers: {
                    Validation: `Bearer ${token}`,
                    },
                }
                );
                navigation.replace('Login');
            }catch (error) {
                alert('Something went wrong Please try after sometime');
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
                    keyboardType="numeric"
                />
                {!hide ? (
                    <TextInput
                        placeholder="New Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input2}
                    />
                ) : null
                }
                {/* <Text style={{color: "red", textAlign: 'left'}}>Please fill the Mobile Number</Text> */}
                <TextInput
                    placeholder="OTP"
                    value={otp}
                    onChangeText={setOTP}
                    style={styles.input2}
                    keyboardType="numeric"
                />
                {/* {error ? <Text style={styles.error}>{error}</Text> : null} */}
                <View style={styles.buttonContainer}>
                    {/* <Button title="Login" /> */}
                    {/* {error ? <Text style={styles.error}>{error}</Text> : null} */}
                    <Button title="Send OTP" onPress={handleOTP} />
                    <Button title="Submit" onPress={handleSubmit} />
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
    input2: {
        width: '70%',
        borderBottomWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        marginBottom: 8,
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
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        width: '60%',
        borderRadius: 8,
        overflow: 'hidden',
    },
    touchContainer:{
      width: '68%',
      marginBottom: 20,
    },
    touch:{
      color: 'blue',
    },
});

export default ForgetPassword;

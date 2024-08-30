/* eslint-disable prettier/prettier */
/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import img from '../Assets/Text-icon.png';
import img2 from '../Assets/Vehicle-icon.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Login = () => {
    const [userMob, setUserMob] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [mobValue, setMobValue] = useState(false);
    const [passValue, setPassValue] = useState(false);
    const [checkFlag, setCheckFlag] = useState(true);

    let navigation = useNavigation();

    const handleLogin = async () => {
      {!userMob ? setMobValue(true) : setMobValue(false);}
      {!password ? setPassValue(true) : setPassValue(false);}
      if(!userMob || !password){
        return ('Please fill all the details');
      }
      setLoading(true);
      try {
        const response = await axios.post(
          'https://testing-mudita-850892791.development.catalystserverless.com/server/testing_mudita_function/user/login',
          {
            Mobile: userMob,
            password: password,
          },
        );
        console.log(response);
        const {token, user} = response.data;
        // console.warn(response.data);
        let role = user[0].Users.Role;
        // Store the token and role in AsyncStorage
        await AsyncStorage.setItem('jwtToken', token);
        await AsyncStorage.setItem('userRole', role);
        await AsyncStorage.setItem('Name', user[0].Users.Name);
        await AsyncStorage.setItem('City', user[0].Users.WarehouseCity);
        await AsyncStorage.setItem('WarehouseName', user[0].Users.WarehouseName);
        if(user[0].Users.Profile_pic){
          await AsyncStorage.setItem('Profile', user[0].Users.Profile_pic);
        }

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

    const handleForgetPass = ()=>{
      navigation.navigate('ForgetPass');
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
                <View style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'relative'}}>
                  <TextInput
                      placeholder="Mobile Number"
                      value={userMob}
                      onChangeText={setUserMob}
                      style={styles.input}
                      keyboardType="numeric"
                  />
                  <View style={{position: 'absolute', display:'flex', justifyContent:'flex-end', flexDirection: 'row', width: '65%'}}>
                    <MaterialCommunityIcons name={'account'} color={'black'} size={28} />
                  </View>
                </View>
                { mobValue ? (
                  <Text style={styles.warning}>Please fill the Mobile Number</Text>
                ) : null
                }
                {/* <Text style={{color: "red", textAlign: 'left'}}>Please fill the Mobile Number</Text> */}
                <View style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'relative'}}>
                  <TextInput
                      placeholder="Password"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={checkFlag ? true : false}
                      style={styles.input2}
                  />
                  <View style={{position: 'absolute', display:'flex', justifyContent:'flex-end', flexDirection: 'row', width: '65%'}}>
                    <TouchableOpacity onPress={()=> setCheckFlag(!checkFlag)}>
                      {checkFlag ?
                        (<MaterialCommunityIcons name={'eye-off'} color={'black'} size={28} />)
                        :
                        (<MaterialCommunityIcons name={'eye'} color={'black'} size={28} />)
                      }
                    </TouchableOpacity>
                  </View>
                </View>
                { passValue ? (
                  <Text style={styles.warning}>Please fill Password</Text>
                ) : null
                }
                <View style={styles.touchContainer}>
                  <TouchableOpacity onPress={handleForgetPass}>
                    <Text style={styles.touch}>Forget Password</Text>
                  </TouchableOpacity>
                </View>
                {/* {error ? <Text style={styles.error}>{error}</Text> : null} */}
                <View style={{width: '70%', marginLeft: 10}}>
                  {error ? <Text style={styles.error}>{error}</Text> : null}
                </View>
                <View style={styles.buttonContainer}>
                    {/* <Button title="Login" /> */}
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
        marginBottom: 8,
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
        width: '20%',
        borderRadius: 8,
        overflow: 'hidden',
    },
    touchContainer:{
      width: '68%',
      marginBottom: 10,
    },
    touch:{
      color: 'blue',
    },
    error:{
      color: 'red',
      fontSize: 16,
      marginBottom: 15,
    },
    warning: {
      color: 'red',
      width: '68%',
    },
});

export default Login;

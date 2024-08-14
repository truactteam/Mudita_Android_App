import React, {useEffect, useState} from 'react';
// import {StyleSheet} from 'react-native';
// import img from './Assets/Text-icon.png';
// import img2 from './Assets/Vehicle-icon.png';
import Login from './Common_Pages/Login';
// import {SafeAreaView} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home_admin from './Admin_Pages/Home_admin';
import Home_user from './User_Pages/Home_user';
import Spinner from 'react-native-loading-spinner-overlay';
import {StyleSheet, View} from 'react-native';
import Associate_page from './Admin_Pages/Associate_page';

const Stack = createNativeStackNavigator();
enableScreens();
function App() {
  const [initialRoute, setInitialRoute] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        const role = await AsyncStorage.getItem('userRole');
        if (token && role) {
          if (role === 'Admin') {
            setInitialRoute('AdminHome');
          } else if (role === 'user') {
            setInitialRoute('UserHome');
          }
        } else {
          setInitialRoute('Login');
        }
      } catch (error) {
        console.error('Error checking user role:', error);
        setInitialRoute('Login');
      } finally {
        setLoading(false);
      }
    };

    checkUserRole();
  }, []);

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
    // <SafeAreaView style={styles.container}>
    //   <Login />
    // </SafeAreaView>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="AdminHome" component={Home_admin} />
        <Stack.Screen name="UserHome" component={Home_user} />
        <Stack.Screen name="Associate_page" component={Associate_page} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Adjust this color as needed
  },
  spinnerText: {
    color: '#000', // Adjust text color as needed
  },
});

export default App;

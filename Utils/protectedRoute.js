/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const ProtectedRoute = ({component: Component, requiredRole, ...rest}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        const role = await AsyncStorage.getItem('userRole');
        if (token && (!requiredRole || role === requiredRole)) {
          setHasAccess(true);
        } else {
          if (!token) {
            navigation.replace('Login');
          } else {
            navigation.replace('Login'); // Or any unauthorized screen
          }
        }
      } catch (error) {
        console.error('Error checking access:', error);
        navigation.replace('Login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAccess();
  }, [navigation, requiredRole]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return hasAccess ? <Component {...rest} /> : null;
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ProtectedRoute;

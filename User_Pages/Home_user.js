/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import profileImg from '../Assets/Profile_icon.jpg';
import POD_1 from '../Assets/POD_1.png';
import POD_2 from '../Assets/POD_2.png';
import POD_3 from '../Assets/POD_3.png';
import POD_4 from '../Assets/POD_4.png';
import POD_5 from '../Assets/POD_5.png';
import POD_6 from '../Assets/POD_6.png';
import backImg from '../Assets/Text-icon.png';
import MyTabs from './Bottom_bar2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Home_user = () => {

    let navigation = useNavigation();
    const[name, setName] = useState('');

    const handleLogout = async()=>{
        await AsyncStorage.setItem('jwtToken', '');
        await AsyncStorage.setItem('userRole', '');
        navigation.replace('Login');
    };

    useEffect(()=>{
        let reqName = AsyncStorage.getItem('Name');
        setName(reqName);
    },[]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
            source={backImg}
            style={{ width: '100%', height: '100%' }}
        />
      </View>
      <View style={styles.profile}>
        <View style={styles.profileImage}>
          <Image
            source={profileImg}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
        <Text style={styles.profileName}>Mudita</Text>
        <Text style={styles.profileText}>{name}</Text>
        <Text style={styles.profileText}>Gurgaon, Delhi</Text>
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>122</Text>
            <Text style={styles.statLabel}>Month</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>67</Text>
            <Text style={styles.statLabel}>Week</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>10</Text>
            <Text style={styles.statLabel}>Day</Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Associates</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Log-Out</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.podContainer}>
        <View style={{ borderBottomWidth: 1, borderColor: '#242760' }}>
            <Text style={styles.podTitle}>Recently Uploaded POD</Text>
        </View>
        <View style={styles.podItems}>
          <Image
            source={POD_1} // Replace with your image
            style={styles.podItem}
          />
          <Image
            source={POD_2} // Replace with your image
            style={styles.podItem}
          />
          <Image
            source={POD_3} // Replace with your image
            style={styles.podItem}
          />
        </View>
        <View style={styles.podItems}>
          <Image
            source={POD_4} // Replace with your image
            style={styles.podItem}
          />
          <Image
            source={POD_5} // Replace with your image
            style={styles.podItem}
          />
          <Image
            source={POD_6} // Replace with your image
            style={styles.podItem}
          />
        </View>
      </View>
      <MyTabs color="#242760" size="24"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
    height: 120,
    width:'100%',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6600',
  },
  profile: {
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 10,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  profileText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 60,
    marginBottom: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
  },
  button: {
    backgroundColor: '#242760',
    padding: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  podContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 8,
  },
  podTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#242760',
    textAlign: 'center',
  },
  podItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  podItem: {
    width: '30%',
    height: 100,
  },
});

export default Home_user;

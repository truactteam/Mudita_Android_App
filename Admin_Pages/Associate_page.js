/* eslint-disable prettier/prettier */
import React, { useCallback, useState } from 'react';
import {FlatList, View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

const AssociateItem = ({name, location, status, statusColor, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
    <Image source={{uri: 'https://via.placeholder.com/50'}} style={styles.avatar} />
    <View style={styles.textContainer}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.location}>{location}</Text>
      <Text style={[styles.status, {color: statusColor}]}>{status}</Text>
    </View>
  </TouchableOpacity>
);

export default function Associate_page() {
  const [associates, setAssociate] = useState([]);
  const [loading, setLoading] = useState(false);

  // const associates2 = [];
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      const fetchData = async () => {
        try {
          const token = await AsyncStorage.getItem('jwtToken');
          const response = await axios.get(
            'https://testing-mudita-850892791.development.catalystserverless.com/server/testing_mudita_function/user/all-users',
            {
              headers: {
                Validation: `Bearer ${token}`,
              },
            }
          );
          const usersData = response.data.users.map(obj => obj.Users);
          setAssociate(usersData);
        } catch (err) {
          // eslint-disable-next-line no-alert
          alert('Something went wrong');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
      // Optional: Cleanup function if needed
      return () => {
        setAssociate([]); // Clear associates if needed on unmount
      };
    }, [])
  );
  let navigation = useNavigation();
  const handleNavigate = ()=>{
    navigation.navigate('AddUser');
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
      <View style={styles.header}>
        <Text style={styles.title}>Associates</Text>
        {/* <TouchableOpacity style={styles.filterButton}>
          <MaterialCommunityIcons name="plus-circle" size={20} color="black" />
        </TouchableOpacity> */}
      </View>
      {associates ? (
        <FlatList
          data={associates}
          keyExtractor={(item) => item.ROWID}
          renderItem={({item}) => (
            (item.Role === 'user') ? (
              <AssociateItem
                name={item.Name}
                location={item.WarehouseCity}
                status={item.Status}
                statusColor={item.Status === 'Active' ? 'green' : 'red'}
                onPress={() => navigation.navigate('AssociateDetails', { associate: item })}
              />
            ) : null
          )}
      />
      ) : (<Text>No records found</Text>)}
      <TouchableOpacity style={styles.addButton} onPress={handleNavigate}>
        <MaterialCommunityIcons name="plus-circle" size={50} color="#f85a3e" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  filterButton: {
    padding: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 14,
    color: '#888',
  },
  status: {
    fontSize: 14,
    marginTop: 5,
  },
  moreButton: {
    padding: 5,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    padding: 0,
    elevation: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // tabContainer: {
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  // },
});

/* eslint-disable prettier/prettier */
import React from 'react';
import {FlatList, View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const associates = [
  {
    id: '1',
    name: 'ABC...',
    location: 'Jaipur, Rajasthan',
    status: 'Not Active',
    statusColor: 'red',
  },
  {
    id: '2',
    name: 'ABC...',
    location: 'Noida, Maharashtra',
    status: 'Active',
    statusColor: 'green',
  },
  {
    id: '3',
    name: 'ABC...',
    location: 'Mumbai, Maharashtra',
    status: 'Active',
    statusColor: 'green',
  },
  {
    id: '4',
    name: 'ABC...',
    location: 'Pune, Maharashtra',
    status: 'Not Active',
    statusColor: 'red',
  },
  {
    id: '5',
    name: 'ABC...',
    location: 'Gurugram, Delhi',
    status: 'Active',
    statusColor: 'green',
  },
];

const AssociateItem = ({name, location, status, statusColor}) => (
  <View style={styles.itemContainer}>
    <Image source={{uri: 'https://via.placeholder.com/50'}} style={styles.avatar} />
    <View style={styles.textContainer}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.location}>{location}</Text>
      <Text style={[styles.status, {color: statusColor}]}>{status}</Text>
    </View>
    <TouchableOpacity style={styles.moreButton}>
      <MaterialCommunityIcons name="Add" size={24} color="black" />
    </TouchableOpacity>
  </View>
);

export default function Associate_page() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Associates</Text>
        <TouchableOpacity style={styles.filterButton}>
          <MaterialCommunityIcons name="plus-circle" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={associates}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <AssociateItem
            name={item.name}
            location={item.location}
            status={item.status}
            statusColor={item.statusColor}
          />
        )}
      />
      <TouchableOpacity style={styles.addButton}>
        <MaterialCommunityIcons name="Home" size={24} color="white" />
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
    bottom: 20,
    backgroundColor: '#f85a3e',
    borderRadius: 25,
    padding: 15,
    elevation: 5,
  },
});

/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import profileImg from '../Assets/Profile_icon.jpg';
import POD_1 from '../Assets/POD_1.png';
import POD_2 from '../Assets/POD_2.png';
import POD_3 from '../Assets/POD_3.png';
import POD_4 from '../Assets/POD_4.png';
import POD_5 from '../Assets/POD_5.png';
import POD_6 from '../Assets/POD_6.png';
import backImg from '../Assets/Text-icon.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Home_admin = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleReports = async () => {
    navigation.navigate('Reports');
  };

  const handleAssociate = () => {
    navigation.navigate('Associate_page');
  };

  const handleImagePress = (imageSource) => {
    setSelectedImage(imageSource);
    setModalVisible(true);
  };

  useEffect(() => {
    AsyncStorage.getItem('Name').then(reqName => setName(reqName));
  }, []);

  const images = [
    { source: POD_1, docket: '123456789' },
    { source: POD_2, docket: '987654321' },
    { source: POD_3, docket: '111213141' },
    { source: POD_4, docket: '121314151' },
    { source: POD_5, docket: '131415161' },
    { source: POD_6, docket: '141516171' },
    { source: POD_1, docket: '123456789' },
    { source: POD_2, docket: '987654321' },
    { source: POD_3, docket: '111213141' },
    { source: POD_4, docket: '121314151' },
    { source: POD_5, docket: '131415161' },
    { source: POD_6, docket: '141516171' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
          <Text style={styles.profileName}>Admin</Text>
          <Text style={styles.profileText}>{name}</Text>
          <Text style={styles.profileText}>Total POD</Text>
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
            <TouchableOpacity style={styles.button} onPress={handleAssociate}>
              <Text style={styles.buttonText}>Associates</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={handleReports}>
              <Text style={styles.buttonText}>Reports</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.podContainer}>
          <View style={{ borderBottomWidth: 1, borderColor: '#242760', marginBottom: 20}}>
            <Text style={styles.podTitle}>Recently Uploaded POD</Text>
          </View>

          <View style={styles.podItems}>
            {images.map((img, index) => (
              <TouchableOpacity key={index} onPress={() => handleImagePress(img.source)} style={styles.imageContainer}>
                <Image source={img.source} style={styles.podItem} />
                <View style={styles.textOverlay}>
                  <Text style={styles.docketText}>Docket number</Text>
                  <Text style={styles.docketText}>{img.docket}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Modal visible={modalVisible} transparent={true} animationType="fade">
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
            <Image source={selectedImage} style={styles.modalImage} resizeMode="contain" />
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 60,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
    height: 120,
    width: '100%',
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
    gap: 40,
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
  podContainer: {
    paddingLeft: 20,
    paddingRight: 20,
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
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '30%', // Adjusted to fit three items in a row
    marginBottom: 20,
    position: 'relative',
  },
  podItem: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  textOverlay: {
    position: 'absolute',
    top: 60,
    left: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
  },
  docketText: {
    color: '#fff',
    fontSize: 13,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '90%',
    height: '75%',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  modalCloseText: {
    color: '#242760',
    fontSize: 16,
  },
});

export default Home_admin;

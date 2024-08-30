/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';
import profileImg from '../Assets/Profile_icon.jpg';
import noImg from '../Assets/NoImage.jpg';
import backImg from '../Assets/Text-icon.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import GetPods from '../User_Pages/GetPods';

const Home_admin = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  // const [city, setCity] = useState('');
  const [token, setToken] = useState();
  const [ImageFound, setImageFound] = useState();
  const[images, setImages] = useState([]);

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

  useEffect(()=>{
    const fetchPOD = async()=> {
      try{
        // let ReqToken = await AsyncStorage.getItem('jwtToken');
        // console.log('before get');
        const response2 = await axios.get(
          'https://testing-mudita-850892791.development.catalystserverless.com/server/testing_mudita_function/user/all-pods',
          {
            headers: {
              Validation: `Bearer ${token}`,
            },
          }
        );
        // console.warn('Response',response2.data.pods);
        setImages(response2.data.pods);
      }catch(error){
        console.warn('Data not found');
        setImages([]);
      }
    };
    fetchPOD();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(() => {
    let mainFunction = async () => {
      const Profile_Fold = '20044000000025795';
      let reqName = await AsyncStorage.getItem('Name');
      // let reqCity = await AsyncStorage.getItem('City');
      let reqProfileImg = await AsyncStorage.getItem('Profile');
      let ReqToken = await AsyncStorage.getItem('jwtToken');
      setName(reqName);
      // setCity(reqCity);
      // setProfileImage(reqProfileImg);
      setToken(ReqToken);

      async function fetchImage() {
        try {
          const response = await axios.post(
            'https://testing-mudita-850892791.development.catalystserverless.com/server/testing_mudita_function/user/showProfileIMG',
            {
              'FOLDER_ID': Profile_Fold,
              'FILE_ID': reqProfileImg, // Use the actual profile image ID
            },
            {
              headers: {
                Validation: `Bearer ${ReqToken}`,
              },
              responseType: 'blob',
            }
          );

          // Convert the blob data to a format that can be used in Image component
          const blob = response.data;
          const reader = new FileReader();
          reader.onload = () => {
            setImageFound(reader.result); // This will be a base64-encoded string
          };
          reader.readAsDataURL(blob);
        } catch (error) {
          console.error(error);
          Alert.alert('Something went wrong while fetching Image');
        }
      }

      fetchImage();
    };

    mainFunction();
  }, []);

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
              source={ ImageFound ? {uri: ImageFound} : profileImg }
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
            {images.length ? images.map((img, index) => (
              <GetPods handleImagePress={handleImagePress} key={index} imgID={img.PODs.FileID} docketNum={img.PODs.DocketID} date={img.PODs.SubmissionDate} />
            )) : <View style={styles.noDataFound}><Text style={styles.noDataFoundText}>No POD Uploaded yet</Text></View>}
          </View>
        </View>

        <Modal visible={modalVisible} transparent={true} animationType="fade">
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
            <Image source={selectedImage ? {uri: selectedImage} : noImg} style={styles.modalImage} resizeMode="contain" />
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
    // justifyContent: 'space-evenly',
    gap: 10,
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
  noDataFound: {
    height: '70%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataFoundText: {
    fontSize: 18,
  },
});
export default Home_admin;

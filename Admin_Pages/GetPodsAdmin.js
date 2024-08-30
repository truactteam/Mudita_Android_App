/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import noImg from '../Assets/NoImage.jpg';
import { useNavigation } from '@react-navigation/native';

const GetPodsAdmin = ({ imgID, docketNum, date, imgData}) => {
    const [ImageFound, setImageFound] = useState();
    const navigation = useNavigation();
    console.log(imgID);

    const handleImagePress = (img) => {
      if(ImageFound){
        navigation.navigate('EditPOD', {img, imgData});
      }
    };


    useEffect(() => {
        let mainFunction = async () => {
          const Profile_Fold = '20044000000025814';
          let ReqToken = await AsyncStorage.getItem('jwtToken');
          async function fetchImage() {
            try {
              const response = await axios.post(
                'https://testing-mudita-850892791.development.catalystserverless.com/server/testing_mudita_function/user/showPodIMG',
                {
                  'FOLDER_ID': Profile_Fold,
                  'FILE_ID': `${imgID}`,
                },
                {
                  headers: {
                    Validation: `Bearer ${ReqToken}`,
                  },
                  responseType: 'blob',
                }
              );
              const blob = response.data;
              const reader = new FileReader();
              reader.onload = () => {
                setImageFound(reader.result);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);


  return (
    <TouchableOpacity onPress={() => handleImagePress(ImageFound ? ImageFound : null)} style={styles.imageContainer}>
        {/* <Image source={img.source} style={styles.podItem} /> */}
        <Image source={ ImageFound ? {uri: ImageFound} : noImg } style={styles.podItem}/>
        <View style={styles.textOverlay}>
            <Text style={styles.docketText}>{docketNum}</Text>
            <Text style={styles.docketText}>{date}</Text>
        </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
    imageContainer: {
        width: '45%', // Adjusted to fit three items in a row
        marginBottom: 20,
        position: 'relative',
    },
    podItem: {
        width: '100%',
        height: 180,
        borderRadius: 10,
    },
    textOverlay: {
        position: 'absolute',
        top: '75%',
        left: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        width: '100%',
        elevation: 10,
    },
    docketText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default GetPodsAdmin;

/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import POD_1 from '../Assets/POD_1.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import noImg from '../Assets/NoImage.jpg';

const GetPods = ({handleImagePress, imgID, docketNum, date}) => {
    const img = { source: POD_1, docket: '123456789' };
    const [ImageFound, setImageFound] = useState();
    console.log(imgID);

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
        width: '100%',
        elevation: 10,
    },
    docketText: {
        color: '#fff',
        fontSize: 13,
    },
});

export default GetPods;

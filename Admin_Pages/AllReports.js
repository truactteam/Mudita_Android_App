/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import GetPodsAdmin from './GetPodsAdmin';
// import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';

const AllReports = () => {

  const[images, setImages] = useState([]);
  // const navigation = useNavigation();
  const[loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchPOD = async () => {
        try {
          setLoading(true);
          let token = await AsyncStorage.getItem('jwtToken');
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
          setLoading(false);
        } catch (error) {
          console.warn('Data not found');
          setImages([]);
          setLoading(false);
        }
      };

      fetchPOD();
    }, [])
  );

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
    <ScrollView>
        <View style={styles.podContainer}>
          <View style={styles.podItems}>
              {images.length ? images.map((img, index) => (
                <GetPodsAdmin key={index} imgID={img.PODs.FileID} docketNum={img.PODs.DocketID} date={img.PODs.SubmissionDate} imgData={img} />
              )) : <View style={styles.noDataFound}><Text style={styles.noDataFoundText}>No POD Uploaded yet</Text></View>}
          </View>
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#e7d1c7',
  },
  podContainer: {
    marginTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
  },
  podItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
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

export default AllReports;

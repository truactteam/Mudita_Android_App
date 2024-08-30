import React, {useEffect, useState} from 'react';
import Login from './Common_Pages/Login';
import {enableScreens} from 'react-native-screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Home_user from './User_Pages/Home_user';
import Spinner from 'react-native-loading-spinner-overlay';
import {StyleSheet, View} from 'react-native';
import Associate_page from './Admin_Pages/Associate_page';
import MyTabs from './Admin_Pages/Bottom_bar';
import MyTabs2 from './User_Pages/Bottom_bar2';
import admin_AllReports from './Admin_Pages/AllReports';
import Add_user from './Admin_Pages/Add_User';
import ForgetPassword from './Common_Pages/forgetPassword';
import AssociateDetails from './Admin_Pages/AssociateDetails';
import SeeRecordsUser from './User_Pages/SeeRecords';
import EditProfileUser from './User_Pages/EditProfile';
import EditPOD from './Admin_Pages/EditPOD';

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

        <Stack.Screen name="AdminHome" component={MyTabs} />
        <Stack.Screen name="Reports" component={admin_AllReports} />
        <Stack.Screen name="Associate_page" component={Associate_page} />
        <Stack.Screen name="AddUser" component={Add_user} />
        <Stack.Screen name="AssociateDetails" component={AssociateDetails} />
        <Stack.Screen name="EditPOD" component={EditPOD} />

        <Stack.Screen name="UserHome" component={MyTabs2} />
        <Stack.Screen name="SeeRecordsUser" component={SeeRecordsUser} />
        <Stack.Screen name="EditProfileUser" component={EditProfileUser} />

        <Stack.Screen name="ForgetPass" component={ForgetPassword} />
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

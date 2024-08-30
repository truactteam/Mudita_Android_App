/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Admin_Home from './Home_admin';
import Settings from './Settings';
import UploadPOD from './uploadPOD';

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Add') {
              iconName = 'plus-circle';
            } else if (route.name === 'Settings') {
              iconName = 'cog-outline';
            }
            return <MaterialCommunityIcons name={iconName} color={color} size={28} />;
          },
          tabBarActiveTintColor: '#e91e63',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={Admin_Home} />
        <Tab.Screen name="Add" component={UploadPOD} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    );
  }

export default MyTabs;

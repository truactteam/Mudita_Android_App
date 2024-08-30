/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import User_Home from './Home_user';
// import Settings from './AddPOD';
import UploadPOD from './AddPOD';
import Settings from './Settings';

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
            } else if (route.name === 'Add POD') {
              iconName = 'plus-circle';
            } else if (route.name === 'Settings_user') {
              iconName = 'cog-outline';
            }
            return <MaterialCommunityIcons name={iconName} color={color} size={28} />;
          },
          tabBarActiveTintColor: '#e91e63',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={User_Home} />
        <Tab.Screen name="Add POD" component={UploadPOD} />
        <Tab.Screen name="Settings_user" component={Settings} />
      </Tab.Navigator>
    );
  }

export default MyTabs;

/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Add_user from './AddPOD';

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'plus-circle';
            } else if (route.name === 'Updates') {
              iconName = 'plus-circle';
            } else if (route.name === 'Profile') {
              iconName = 'plus-circle';
            }
            return <MaterialCommunityIcons name={iconName} color={color || '#262760'} size={size || 24} />;
          },
          tabBarActiveTintColor: '#e91e63',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Add_user} />
        <Tab.Screen name="Updates" component={Add_user} />
        <Tab.Screen name="Profile" component={Add_user} />
      </Tab.Navigator>
    );
  }

export default MyTabs;

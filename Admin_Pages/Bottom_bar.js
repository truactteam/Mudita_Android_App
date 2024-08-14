/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Add_user from './Associate_page';

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
            } else if (route.name === 'Add') {
              iconName = 'plus-circle';
            } else if (route.name === 'Settings') {
              iconName = 'plus-circle';
            }
            return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
          },
          tabBarActiveTintColor: '#e91e63',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Add_user} />
        <Tab.Screen name="Add" component={Add_user} />
        <Tab.Screen name="Settings" component={Add_user} />
      </Tab.Navigator>
    );
  }

export default MyTabs;

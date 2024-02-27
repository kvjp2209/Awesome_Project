import React, {memo} from 'react';

//libs
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//utils
import colors from '../utils/colors';
import {ROUTES} from '../constants/routes';

//components
import Home from '../screens/Home';
import Setting from '../screens/Setting';
import Profile from '../screens/Profile';
import Champion from '../screens/Champion';

const Tab = createBottomTabNavigator();

const tabBarIcon = (
  focused: boolean,
  name: string,
  color: string,
  size: number,
) => {
  const iconColor = focused ? colors.mainColor : colors.white[400];
  return <MaterialCommunityIcons name={name} color={iconColor} size={size} />;
};

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.white[500],
        tabBarStyle: {
          backgroundColor: colors.bottomTab,
        },
        tabBarLabelStyle: {
          textTransform: 'capitalize',
        },
      }}
      initialRouteName={ROUTES.CHAMPION}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: icon =>
            tabBarIcon(icon.focused, 'home', colors.white[400], 20),
        }}
        name={ROUTES.HOME}
        component={Home}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: icon =>
            tabBarIcon(icon.focused, 'robber', colors.white[400], 20),
        }}
        name={ROUTES.CHAMPION}
        component={Champion}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: icon =>
            tabBarIcon(icon.focused, 'account', colors.white[400], 20),
        }}
        name={ROUTES.PROFILE}
        component={Profile}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: icon =>
            tabBarIcon(icon.focused, 'cog', colors.white[400], 20),
        }}
        name={ROUTES.SETTING}
        component={Setting}
      />
    </Tab.Navigator>
  );
};

export default memo(BottomTab);

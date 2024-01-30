import React, {memo} from 'react';
import {NavigationContainer} from '@react-navigation/native';

//libs
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//utils, constants,...
import {ROUTES} from '../../constants/routes';

//components
import BottomTab from '../BottomTab';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name={ROUTES.BOTTOM_TAB}
          component={BottomTab}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default memo(RootStack);

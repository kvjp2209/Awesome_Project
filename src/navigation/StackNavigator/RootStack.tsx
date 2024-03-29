import React, {memo} from 'react';
import {NavigationContainer} from '@react-navigation/native';

//libs
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//utils, constants,...
import {ROUTES} from '../../constants/routes';

//hook
import {navigationRef, setReady} from '../Navigation.ref';

//components
import BottomTab from '../BottomTab';
import ChampionDetail from '../../screens/ChampionDetail/ChampionDetail';

const Stack = createNativeStackNavigator();

const onReady = () => {
  setReady(true);
};

const RootStack = () => {
  return (
    <NavigationContainer ref={navigationRef} onReady={onReady}>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name={ROUTES.BOTTOM_TAB}
          component={BottomTab}
        />
        <Stack.Screen
          options={({route}) => ({
            title: (route as any)?.params?.champion?.localized_name || '',
          })}
          name={ROUTES.CHAMPION_DETAIL}
          component={ChampionDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default memo(RootStack);

import React, {memo} from 'react';
import {NavigationContainer} from '@react-navigation/native';

//libs
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//utils, constants,...
import {ROUTES} from '@constant/routes';

//hook
import {navigationRef, setReady} from '@navigation/Navigation.ref';

//components
import BottomTab from '@navigation/BottomTab';
import ChampionDetail from '@screens/ChampionDetail';
import {ChampionType} from '@screens/Champion/Champion.type';

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  BOTTOM_TAB: undefined;
  CHAMPION_DETAIL: {champion: ChampionType};
};

const onReady = () => {
  setReady(true);
};

const RootStack = () => {
  return (
    <NavigationContainer ref={navigationRef} onReady={onReady}>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name={'BOTTOM_TAB'}
          component={BottomTab}
        />
        <Stack.Screen
          options={({route}) => ({
            title: (route as any)?.params?.champion?.localized_name || '',
          })}
          name={'CHAMPION_DETAIL'}
          component={ChampionDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default memo(RootStack);

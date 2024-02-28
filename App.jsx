import React, {useEffect, useLayoutEffect} from 'react';

//components
import RootStack from './src/navigation/StackNavigator/RootStack';

//hook
import {persistor, store} from './src/stores/store';

//libs
import {enableFreeze} from 'react-native-screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SetupAPI from './src/api/api.config';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {EventType} from '@notifee/react-native';
import notifee from '@notifee/react-native';

enableFreeze(true);

let App = () => {
  //setup axios
  useLayoutEffect(() => {
    SetupAPI.init();
  }, []);

  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <RootStack />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

//do not wrap memo here because wrapped CodePush in index.js
export default App;

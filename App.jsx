import React, {useLayoutEffect} from 'react';

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

enableFreeze(true);

let App = () => {
  //setup axios
  useLayoutEffect(() => {
    SetupAPI.init();
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

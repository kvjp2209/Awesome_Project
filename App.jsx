import React, {useLayoutEffect} from 'react';

//components
import RootStack from './src/navigation/StackNavigator/RootStack';

//libs
import {enableFreeze} from 'react-native-screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SetupAPI from './src/api/api.config';
import {Provider} from 'react-redux';
import {store} from './src/stores/store';

enableFreeze(true);

let App = () => {
  //setup axios
  useLayoutEffect(() => {
    SetupAPI.init();
  }, []);
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RootStack />
      </SafeAreaProvider>
    </Provider>
  );
};

//do not wrap memo here because wrapped CodePush in index.js
export default App;

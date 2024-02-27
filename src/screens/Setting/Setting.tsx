import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';

//libs
import {useDispatch, useSelector} from 'react-redux';

//stores
import {RootState} from '@stores/store';
import {decrement, increment} from '@stores/counter/counterSlice';

const Setting = () => {
  const count = useSelector(
    (state: RootState) => state.persistedReducer.counter.value,
  );
  const dispatch = useDispatch();

  return (
    <SafeAreaView>
      <View>
        <Text>{count}</Text>
      </View>
      <TouchableOpacity onPress={() => dispatch(increment())}>
        <View>
          <Text>Increment</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => dispatch(decrement())}>
        <View>
          <Text>Increment</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Setting;

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '../../stores/store';
import {decrement, increment} from '../../stores/counter/counterSlice';

const Setting = () => {
  const count = useSelector((state: RootState) => state.counterSlice.value);
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

const styles = StyleSheet.create({});

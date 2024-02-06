import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../stores/store';
import {decrement, increment} from '../../features/counter/counterSlice';

const Setting = () => {
  const count = useSelector((state: RootState) => state.counterReducer.value);
  const dispatch = useDispatch();

  return (
    <View>
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
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({});

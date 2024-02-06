import {useCallback, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';

import {useSelector, useDispatch} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {RootState} from '../../stores/store';
import {setIsLoading, setData} from '../../stores/champion/championSlice';

import {championApi} from '../../api/champion/champion.api';

const useChampionLogic = () => {
  //hooks
  const data = useSelector((state: RootState) => state.championSlice.data);

  const isLoading = useSelector(
    (state: RootState) => state.championSlice.isLoading,
  );
  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  const inset = useSafeAreaInsets();

  //callback
  const convertData = useCallback((dataArray: any[]) => {
    return dataArray.reduce((acc: any[], current: any) => {
      let listChampWithPrimeAttr = acc.filter(
        item => item.title === current.primary_attr,
      );

      if (listChampWithPrimeAttr.length) {
        listChampWithPrimeAttr[0].data.push(current);
        return acc;
      }
      const newItem: any = {
        title: current.primary_attr,
        data: [current],
      };
      acc.push(newItem);
      return acc;
    }, []);
  }, []);

  const getData = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await championApi.getChampionStats();
      dispatch(setIsLoading(false));
      const dataArray = response.data || [];

      let newData = convertData(dataArray);

      dispatch(setData(newData));
    } catch (error) {
      console.log('🐩 ~ file: Champion.tsx:18 ~ getData ~ error:', error);
    }
  }, [convertData, dispatch]);
  //

  //side effect
  useEffect(() => {
    if (isFocused) {
      getData();
    } else {
      dispatch(setData([]));
    }
  }, [isFocused]);

  return {
    data,
    inset,
    isLoading,
  };
};

export default useChampionLogic;

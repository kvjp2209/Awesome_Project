import React, {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {useSelector} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {setListChampionData} from '../../stores/champion/champion.slice';
import {
  selectChampionListOriginal,
  selectChampionListConverted,
  selectChampionLoading,
} from '../../stores/champion/champion.selector';
import {getChampionStats} from '../../stores/champion/champion.thunk';

import useDispatch from '../../hooks/useDispatch';

const useChampionLogic = () => {
  //hooks
  const dispatch = useDispatch();

  const data = useSelector(selectChampionListOriginal);

  const isLoading = useSelector(selectChampionLoading);

  const championListConverted = useSelector(selectChampionListConverted);

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
    dispatch(getChampionStats(null));

    let newData = convertData(data);
    dispatch(setListChampionData(newData));
  }, [convertData, data, dispatch]);

  //side effect
  useFocusEffect(
    React.useCallback(() => {
      dispatch(setListChampionData([]));
      getData();
    }, []),
  );

  return {
    data,
    inset,
    isLoading,
    championListConverted,
  };
};

export default useChampionLogic;

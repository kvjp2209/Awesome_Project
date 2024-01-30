import React, {memo, useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import colors from '../../utils/colors';

import {championApi} from '../../api/champion/champion.api';

const Champion = () => {
  const [data, setData] = useState([]);

  const inset = useSafeAreaInsets();

  //callback
  const getData = useCallback(async () => {
    try {
      const response = await championApi.getHeroStats();

      const dataArray = response.data || [];

      setData(dataArray);
    } catch (error) {
      console.log('🐩 ~ file: Champion.tsx:18 ~ getData ~ error:', error);
    }
  }, []);

  const keyExtractor = useCallback((item: any) => item.localized_name, []);

  //side effect
  useEffect(() => {
    getData();
  }, []);

  const renderItems = useCallback(({item}: {item: any}) => {
    return (
      <View style={styles.itemContainer}>
        <FastImage
          style={styles.image}
          source={{
            uri: 'https://cdn.dota2.com' + item.img,
          }}
          resizeMode="stretch"
        />
        <View style={styles.nameHero}>
          <Text numberOfLines={1} style={styles.nameHeroTxt}>
            {item.localized_name}
          </Text>
        </View>
      </View>
    );
  }, []);

  return (
    <View style={{flex: 1, paddingTop: inset.top}}>
      <Text>Champion</Text>
      <View style={styles.flatList}>
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItems}
          numColumns={4}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 54,
  },
  flatList: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  nameHero: {
    position: 'absolute',
    backgroundColor: colors.overlay_medium,
    flex: 1,
    width: '100%',
    bottom: 0,
  },
  nameHeroTxt: {
    color: colors.white[500],
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
    shadowColor: colors.black[500],
    shadowOffset: {height: 100, width: 100},
    shadowOpacity: 1,
    shadowRadius: 60,
    elevation: 100,
  },
});

export default memo(Champion);

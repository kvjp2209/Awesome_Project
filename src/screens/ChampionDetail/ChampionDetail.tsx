import React, {memo} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

//libs
import FastImage from 'react-native-fast-image';

//commons
import {DOMAIN_ROOT} from '@constant/common';

//components
import {ChampionType} from '@screens/Champion/Champion.type';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '@navigation/StackNavigator/RootStack';

interface PropTypes {
  route: {
    params: {
      champion: ChampionType;
    };
  };
}

export type ChampionDetailRouteProp = RouteProp<
  RootStackParamList,
  'CHAMPION_DETAIL'
>;

const width = Dimensions.get('window').width;

const ChampionDetail = () => {
  const champion = useRoute<ChampionDetailRouteProp>().params.champion;

  return (
    <View style={styles.container}>
      <FastImage
        style={styles.champImage}
        source={{
          uri: DOMAIN_ROOT + champion.img,
        }}
        resizeMode="stretch"
      />
      <View style={styles.name}>
        <Text style={styles.nameTxt}>{champion.localized_name}</Text>
      </View>
    </View>
  );
};

export default memo(ChampionDetail);

const styles = StyleSheet.create({
  container: {paddingHorizontal: 16},
  champImage: {
    marginTop: 20,
    height: 100,
    width: width / 3,
    alignSelf: 'center',
  },
  name: {
    marginTop: 10,
    alignItems: 'center',
  },
  nameTxt: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

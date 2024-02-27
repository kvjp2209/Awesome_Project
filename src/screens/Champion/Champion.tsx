import React, {memo, useCallback} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';

//libs
import FastImage from 'react-native-fast-image';

//utils, commons,...
import colors from '@utils/colors';
import {ROUTES} from '@constant/routes';
import {DOMAIN_ROOT} from '@constant/common';
import {navigateTo} from '@navigation/actions';

//components
import useChampionLogic from './Champion.logic';
import {ChampionType, ListChampion} from './Champion.type';

const attributeTitle: Record<string, string> = {
  str: 'Strength',
  agi: 'Agility',
  all: 'Universal',
  int: 'Intelligence',
};

const width = Dimensions.get('window').width;

const Champion = () => {
  const {championListConverted, inset, isLoading} = useChampionLogic();

  // callback
  const navigateToChampionDetail = useCallback((champion: ChampionType) => {
    navigateTo(ROUTES.CHAMPION_DETAIL, {champion: champion});
  }, []);

  const renderItem = useCallback((item: ChampionType, index: number) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => navigateToChampionDetail(item)}
        key={item.localized_name + index}>
        <View style={styles.itemContainer}>
          <FastImage
            style={styles.champImage}
            source={{
              uri: DOMAIN_ROOT + item.img,
            }}
            resizeMode="stretch"
          />
          <View style={styles.nameChampion}>
            <Text numberOfLines={1} style={styles.nameChampionTxt}>
              {item.localized_name}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }, []);

  const renderListChamps = useCallback(() => {
    return championListConverted.map((item: ListChampion) => {
      return (
        <View key={item.title}>
          <View style={styles.attrTitleContainer}>
            <Text style={styles.attrTitle}>
              {Object.values(attributeTitle[item.title])}
            </Text>
          </View>
          <View style={styles.listChampContainer}>
            {item.data.map(renderItem)}
          </View>
        </View>
      );
    });
  }, [championListConverted, renderItem]);

  return (
    <ScrollView
      style={{
        paddingTop: inset.top,
        backgroundColor: colors.backgroundColorDark,
      }}>
      {isLoading && (
        <ActivityIndicator
          size={20}
          color={colors.white[500]}
          style={[
            {
              paddingTop: inset.top,
            },
            styles.loading,
          ]}
        />
      )}
      <View style={styles.renderListChamps}>{renderListChamps()}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: width / 3,
  },
  listChampContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'center',
  },
  renderListChamps: {paddingBottom: Platform.OS === 'ios' ? 50 : 0},
  nameChampion: {
    position: 'absolute',
    backgroundColor: colors.overlay_medium,
    flex: 1,
    width: '100%',
    bottom: 0,
  },
  nameChampionTxt: {
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
  attrTitleContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  attrTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
    color: colors.ink[100],
  },
  champImage: {
    width: '100%',
    height: 60,
  },
  attrImage: {
    width: 30,
    height: 30,
  },
  loading: {
    backgroundColor: colors.backgroundColorDark,
    paddingTop: 50,
  },
});

export default memo(Champion);

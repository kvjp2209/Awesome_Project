import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, Dimensions} from 'react-native';

//libs
import FastImage from 'react-native-fast-image';

//utils
import colors from '@utils/colors';

const Home = () => {
  return (
    <SafeAreaView>
      <View style={styles.title}>
        <Text style={styles.titleTxt}>Update</Text>
      </View>
      <FastImage
        style={styles.image}
        source={{
          uri: 'https://static.wikia.nocookie.net/dota2_gamepedia/images/1/14/Minimap_7.33.png/revision/latest?cb=20230521004305',
        }}
        resizeMode={FastImage.resizeMode.stretch}
      />
      <View style={styles.statusInfo}>
        <Text style={styles.infoTxt}>Latest Patch: 2023-12-11</Text>
        <Text style={styles.infoTxt}>Latest Blog Post: 2023-08-08</Text>
        <Text style={styles.infoTxt}>
          Latest Hero: Muerta minimap icon Muerta
        </Text>
        <Text style={styles.infoTxt}>Latest Blog Post: 2023-08-08</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    alignItems: 'center',
  },
  titleTxt: {
    color: colors.black[500],
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    marginTop: 20,
    width: '80%',
    height: (Dimensions.get('window').width * 80) / 100,
    alignSelf: 'center',
  },
  statusInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  infoTxt: {
    color: colors.black[500],
  },
});

export default Home;

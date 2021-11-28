import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import {useSelector} from 'react-redux';

import fontSize from '../constants/FontSize';

const FavouriteScreen = ({navigation}) => {
  const favList = useSelector(state => state);

  if (favList.length > 0) {
    return (
      <View style={{backgroundColor: '#fff', flex: 1}}>
        <FlatList
          data={favList}
          keyExtractor={item => item.uri}
          renderItem={({item, index}) => (
            <View style={styles.container}>
              <TouchableHighlight
                activeOpacity={0.8}
                underlayColor={'#ddd'}
                onPress={() => {
                  navigation.navigate('Painting', {
                    paintingName: item.name,
                    paintingUri: item.uri,
                    paintingIndex: index,
                    artistName: item.artistName,
                    paintings: favList,
                  });
                }}>
                <View style={styles.imageContainer}>
                  <Image source={item.uri} style={styles.image} />
                </View>
              </TouchableHighlight>
              <View style={styles.info}>
                <Text style={styles.name}>
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </Text>
                <TouchableHighlight
                  activeOpacity={0.8}
                  underlayColor={'#ddd'}
                  onPress={() =>
                    navigation.navigate('PaintingList', {
                      artistId: item.artistId,
                      artistName: item.artistName,
                    })
                  }>
                  <Text style={styles.artistName}>{item.artistName}</Text>
                </TouchableHighlight>
              </View>
            </View>
          )}
        />
      </View>
    );
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: fontSize.large}}>There are no Favourites</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
  },
  imageContainer: {
    width: '100%',
    height: 300,
    marginBottom: 8,
    alignItems: 'center',
    borderWidth: 0.1,
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  info: {
    alignItems: 'center',
  },
  name: {
    fontSize: fontSize.large,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  artistName: {
    fontStyle: 'italic',
    color: '#014462',
    textDecorationLine: 'underline',
  },
});

export default FavouriteScreen;

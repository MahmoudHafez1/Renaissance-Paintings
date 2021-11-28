import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons';

import paintings from '../data/paintings';
import FontSize from '../constants/FontSize';

const PaintingListScreen = ({navigation, route}) => {
  const artistId = route.params.artistId;

  const artistPaintings = paintings[artistId];

  useEffect(() => {
    if (route.params) {
      navigation.setOptions({
        title: route.params.artistName,
        headerRight: () => (
          <TouchableOpacity activeOpacity={0.6} onPress={sourceHandler}>
            <FontAwesomeIcon
              icon={faExternalLinkAlt}
              color="white"
              size={FontSize.large}
            />
          </TouchableOpacity>
        ),
      });
    }
  }, [route.params]);

  const sourceHandler = () => {
    let artistLinkName = route.params.artistName
      .toLowerCase()
      .replace(/ /g, '-');
    switch (artistLinkName) {
      case 'andrea-del-verrocchio':
        artistLinkName = 'andrea-del-verrochio';
        break;
      default:
        break;
    }
    const url = 'https://www.wikiart.org/en/' + artistLinkName;
    Linking.openURL(url);
  };

  return (
    <View style={styles.screen}>
      <FlatList
        numColumns={4}
        data={artistPaintings}
        keyExtractor={item => item.uri}
        renderItem={({item, index}) => (
          <TouchableHighlight
            activeOpacity={0.8}
            underlayColor={'#ddd'}
            onPress={() => {
              navigation.navigate('Painting', {
                paintingName: item.name,
                paintingUri: item.uri,
                paintingIndex: index,
                artistName: route.params.artistName,
                paintings: artistPaintings,
              });
            }}>
            <View style={styles.paintingContainer}>
              <Image source={item.uri} style={styles.painting} />
            </View>
          </TouchableHighlight>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  paintingContainer: {
    width: Dimensions.get('window').width / 4,
    padding: 2,
  },
  painting: {
    width: '100%',
    height: undefined,
    aspectRatio: 2 / 3,
  },
});

export default PaintingListScreen;

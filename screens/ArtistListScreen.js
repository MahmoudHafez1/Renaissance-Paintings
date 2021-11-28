import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';

import ArtistCard from '../components/ArtistCard';
import artists from '../data/artists';
import fontSize from '../constants/FontSize';
import colors from '../constants/Colors';

const ArtistListScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <FlatList
        data={artists.sort((a, b) => a.name > b.name)}
        keyExtractor={item => item.name}
        renderItem={({item}) => {
          const artistName = item.name.replace(/-/g, ' ');
          const artistId = item.name.replace(/-/g, '');
          return (
            <TouchableHighlight
              activeOpacity={0.8}
              underlayColor={'#ddd'}
              onPress={() =>
                navigation.navigate('PaintingList', {artistId, artistName})
              }>
              <View>
                <ArtistCard
                  name={artistName}
                  born={item.born}
                  died={item.died}
                  nationality={item.nationality}
                  avatarUri={item.avatar}
                />
              </View>
            </TouchableHighlight>
          );
        }}
      />
    </View>
  );
};

export const artistListScreenOptions = navData => ({
  title: 'Artists',
  headerRight: () => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navData.navigation.navigate('Favourite');
      }}>
      <View style={styles.favButton}>
        <Text style={styles.favTxt}>Favourites</Text>
        <FontAwesomeIcon icon={faStar} size={fontSize.large} color="orange" />
      </View>
    </TouchableOpacity>
  ),
});

const styles = StyleSheet.create({
  favButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 4,
    borderRadius: 4,
  },
  favTxt: {
    marginRight: 2,
    fontSize: fontSize.regular,
    fontWeight: 'bold',
    color: colors.primary,
  },
});

export default ArtistListScreen;

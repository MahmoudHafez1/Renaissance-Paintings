import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import fontSize from '../constants/FontSize';

const ArtistCard = props => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={props.avatarUri} />
      </View>
      <View style={styles.bio}>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={{fontSize: fontSize.regular}}>
          {props.born}-{props.died}
        </Text>
        <Text style={{fontSize: fontSize.regular, fontStyle: 'italic'}}>
          {props.nationality}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#d3d3d3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarContainer: {
    overflow: 'hidden',
    width: fontSize.large * 4,
    height: fontSize.large * 4.6,
    borderRadius: 4,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  bio: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: fontSize.large,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default ArtistCard;

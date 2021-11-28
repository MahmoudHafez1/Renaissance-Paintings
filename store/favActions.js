import AsyncStorage from '@react-native-community/async-storage';

import paintings from '../data/paintings';

export const LOAD_FAVLIST = 'LOAD_FAVLIST';
export const CLEAR_FAVLIST = 'CLEAR_FAV';

export const loadFavList = () => {
  return async dispatch => {
    const favListStr = await AsyncStorage.getItem('fav');
    if (favListStr != null) {
      const favList = JSON.parse(favListStr);
      dispatch({type: LOAD_FAVLIST, favList});
    }
  };
};

export const addFav = (artistName, index) => {
  const artistId = artistName.replace(/ /g, '');
  return async dispatch => {
    const favListStr = await AsyncStorage.getItem('fav');
    let newFavList = [
      {
        name: paintings[artistId][index].name,
        uri: paintings[artistId][index].uri,
        artistName,
        artistId,
      },
    ];
    if (favListStr != null) {
      const favList = JSON.parse(favListStr);
      newFavList = [...newFavList, ...favList];
    }
    await AsyncStorage.setItem('fav', JSON.stringify(newFavList));
    dispatch({type: LOAD_FAVLIST, favList: newFavList});
  };
};

export const removeFav = uri => {
  return async dispatch => {
    const favListStr = await AsyncStorage.getItem('fav');
    if (favListStr != null) {
      const favList = JSON.parse(favListStr);
      const newFavList = favList.filter(painting => painting.uri != uri);
      await AsyncStorage.setItem('fav', JSON.stringify(newFavList));
      dispatch({type: LOAD_FAVLIST, favList: newFavList});
    } else {
      throw new Error('something went wrong');
    }
  };
};

export const clearFavList = () => {
  return async dispatch => {
    await AsyncStorage.removeItem('fav');
    dispatch({type: CLEAR_FAVLIST});
  };
};

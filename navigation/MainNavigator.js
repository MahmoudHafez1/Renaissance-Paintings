import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Colors from '../constants/Colors';
import ArtistListScreen from '../screens/ArtistListScreen';
import PaintingListScreen from '../screens/PaintingListScreen';
import PaintingScreen from '../screens/PaintingScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import {artistListScreenOptions} from '../screens/ArtistListScreen';
import fontSize from '../constants/FontSize';

const Stack = createNativeStackNavigator();

const screenDefaultOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: 'white',
  headerTintStyle: {
    fontWeight: 'bold',
  },
  headerTitleStyle: {
    fontSize: fontSize.large,
  },
};

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenDefaultOptions}>
      <Stack.Screen
        name="ArtistList"
        component={ArtistListScreen}
        options={artistListScreenOptions}
      />
      <Stack.Screen name="PaintingList" component={PaintingListScreen} />
      <Stack.Screen
        name="Painting"
        component={PaintingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={{title: 'Favourites'}}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Alert,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faStar, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import ImgToBase64 from 'react-native-image-base64';
import Orientation from 'react-native-orientation';

import * as actions from '../store/favActions';
import fontSize from '../constants/FontSize';

const PaintingScreen = ({route, navigation}) => {
  const [orientation, setOrientation] = useState();
  const [showOptions, setShowOptions] = useState(true);
  const [currentPainting, setCurrentPainting] = useState({
    name: route.params.paintingName,
    index: route.params.paintingIndex,
    uri: route.params.paintingUri,
    fav: false,
  });

  const dispatch = useDispatch();

  const favList = useSelector(state => state);

  const {paintings} = route.params;

  const swipeConfig = {
    velocityThreshold: 0.05,
    directionalOffsetThreshold: 80,
  };

  useEffect(() => {
    const subs = Dimensions.addEventListener('change', ({window}) => {
      if (window.width <= window.height) {
        setOrientation('Portrait');
      } else {
        setOrientation('Landsacpe');
      }
    });
    Orientation.unlockAllOrientations();
    return () => {
      subs.remove();
      Orientation.lockToPortrait();
    };
  }, []);

  const showOptionsToggle = () => {
    setShowOptions(state => !state);
  };

  useEffect(() => {
    if (favList.length > 0) {
      favList.forEach(fav => {
        if (fav.uri === currentPainting.uri) {
          setCurrentPainting(painting => ({
            ...painting,
            fav: true,
          }));
        }
      });
    }
  }, [currentPainting.index, favList]);

  const swipeLeftHandler = () => {
    if (currentPainting.index < paintings.length - 1) {
      setCurrentPainting(prev => ({
        name: paintings[prev.index + 1].name,
        index: prev.index + 1,
        uri: paintings[prev.index + 1].uri,
        fav: false,
      }));
    }
  };

  const swipeRightHandler = () => {
    if (currentPainting.index > 0) {
      setCurrentPainting(prev => ({
        name: paintings[prev.index - 1].name,
        index: prev.index - 1,
        uri: paintings[prev.index - 1].uri,
        fav: false,
      }));
    }
  };

  const favHandler = async () => {
    if (currentPainting.fav) {
      try {
        await dispatch(actions.removeFav(currentPainting.uri));
        setCurrentPainting(painting => ({
          ...painting,
          fav: false,
        }));
      } catch (err) {
        Alert.alert('', 'something went wrong');
      }
    } else {
      try {
        await dispatch(
          actions.addFav(route.params.artistName, currentPainting.index),
        );
        setCurrentPainting(painting => ({
          ...painting,
          fav: true,
        }));
      } catch (err) {
        Alert.alert('', 'something went wrong');
      }
    }
  };

  return (
    <GestureRecognizer
      onSwipeLeft={swipeLeftHandler}
      onSwipeRight={swipeRightHandler}
      config={swipeConfig}
      style={{flex: 1}}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={showOptionsToggle}>
          <Image
            source={currentPainting.uri}
            style={{maxHeight: '100%', maxWidth: '100%'}}
            resizeMode="contain"
          />
        </TouchableWithoutFeedback>
        {showOptions && (
          <View style={styles.optionsBar}>
            <View style={styles.actionBox}>
              <TouchableHighlight
                underlayColor="#2c2c2c"
                style={styles.action}
                onPress={() => navigation.goBack()}>
                <View>
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    color={'white'}
                    size={fontSize.large}
                  />
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.nameCont}>
              <Text style={styles.name}>
                {currentPainting.name != 'avatar'
                  ? currentPainting.name.charAt(0).toUpperCase() +
                    currentPainting.name.slice(1)
                  : ''}
              </Text>
            </View>
            <View style={styles.actionBox}>
              <TouchableHighlight
                underlayColor="#2c2c2c"
                style={styles.action}
                onPress={favHandler}>
                <FontAwesomeIcon
                  icon={faStar}
                  color={currentPainting.fav ? 'orange' : 'white'}
                  size={fontSize.large}
                />
              </TouchableHighlight>
            </View>
          </View>
        )}
      </View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsBar: {
    position: 'absolute',
    bottom: 0,
    paddingVertical: 8,
    zIndex: 100,
    opacity: 0.7,
    backgroundColor: '#000',
    width: '100%',
    minHeight: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  actionBox: {
    width: '15%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  action: {
    padding: 10,
    borderRadius: 5,
  },
  nameCont: {
    width: '70%',
  },
  name: {
    textAlign: 'center',
    fontSize: fontSize.large,
    color: '#fff',
  },
});

export default PaintingScreen;

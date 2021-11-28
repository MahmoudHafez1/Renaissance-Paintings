import {Dimensions} from 'react-native';

let smallerDimension;

if (Dimensions.get('window').width < Dimensions.get('window').height) {
  smallerDimension = Dimensions.get('window').width;
} else {
  smallerDimension = Dimensions.get('window').height;
}

export default {
  large: smallerDimension * 0.05,
  regular: smallerDimension * 0.038,
};

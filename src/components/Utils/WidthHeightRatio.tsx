import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const wr = (widthRatio: number): number => {
  return wp(widthRatio * 100);
};
export const hr = (heightRatio: number): number => {
  return hp(heightRatio * 100);
};

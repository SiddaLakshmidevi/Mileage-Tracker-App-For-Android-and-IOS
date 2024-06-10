import React from 'react';
import {TouchableOpacity} from 'react-native';
import {View, StyleSheet, Text, Image} from 'react-native';
import {wr, hr} from '../Utils/WidthHeightRatio';

interface ProfileImagesProps {
  image: any;
  title: string;
  imageBool?: boolean;
  onPress: () => void;
}

export const ProfileImages: React.FC<ProfileImagesProps> = ({
  image,
  title,
  imageBool = false,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {imageBool && <Image source={image} style={styles.image} />}
        {!imageBool && (
          <View style={styles.letterContainer}>
            <Text style={styles.letter}>{title.charAt(0)}</Text>
          </View>
        )}
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    margin: 5,
    height: 77,
  },
  image: {
    width: wr(55 / 360),
    height: hr(55 / 800),
    resizeMode: 'stretch',
  },
  text: {
    fontSize: wr(12 / 360),
    fontFamily: 'New Rubrik',
    fontWeight: '400',
    color: '#0B3C58',
    margin: 4,
  },
  letterContainer: {
    height: 52,
    width: 52,
    backgroundColor: '#F18484',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letter: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 22,
    fontWeight: '500',
  },
});

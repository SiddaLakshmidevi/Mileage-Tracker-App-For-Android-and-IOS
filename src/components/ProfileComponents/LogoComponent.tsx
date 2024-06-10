import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {View, Text, Image} from 'react-native';
import {wr, hr} from '../Utils/WidthHeightRatio';

interface LogoComponentProps {
  viewText: string;
  instructionText: string;
  image: any;
  height: number;
  width: number;
}

export const LogoComponent: React.FC<LogoComponentProps> = ({
  viewText,
  instructionText,
  image,
  height,
  width,
}) => {
  const widthRatio = wr(width / 360);
  const heightRatio = hr(height / 800);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={image}
          style={[
            styles.image,
            {
              width: widthRatio,
              height: heightRatio,
            },
          ]}
        />
        {viewText?.length !== 0 ? (
          <Text style={styles.textIcon}>{viewText}</Text>
        ) : null}
      </View>
      <View>
        <Text style={styles.instructionText}>{instructionText}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  textIcon: {
    color: '#FF4E4E',
    fontWeight: '600',
    fontSize: hr(20 / 800),
    fontFamily: 'New Rubrik',
    padding: hr(8 / 800),
    marginBottom: wr(10 / 360),
  },
  image: {
    resizeMode: 'contain',
    marginBottom: hr(20 / 800),
    marginTop: 10,
  },
  instructionText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: hr(20 / 800),
    color: '#0B3C58',
    fontFamily: 'New Rubrik',
    ...Platform.select({
      ios: {
        width: wr(300 / 360),
      },
      android: {
        width: wr(323 / 360),
      },
    }),
  },
  imageContainer: {
    alignItems: 'center',
  },
});

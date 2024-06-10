import React from 'react';
import {StyleSheet, View, Text, ViewStyle} from 'react-native';
import {hr} from '../Utils/WidthHeightRatio';

interface HeaderProps {
  title: string;
  style?: ViewStyle;
}

export const Header: React.FC<HeaderProps> = ({title, style = {}}) => {
  return (
    <View style={{...styles.HeadingContainer, ...style}}>
      <Text style={styles.Header}> {title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  HeadingContainer: {
    padding: 8,
  },
  Header: {
    fontSize: hr(22 / 800),
    fontWeight: '500',
    fontFamily: 'New Rubrik',
    color: '#0B3C58',
  },
});

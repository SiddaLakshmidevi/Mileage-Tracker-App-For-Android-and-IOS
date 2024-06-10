import React from 'react';
import {TouchableOpacity, Image, Text, View, StyleSheet} from 'react-native';

interface NavigationButtonProps {
  onPress: () => void;
  title: string;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  onPress,
  title,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{title}</Text>
        <Image
          source={require('../../assets/images/Small.png')}
          style={styles.arrowImage}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0B3C58',
    padding: 10,
    borderRadius: 5,
    width: 139,
    height: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 8,
  },
  arrowImage: {
    width: 15,
    height: 15,
  },
});

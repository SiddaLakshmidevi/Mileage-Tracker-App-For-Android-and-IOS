import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import {hr, wr} from '../Utils/WidthHeightRatio';

interface SidebarButtonProps {
  image: ImageSourcePropType;
  title: string;
  onPress: () => void;
}

export const SidebarButton: React.FC<SidebarButtonProps> = ({
  image,
  title,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.sidebarContainer} onPress={onPress}>
      <View>
        <Image source={image} style={styles.image} />
      </View>
      <View>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View>
        <Image
          source={require('../../assets/images/arrowsidebar.png')}
          style={styles.arrowimage}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: hr(50 / 800),
    width: wr(252 / 360),
  },
  image: {
    height: hr(24 / 800),
    width: wr(24 / 360),
    resizeMode: 'contain',
  },
  text: {
    fontFamily: 'New Rubrik',
    fontSize: wr(14 / 360),
    fontWeight: '400',
    color: '#0B3C58',
  },
  arrowimage: {
    height: hr(12 / 800),
    width: wr(12 / 360),
    resizeMode: 'contain',
    position: 'absolute',
    marginRight: 0,
  },
});

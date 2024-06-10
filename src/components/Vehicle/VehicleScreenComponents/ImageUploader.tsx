import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {View, Image, Pressable} from 'react-native';
import {hr, wr} from '../../Utils/WidthHeightRatio';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';

interface ImageUploaderProps {
  image: string;
  setImage: any;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  image,
  setImage,
}) => {
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 600,
      maxWidth: 600,
    };

    try {
      const response = await launchImageLibrary(options);
      if (response && response.assets && response.assets.length > 0) {
        setImage(response.assets[0].uri);
        setUploaded(true);
        console.log(image);
      } else {
        console.log('Image selection cancelled or no image selected.');
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };
  return (
    <Pressable style={styles.containerImage} onPress={handleUpload}>
      {uploaded ? (
        <Image style={styles.imageUploaded} source={{uri: image}} />
      ) : (
        <View style={styles.containerImage}>
          <Image
            style={styles.image}
            source={require('../../../assets/images/Camera.png')}
          />
        </View>
      )}
    </Pressable>
  );
};
const styles = StyleSheet.create({
  image: {
    height: hr(24 / 800),
    width: wr(24 / 360),
    borderRadius: hr(0.5),
  },
  containerImage: {
    height: 120,
    width: 120,
    borderRadius: hr(0.5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#45A9BF',
    resizeMode: 'cover',
  },
  imageUploaded: {
    height: 120,
    width: 120,
    borderRadius: hr(0.5),
    resizeMode: 'cover',
  },
});

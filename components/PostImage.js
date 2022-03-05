import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import React, {useState} from 'react';

const styles = StyleSheet.create({
  image: {
    paddingTop: 20,
    height: 300,
    width: 350,
    padding: 20,
  },
});

const PostImage = props => {
  const [uri, setUri] = useState(props.source?.uri || undefined);

  const pickPicture = () => {
    ImagePicker.openPicker({
      width: 350,
      height: 300,
      cropping: true,
    }).then(image => {
      setUri(image.path);
      props.onChange?.(image);
    });
  };
  return (
    <TouchableOpacity onPress={pickPicture}>
      <Image
        style={styles.image}
        {...props}
        source={uri ? {uri} : props.source}
      />
    </TouchableOpacity>
  );
};

export default PostImage;

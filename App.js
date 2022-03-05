import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import PostImage from './components/PostImage';

const styles = StyleSheet.create({
  scroll: {
    padding: 15,
    backgroundColor: 'white',
    flex: 1,
  },
  postImage: {
    alignItems: 'center',
    padding: 15,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  textInput: {
    marginTop: 15,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  submit: {
    backgroundColor: '#0284c7',
    padding: 10,
    borderRadius: 10,
  },
  submitText: {
    textAlign: 'center',
    color: '#1c1917',
    fontWeight: 'bold',
  },
});

const App = () => {
  const [content, setContent] = useState(null);
  const [image, setImage] = useState(null);

  const handleContent = content => {
    setContent(content);
  };

  const onImageChange = image => {
    setImage(image);
  };

  const createPost = async (content, image) => {
    console.log(content);
    console.log(image);
    const data = new FormData();
    data.append('image', {
      uri: image.path,
      type: image.mime,
      name: image.path.split('/').slice(-1)[0],
    });
    data.append('content', content);
    //console.log(data._parts[0][1]);
    try {
      let res = await fetch('https://devapi.bird.coach/v1/getsocial/me/feed', {
        method: 'post',
        body: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data; ',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozMzMyLCJzZXNzaW9uX2lkIjo2OTg2MSwiaWF0IjoxNjQ2MTY5OTA3fQ.WA7YVNsR9VMjFAIjrjno0LUNUAnvGGDczgfxaBJKPRM',
        },
      });
      let responseJson = await res.json();
      console.log(responseJson);
      alert('Post created');
    } catch (error) {
      console.log(error);
      alert('Error creating post');
    }
  };

  return (
    <View style={styles.scroll}>
      <StatusBar barStyle="dark-content" />
      <Text style={{padding: 15}}>Post Image: </Text>
      <View style={styles.postImage}>
        <PostImage
          onChange={onImageChange}
          source={require('./image-placeholder.jpeg')}
        />
      </View>
      <View style={styles.content}>
        <Text>Post content: </Text>
        <TextInput style={styles.textInput} onChangeText={handleContent} />
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.submit}
          onPress={() => {
            createPost(content, image);
          }}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;

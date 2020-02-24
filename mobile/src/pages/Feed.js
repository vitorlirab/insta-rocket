import React, {useState, useEffect} from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  View,
} from 'react-native';

import api from '../services/api';
import {loadPost, loadLikes} from '../services/websocket';

import camera from '../assets/camera.png';
import more from '../assets/more.png';
import like from '../assets/like.png';
import send from '../assets/send.png';
import comment from '../assets/comment.png';

export default function Feed() {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    async function loadFeed() {
      const response = await api.get('/posts');
      setFeed(response.data);
    }
    loadFeed();
  }, []);
  useEffect(() => {
    loadLikes(
      likedPost => {
        setFeed(
          feed.map(liked => (liked._id === likedPost._id ? likedPost : liked))
        );
      },
      [feed]
    );
    loadPost(
      newPost => {
        setFeed([newPost, ...feed]);
      },
      [feed]
    );
  });

  function handleLike(id) {
    api.post(`/posts/${id}/like`);
  }
  return (
    <>
      <View style={style.container}>
        <FlatList
          data={feed}
          keyExtractor={post => post._id}
          renderItem={({item}) => (
            <View style={style.feedItem}>
              <View style={style.feedItemHeader}>
                <View style={style.userInfo}>
                  <Text style={style.name}>{item.author}</Text>
                  <Text style={style.place}>{item.place}</Text>
                </View>
                <Image source={more} />
              </View>
              <Image
                style={style.feedImage}
                source={{uri: `http://10.0.0.100:3333/files/${item.image}`}}
              />
              <View style={style.feedImageFooter}>
                <View style={style.actions}>
                  <TouchableOpacity
                    style={style.action}
                    onPress={() => handleLike(item._id)}>
                    <Image source={like} />
                  </TouchableOpacity>
                  <TouchableOpacity style={style.action} onPress={() => {}}>
                    <Image source={comment} />
                  </TouchableOpacity>
                  <TouchableOpacity style={style.action} onPress={() => {}}>
                    <Image source={send} />
                  </TouchableOpacity>
                </View>
                <Text style={style.likes}>{item.likes} curtidas</Text>
                <Text style={style.description}>{item.description}</Text>
                <Text style={style.hashtags}>{item.hashtags}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  feedItem: {
    marginTop: 20,
  },
  feedItemHeader: {
    paddingHorizontal: 15,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    color: '#000',
  },
  place: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  feedImage: {
    width: '100%',
    height: 400,
    marginVertical: 15,
  },
  feedImageFooter: {
    paddingHorizontal: 15,
  },
  actions: {
    flexDirection: 'row',
  },
  action: {
    marginRight: 8,
  },
  likes: {
    marginTop: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    lineHeight: 18,
    color: '#000',
  },
  hashtags: {
    color: '#7159c1',
  },
});

Feed.navigationOptions = ({navigation}) => ({
  headerRight: () => (
    <TouchableOpacity
      style={{marginRight: 20}}
      onPress={() => navigation.navigate('New')}>
      <Image source={camera} />
    </TouchableOpacity>
  ),
});

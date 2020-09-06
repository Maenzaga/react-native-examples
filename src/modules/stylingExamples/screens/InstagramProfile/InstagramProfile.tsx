import React from 'react';
import {View, Image} from 'react-native';
import {InstagramStats} from '../InstagramStats/InstagramStats';
import {InstagramUserInfo} from '../InstagramUserInfo/InstagramUserInfo';
import styles from './styles';

export const InstagramProfile = ({
  user: {name, description, posts, followers, following},
}) => (
  <View style={{flex: 1, backgroundColor: '#fff', margin: 8}}>
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Image
          style={styles.image}
          source={{
            uri:
              'https://snack.expo.io/web-player/38/static/media/react-native-logo.2e38e3ef.png',
          }}
        />
        <InstagramStats
          posts={posts}
          followers={followers}
          following={following}
        />
      </View>
      <InstagramUserInfo name={name} description={description} />
    </View>
  </View>
);

import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

export const InstagramStats = ({posts, followers, following}) => (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      flexDirection: 'row',
    }}>
    <View style={styles.sideImageInfo}>
      <Text style={styles.statValue}>{posts}</Text>
      <Text style={styles.stat}>Posts</Text>
    </View>
    <View style={styles.sideImageInfo}>
      <Text style={styles.statValue}>{followers}</Text>
      <Text style={styles.stat}>Followers</Text>
    </View>
    <View style={styles.sideImageInfo}>
      <Text style={styles.statValue}>{following}</Text>
      <Text style={styles.stat}>Following</Text>
    </View>
  </View>
);

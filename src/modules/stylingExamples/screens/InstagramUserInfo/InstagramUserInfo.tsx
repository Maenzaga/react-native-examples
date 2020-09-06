import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

export const InstagramUserInfo = ({name, description}) => (
  <View>
    <Text style={styles.name}>{name}</Text>
    <Text>{description}</Text>
    <Text>Followed by... </Text>
  </View>
);

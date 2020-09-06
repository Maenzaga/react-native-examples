import React from 'react';
import {FlatList, View} from 'react-native';
import {InstagramProfile} from './InstagramProfile/InstagramProfile';

const userObj = {
  name: 'Manuel E Zafrane G',
  description: 'Describo que eres un paju en estilos',
  posts: 1536,
  followers: 1200,
  following: 750,
};

const list = [userObj, userObj, userObj, userObj, userObj];

export const StylingExampleScreen = () => (
  <FlatList
    data={list}
    renderItem={({item}) => <InstagramProfile user={{...item}} />}
    keyExtractor={(_, index: number) => index.toString()}
    ItemSeparatorComponent={() => (
      <View style={{height: 1, backgroundColor: 'red'}} />
    )}
  />
);

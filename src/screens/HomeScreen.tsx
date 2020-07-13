import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {ApplicationState} from '../store';

export const HomeScreen = () => {
  const user = useSelector((state: ApplicationState) => state.user.user);
  return (
    <View>
      <Text>{`Hello ${user?.username}!`}</Text>
    </View>
  );
};

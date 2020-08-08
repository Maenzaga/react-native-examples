import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const Separator = ({color = '#d8d8d8', style = undefined}) => {
  return (
    <LinearGradient
      style={style}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#ececec', color, '#ececec']}>
      <View style={{width: '100%', height: 1}} />
    </LinearGradient>
  );
};

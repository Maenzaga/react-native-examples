import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';

interface AppButtonProps {
  text: string;
  loading?: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const AppButton = (props: AppButtonProps) => {
  const {text, loading, onPress, style, textStyle} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, style]}>
        <Text style={[styles.text, {marginRight: 8}, textStyle]}>{text}</Text>
        {loading && (
          <ActivityIndicator
            color="#fff"
            size="small"
            style={{alignSelf: 'center'}}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

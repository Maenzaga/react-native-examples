import React from 'react';
import {StyleProp, ViewStyle, View, Button, ButtonProps} from 'react-native';

interface ComponentProps {
  style?: StyleProp<ViewStyle>;
}

type StyledButtonProps = ComponentProps & ButtonProps;

export const StyledButton = (props: StyledButtonProps) => {
  const {style, ...restProps} = props;

  return (
    <View style={style}>
      <Button {...restProps} />
    </View>
  );
};

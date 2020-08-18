import React, {useEffect, useRef} from 'react';
import {View, Animated, Easing, TouchableWithoutFeedback} from 'react-native';
import styles from '../styles/homeScreen.style';
import {useNavigation} from '@react-navigation/native';
import {AppButton} from '../../../components';
import {useDispatch} from 'react-redux';
import {getTasks} from '../../todolist';

interface ExampleButtonProps {
  text: string;
  screenName: string;
}

export const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const navigateToExample = (screenName: string) => {
    navigation.navigate(screenName);
  };

  const animateCircle = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.7,
        easing: Easing.back(3),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1.3,
        easing: Easing.back(3),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        easing: Easing.back(3),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const ExampleButton = (props: ExampleButtonProps) => {
    const {text, screenName} = props;
    return (
      <AppButton
        style={styles.button}
        text={text}
        onPress={() => {
          navigateToExample(screenName);
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={animateCircle}>
        <Animated.View
          style={{
            margin: 16,
            width: 50,
            height: 50,
            backgroundColor: '#add8e6',
            borderRadius: 25,
            transform: [{scale}],
          }}></Animated.View>
      </TouchableWithoutFeedback>
      <ExampleButton text="Login" screenName="LoginScreen" />
      <ExampleButton text="TODO List" screenName="TaskListScreen" />
      <ExampleButton text="GitHub" screenName="GitHubTabs" />
    </View>
  );
};

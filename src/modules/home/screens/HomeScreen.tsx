import React, {useEffect} from 'react';
import {View} from 'react-native';
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

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const navigateToExample = (screenName: string) => {
    navigation.navigate(screenName);
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
      <ExampleButton text="Login" screenName="LoginScreen" />
      <ExampleButton text="TODO List" screenName="TaskListScreen" />
    </View>
  );
};

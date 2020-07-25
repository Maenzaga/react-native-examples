import React from 'react';
import {View} from 'react-native';
import styles from '../styles/homeScreen.style';
import {useNavigation} from '@react-navigation/native';
import {StyledButton, AppButton} from '../components';

interface ExampleButtonProps {
  text: string;
  screenName: string;
}

const HomeScreen = () => {
  const navigation = useNavigation();

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

export default HomeScreen;

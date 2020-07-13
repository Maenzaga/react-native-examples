import React, {useState} from 'react';
import {ScrollView, Button, View, TextInput, AsyncStorage} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const RegistrationScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const onUsernameChanged = (username: string) => {
    setUsername(username);
  };

  const onPasswordChanged = (password: string) => {
    setPassword(password);
  };

  return (
    <ScrollView style={{padding: 16}} keyboardShouldPersistTaps="always">
      <TextInput
        value={username}
        placeholder="Username"
        onChangeText={onUsernameChanged}
      />
      <View style={{marginVertical: 4}} />
      <TextInput
        value={password}
        placeholder="Password"
        onChangeText={onPasswordChanged}
      />
      <View style={{marginVertical: 4}} />
      <Button
        title="Sign up"
        onPress={() => {
          AsyncStorage.getItem('registered_users').then(
            (json: string | null) => {
              const registeredUsers: string[] = json ? JSON.parse(json) : [];
              console.log('Registerd users before', registeredUsers);
              registeredUsers.push(username);
              console.log('Registerd users after', registeredUsers);
              AsyncStorage.setItem(
                'registered_users',
                JSON.stringify(registeredUsers),
              ).then(() => {
                navigation.goBack();
              });
            },
          );
        }}
      />
    </ScrollView>
  );
};

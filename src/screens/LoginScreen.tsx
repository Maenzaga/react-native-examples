import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  SafeAreaView,
  Button,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ApplicationState} from '../store';
import {LoginActionTypes} from '../modules/login/login.actions';
import {useNavigation} from '@react-navigation/native';

export const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state: ApplicationState) => state.user.user);
  const navigation = useNavigation();

  useEffect(() => {
    if (user) {
      navigation.reset({
        routes: [{name: 'HomeScreen'}],
      });
    }
  }, [user, navigation]);

  const onUsernameChanged = (username: string) => {
    setUsername(username);
  };

  const onPasswordChanged = (password: string) => {
    setPassword(password);
  };

  const onPress = () => {
    if (username.length && password.length) {
      AsyncStorage.getItem('registered_users').then((json: string | null) => {
        const registeredUsers: string[] = json ? JSON.parse(json) : [];
        console.log('Registerd users before', registeredUsers);
        const isRegistered = registeredUsers.some(
          (item: string) => item === username,
        );
        isRegistered
          ? dispatch({
              type: LoginActionTypes.SET_USER,
              payload: {username, password},
            })
          : Alert.alert('Error!', 'Please register first!');
      });
    } else {
      Alert.alert('Error!', 'Please fill in all the fields!');
    }
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
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}>
        <View style={{flex: 1, marginRight: 32}}>
          <Button title="Login" onPress={onPress} />
        </View>
        <TouchableOpacity
          style={{flex: 1, alignSelf: 'center'}}
          onPress={() => navigation.navigate('RegistrationScreen')}>
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

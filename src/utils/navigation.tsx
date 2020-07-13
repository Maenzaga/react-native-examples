import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../screens/LoginScreen';
import {HomeScreen} from '../screens/HomeScreen';
import {useDispatch} from 'react-redux';
import {LoginActionTypes} from '../modules/login/login.actions';
import {RegistrationScreen} from '../screens/RegistrationScreen';

const AppStack = createStackNavigator();

export const AppNavigator = () => {
  const dispatch = useDispatch();

  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <AppStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={(props: {navigation: any}) => ({
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 16}}
              onPress={() => {
                dispatch({
                  type: LoginActionTypes.SET_USER,
                  payload: {username: undefined, password: undefined},
                });
                props.navigation.reset({routes: [{name: 'LoginScreen'}]});
              }}>
              <Text>LOGOUT</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <AppStack.Screen
        name="RegistrationScreen"
        component={RegistrationScreen}
      />
    </AppStack.Navigator>
  );
};

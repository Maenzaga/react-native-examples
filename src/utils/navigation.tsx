import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';
import HomeScreen from '../screens/HomeScreen';
import {LoginScreen, WelcomeScreen, LoginActionTypes} from '../modules/login';
import {RegistrationScreen} from '../modules/signup';
import {TaskListScreen, NewTaskScreen} from '../modules/todolist';
import {Screens} from '../paths';

const AppStack = createStackNavigator();

export const AppNavigator = () => {
  const dispatch = useDispatch();

  return (
    <AppStack.Navigator initialRouteName={Screens.HomeScreen}>
      <AppStack.Screen name={Screens.HomeScreen} component={HomeScreen} />
      <AppStack.Screen
        name={Screens.LoginScreen}
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <AppStack.Screen
        name={Screens.WelcomeScreen}
        component={WelcomeScreen}
        options={(props: {navigation: any}) => ({
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 16}}
              onPress={() => {
                dispatch({
                  type: LoginActionTypes.SET_USER,
                  payload: {username: undefined, password: undefined},
                });
                props.navigation.reset({routes: [{name: Screens.LoginScreen}]});
              }}>
              <Text>LOGOUT</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <AppStack.Screen
        name={Screens.RegistrationScreen}
        component={RegistrationScreen}
      />
      <AppStack.Screen
        name={Screens.TaskListScreen}
        component={TaskListScreen}
        options={(props: {navigation: any}) => {
          return {
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate(Screens.NewTaskScreen);
                }}>
                <View style={{marginRight: 16}}>
                  <Text style={{fontSize: 28}}>+</Text>
                </View>
              </TouchableOpacity>
            ),
          };
        }}
      />
      <AppStack.Screen name={Screens.NewTaskScreen} component={NewTaskScreen} />
    </AppStack.Navigator>
  );
};

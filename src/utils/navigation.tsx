import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';
import {HomeScreen} from '../modules/home';
import {LoginScreen, WelcomeScreen, LoginActionTypes} from '../modules/login';
import {RegistrationScreen} from '../modules/signup';
import {TaskListScreen, NewTaskScreen, clearTasks} from '../modules/todolist';
import {Screens} from '../paths';

import Icon from 'react-native-vector-icons/FontAwesome';
const MyIcon = () => <Icon name="trash" size={20} color="#000" />;

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
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(clearTasks());
                  }}>
                  <View style={{marginRight: 16, marginTop: 8}}>
                    <MyIcon />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate(Screens.NewTaskScreen);
                  }}>
                  <View style={{marginRight: 16}}>
                    <Text style={{fontSize: 28}}>+</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ),
            title: 'TO-DO',
            headerBackTitleVisible: false,
          };
        }}
      />
      <AppStack.Screen
        name={Screens.NewTaskScreen}
        component={NewTaskScreen}
        options={(props: {route: any}) => {
          return {
            title: props.route.params ? 'Edit Task' : 'New Task',
            headerBackTitleVisible: false,
          };
        }}
      />
    </AppStack.Navigator>
  );
};

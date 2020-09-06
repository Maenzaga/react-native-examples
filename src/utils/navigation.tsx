import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useDispatch} from 'react-redux';
import {HomeScreen} from '../modules/home';
import {LoginScreen, WelcomeScreen, LoginActionTypes} from '../modules/login';
import {RegistrationScreen} from '../modules/signup';
import {SearchRepositoryScreen, SearchUsersScreen} from '../modules/github';
import {TaskListScreen, NewTaskScreen, clearTasks} from '../modules/todolist';
import {Screens} from '../paths';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StylingExampleScreen} from '../modules/stylingExamples/screens/StylingExampleScreen';

const MyIcon = () => <Icon name="trash" size={20} color="#000" />;

const AppStack = createStackNavigator();

const BottomTabs = createBottomTabNavigator();
const BottomTabsNavigator = () => (
  <BottomTabs.Navigator
    tabBarOptions={{
      tabStyle: {alignSelf: 'center'},
      labelStyle: {fontSize: 16, fontWeight: 'bold'},
    }}>
    <BottomTabs.Screen
      name={Screens.SearchRepository}
      component={SearchRepositoryScreen}
      options={{
        tabBarLabel: 'Repos',
        title: 'heyas',
      }}></BottomTabs.Screen>
    <BottomTabs.Screen
      name={Screens.SearchUser}
      component={SearchUsersScreen}
      options={{tabBarLabel: 'Users'}}></BottomTabs.Screen>
  </BottomTabs.Navigator>
);

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
      <AppStack.Screen
        name={Screens.GitHubTabs}
        component={BottomTabsNavigator}
        options={{headerBackTitleVisible: false, headerTitle: 'GitHub'}}
      />
      <AppStack.Screen
        name={Screens.StylingExample}
        component={StylingExampleScreen}
      />
    </AppStack.Navigator>
  );
};

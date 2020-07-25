import React, {useState} from 'react';
import {View, TextInput, Platform} from 'react-native';
import {AppButton} from '../../../components';
import {useNavigation} from '@react-navigation/native';
import {Task, TodoActionTypes} from '../todo.actions';
import {useDispatch} from 'react-redux';

export const NewTaskScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onPress = () => {
    const task: Task = {title, description};
    dispatch({type: TodoActionTypes.ADD_TASK, payload: {task}});
    navigation.goBack();
  };

  return (
    <View style={{paddingHorizontal: 56, paddingVertical: 16}}>
      <TextInput
        value={title}
        placeholder="Title"
        onChangeText={setTitle}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#808080',
          marginBottom: 16,
          paddingBottom: Platform.OS === 'ios' ? 8 : 0,
        }}
      />
      <TextInput
        value={description}
        placeholder="Description"
        onChangeText={setDescription}
        multiline
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#808080',
          marginBottom: 32,
          paddingBottom: Platform.OS === 'ios' ? 8 : 0,
        }}
      />
      <AppButton text="Add task" onPress={onPress} />
    </View>
  );
};

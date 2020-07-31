import React, {useState, useEffect} from 'react';
import {View, TextInput, Platform} from 'react-native';
import {AppButton} from '../../../components';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Task, TodoActionTypes, addTask, editTask} from '../todo.actions';
import {useDispatch, useSelector} from 'react-redux';
import {ApplicationState} from '../../../store';
import {usePrevious} from '../../../utils/hooks';
import shortid from 'shortid';

export const NewTaskScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const todoState = useSelector((state: ApplicationState) => state.todos);
  const prevTodoState = usePrevious(todoState);
  const {params} = useRoute<any>();
  const [title, setTitle] = useState((params.task && params.task.title) || '');
  const [description, setDescription] = useState(
    (params.task && params.task.description) || '',
  );

  useEffect(() => {
    if (todoState && prevTodoState && prevTodoState.tasks !== todoState.tasks) {
      navigation.goBack();
    }
  }, [todoState, prevTodoState]);

  const onPress = () => {
    if (params.task) {
      const task: Task = {id: params.task.id, title, description};
      dispatch(editTask(task));
    } else {
      const id = shortid.generate();
      const task: Task = {id, title, description};
      dispatch(addTask(task));
    }
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
      <AppButton
        text="Add task"
        onPress={onPress}
        loading={false}
        // style={{opacity: isLoading ? 0.5 : 1}}
      />
    </View>
  );
};

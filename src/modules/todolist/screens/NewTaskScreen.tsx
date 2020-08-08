import React, {useState, useEffect} from 'react';
import {View, TextInput, Platform, ViewStyle} from 'react-native';
import {AppButton, Calendar} from '../../../components';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Task, addTask, editTask} from '../todo.actions';
import {useDispatch, useSelector} from 'react-redux';
import {ApplicationState} from '../../../store';
import {usePrevious} from '../../../utils/hooks';
import shortid from 'shortid';
import moment from 'moment';

const textInputStyle: ViewStyle = {
  borderBottomWidth: 1,
  borderBottomColor: '#808080',
  marginBottom: 16,
  paddingBottom: Platform.OS === 'ios' ? 8 : 0,
};

const getInitialDate = (date: string | undefined) =>
  date ? moment(date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');

export const NewTaskScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const todoState = useSelector((state: ApplicationState) => state.todos);
  const prevTodoState = usePrevious(todoState);
  const {params} = useRoute<any>();
  const [title, setTitle] = useState(
    (params && params.task && params.task.title) || '',
  );
  const [description, setDescription] = useState(
    (params && params.task && params.task.description) || '',
  );
  const [markedDates, setMarkedDates] = useState<{
    [date: string]: any;
  }>({
    [getInitialDate(params ? params.task.dueDate : undefined)]: {
      selected: true,
      // marked: true,
      selectedColor: '#add8e6',
    },
  });

  useEffect(() => {
    if (todoState && prevTodoState && prevTodoState.tasks !== todoState.tasks) {
      navigation.goBack();
    }
  }, [todoState, prevTodoState]);

  const onPress = () => {
    if (params && params.task) {
      const task: Task = {
        id: params.task.id,
        title,
        description,
        dueDate: Object.keys(markedDates)[0],
      };
      dispatch(editTask(task));
    } else {
      const id = shortid.generate();
      const task: Task = {
        id,
        title,
        description,
        dueDate: Object.keys(markedDates)[0],
      };
      dispatch(addTask(task));
    }
  };

  const onDayPress = (day: any) => {
    const key = day.dateString;
    const newMarkedDates = {...markedDates};

    const keysCount = Object.keys(markedDates).length;

    if (keysCount === 0) {
      newMarkedDates[key] = {
        selected: true,
        // marked: true,
        selectedColor: '#add8e6',
      };
    } else {
      const keys = Object.keys(markedDates);
      delete newMarkedDates[keys[0]];
      newMarkedDates[key] = {
        selected: true,
        // marked: true,
        selectedColor: '#add8e6',
      };
    }
    setMarkedDates(newMarkedDates);
  };

  return (
    <View style={{paddingHorizontal: 56, paddingVertical: 16}}>
      <TextInput
        value={title}
        placeholder="Title"
        onChangeText={setTitle}
        style={textInputStyle}
      />
      <TextInput
        value={description}
        placeholder="Description"
        onChangeText={setDescription}
        multiline
        style={textInputStyle}
      />
      <Calendar
        style={{marginVertical: 32}}
        initialDate={getInitialDate(params ? params.task.dueDate : undefined)}
        onDayPress={onDayPress}
        markedDates={markedDates}
      />
      <AppButton
        text={params ? 'Edit' : 'Add'}
        onPress={onPress}
        loading={todoState.loading}
        style={{opacity: todoState.loading ? 0.5 : 1}}
      />
    </View>
  );
};

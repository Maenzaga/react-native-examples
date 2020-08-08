import React from 'react';
import {Task, deleteTask} from '../../modules/todolist';
import Modal from 'react-native-modal';
import {View, TouchableOpacity, Text, Alert} from 'react-native';
import {TaskView} from '../TaskView';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '../../paths';
import {useDispatch} from 'react-redux';
import {Separator} from '../Separator';

interface TaskDetailsProps {
  task?: Task;
  isVisible: boolean;
  onClose: () => void;
}

const ActionItem = (props: {text: string; onPress: () => void}) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={{marginVertical: 4}}>
      <View>
        <Text>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const TaskDetailsModal = (props: TaskDetailsProps) => {
  const {task, isVisible, onClose} = props;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onEditPress = () => {
    navigation.navigate(Screens.NewTaskScreen, {task});
    props.onClose();
  };

  const onDeletePress = () => {
    // Alert.alert('Confirm', 'Are you sure you want to delete this task?', [
    //   {
    //     text: 'no',
    //     onPress: () => {
    //       props.onClose();
    //     },
    //   },
    //   {
    //     text: 'yes',
    //     onPress: () => {
    //       task && dispatch(deleteTask(props.task));
    //       props.onClose();
    //     },
    //   },
    // ]);
    task && dispatch(deleteTask(props.task));
    props.onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}>
      <View style={{backgroundColor: '#fff', padding: 16, borderRadius: 15}}>
        {/* <TaskView task={task} /> */}
        <Text style={{marginVertical: 8, fontWeight: 'bold', fontSize: 18}}>
          Select Action
        </Text>
        <Separator style={{marginVertical: 8}} />
        <ActionItem text="Edit" onPress={onEditPress} />
        <ActionItem text="Delete" onPress={onDeletePress} />
      </View>
    </Modal>
  );
};

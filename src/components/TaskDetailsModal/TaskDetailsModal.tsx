import React from 'react';
import {Task} from '../../modules/todolist';
import Modal from 'react-native-modal';
import {View, TouchableOpacity, Text} from 'react-native';
import {TaskView} from '../TaskView';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '../../paths';

interface TaskDetailsProps {
  task?: Task;
  isVisible: boolean;
  onClose: () => void;
}

export const TaskDetailsModal = (props: TaskDetailsProps) => {
  const {task, isVisible, onClose} = props;
  const navigation = useNavigation();

  const onEditPress = () => {
    navigation.navigate(Screens.NewTaskScreen, {task});
    props.onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}>
      <View style={{backgroundColor: '#fff', padding: 16, borderRadius: 15}}>
        {/* <TaskView task={task} /> */}
        <TouchableOpacity onPress={onEditPress}>
          <View>
            <Text>Edit</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

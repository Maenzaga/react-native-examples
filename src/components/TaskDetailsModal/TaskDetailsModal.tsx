import React from 'react';
import {Task} from '../../modules/todolist';
import Modal from 'react-native-modal';
import {View} from 'react-native';
import {TaskView} from '../TaskView';

interface TaskDetailsProps {
  task?: Task;
  isVisible: boolean;
  onClose: () => void;
}

export const TaskDetailsModal = (props: TaskDetailsProps) => {
  const {task, isVisible, onClose} = props;
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}>
      <View style={{backgroundColor: '#fff', padding: 16, borderRadius: 15}}>
        <TaskView task={task} />
      </View>
    </Modal>
  );
};

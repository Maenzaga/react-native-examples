import React from 'react';
import {View, StyleProp, ViewStyle, Text, TouchableOpacity} from 'react-native';
import {Task} from '../../modules/todolist';
import styles from './styles';

interface TaskViewProps {
  task?: Task;
  compact?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const TaskView = (props: TaskViewProps) => {
  const {task, compact, onPress, style} = props;
  return task ? (
    <TouchableOpacity disabled={!onPress} onPress={onPress}>
      <View style={[styles.container, style]}>
        <Text style={styles.title}>{task.title}</Text>
        <Text
          style={styles.description}
          numberOfLines={compact === undefined || !compact ? undefined : 2}>
          {task.description}
        </Text>
      </View>
    </TouchableOpacity>
  ) : null;
};

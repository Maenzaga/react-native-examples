import React from 'react';
import {View, StyleProp, ViewStyle, Text, TouchableOpacity} from 'react-native';
import moment from 'moment';
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
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={[{flex: 0.8}, style]}>
          <Text style={styles.title}>{task.title}</Text>
          <Text
            style={styles.description}
            numberOfLines={compact === undefined || !compact ? undefined : 2}>
            {task.description}
          </Text>
        </View>
        <View style={{flex: 0.2, justifyContent: 'center'}}>
          <Text style={{fontStyle: 'italic', fontSize: 12}}>
            {moment(task.dueDate).format('MMM D').replace(' ', '. ')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  ) : null;
};

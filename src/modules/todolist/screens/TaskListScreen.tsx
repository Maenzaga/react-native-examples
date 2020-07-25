import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {ApplicationState} from '../../../store';
import {FlatList, ListRenderItemInfo, View} from 'react-native';
import {Task} from '../todo.actions';
import {TaskView, Separator, TaskDetailsModal} from '../../../components';

const keyExtractor = (item: Task, index: number) =>
  `${index}-${item.title}-${item.description}`;

export const TaskListScreen = () => {
  const tasks = useSelector((state: ApplicationState) => state.todos.tasks);
  const [task, setTask] = useState<Task | undefined>();
  const [isModalVisible, setModalVisible] = useState(false);

  const onPress = (task: Task) => {
    setTask(task);
    setModalVisible(true);
  };

  const onModalClosed = () => {
    setModalVisible(false);
  };

  const renderItem = (info: ListRenderItemInfo<Task>) => {
    const {item} = info;
    return (
      <TaskView
        task={item}
        onPress={() => onPress(item)}
        compact
        style={{margin: 8}}
      />
    );
  };

  return (
    <View>
      <TaskDetailsModal
        task={task}
        isVisible={isModalVisible}
        onClose={onModalClosed}
      />
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={() => <Separator />}
      />
    </View>
  );
};

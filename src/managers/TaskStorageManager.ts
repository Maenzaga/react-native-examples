import AsyncStorage from '@react-native-community/async-storage';
import {Task} from '../modules/todolist';

const taskListKey = 'tasks';

class TaskStorageManager {
  getTasks = async (): Promise<Task[]> => {
    return new Promise(async (resolve, reject) => {
      try {
        const tasksJson = await AsyncStorage.getItem(taskListKey);
        const parsedTasks = tasksJson ? JSON.parse(tasksJson) : [];
        resolve(parsedTasks);
      } catch (e) {
        // error reading value
        reject();
      }
    });
  };

  setTasks = async (tasks: Task[]): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        const jsonValue = JSON.stringify(tasks);
        await AsyncStorage.setItem(taskListKey, jsonValue);
        resolve();
      } catch (e) {
        // saving error
        reject();
      }
    });
  };
}

export const taskStoreManager = new TaskStorageManager();

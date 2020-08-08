import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {taskStoreManager} from '../../managers';
import {ApplicationState} from '../../store';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
}

export enum TodoActionTypes {
  TASK_REQUEST = 'TASK_REQUEST',
  SET_TASKS = 'SET_TASKS',
  CLEAR_TASKS = 'CLEAR_TASKS',
}

export interface TaskRequestAction extends Action {
  type: typeof TodoActionTypes.TASK_REQUEST;
  payload: {task: Task};
}

export interface SetTasksAction extends Action {
  type: typeof TodoActionTypes.SET_TASKS;
  payload: {tasks: Task[]};
}

export interface ClearTasksAction extends Action {
  type: typeof TodoActionTypes.CLEAR_TASKS;
}

export type TodoActions = TaskRequestAction | SetTasksAction | ClearTasksAction;

type ThunkResult = ThunkAction<void, ApplicationState, undefined, TodoActions>;

export const getTasks = (): ThunkResult => {
  return async (dispatch) => {
    try {
      const tasks = await taskStoreManager.getTasks();
      dispatch(todoSetTasks(tasks));
    } catch (error) {
      // TODO: Handle error
    }
  };
};

export const addTask = (task: Task): ThunkResult => {
  return async (dispatch, getState) => {
    dispatch(todoTaskRequest(task));
    const currentTasks = getState().todos.tasks;
    const newList = currentTasks.concat(task);
    await taskStoreManager.setTasks(newList);
    dispatch(todoSetTasks(newList));
  };
};

export const editTask = (task: Task): ThunkResult => {
  return async (dispatch, getState) => {
    dispatch(todoTaskRequest(task));
    const currentTasks = getState().todos.tasks;
    let index = 0;
    for (let i = 0; i < currentTasks.length; i++) {
      if (currentTasks[i].id === task.id) {
        index = i;
      }
    }
    dispatch(
      todoSetTasks(
        currentTasks
          .slice(0, index)
          .concat(task)
          .concat(currentTasks.slice(index + 1)),
      ),
    );
  };
};

export const deleteTask = (task: Task): ThunkResult => {
  return async (dispatch, getState) => {
    dispatch(todoTaskRequest(task));
    const currentTasks = getState().todos.tasks;
    dispatch(
      todoSetTasks(
        currentTasks.filter((curTask: Task) => curTask.id !== task.id),
      ),
    );
  };
};

export const clearTasks = (): ThunkResult => {
  return async (dispatch) => {
    await taskStoreManager.setTasks([]);
    dispatch(todoSetTasks([]));
  };
};

export const todoTaskRequest = (task: Task): TodoActions => ({
  type: TodoActionTypes.TASK_REQUEST,
  payload: {task},
});

export const todoSetTasks = (tasks: Task[]): TodoActions => ({
  type: TodoActionTypes.SET_TASKS,
  payload: {tasks},
});

export const todoClearTasks = (): TodoActions => ({
  type: TodoActionTypes.CLEAR_TASKS,
});

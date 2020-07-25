import {Action} from 'redux';

export interface Task {
  title: string;
  description: string;
}

export enum TodoActionTypes {
  ADD_TASK = 'ADD_TASK',
}

export interface AddTaskAction extends Action {
  type: typeof TodoActionTypes.ADD_TASK;
  payload: {task: Task};
}

export type TodoActions = AddTaskAction;

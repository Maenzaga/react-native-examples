import {
  Task,
  TodoActions,
  TodoActionTypes,
  AddTaskAction,
} from './todo.actions';
import {Reducer} from 'redux';

export interface TodoState {
  tasks: Task[];
}

const initialState: TodoState = {
  tasks: [],
};

export const todoReducer: Reducer<TodoState, TodoActions> = (
  state: TodoState = initialState,
  action: TodoActions,
): TodoState => {
  switch (action.type) {
    case TodoActionTypes.ADD_TASK:
      action = action as AddTaskAction;
      const currentList = state.tasks;
      const newTask = action.payload.task;
      return {...state, tasks: currentList.concat(newTask)};
    default:
      return state;
  }
};

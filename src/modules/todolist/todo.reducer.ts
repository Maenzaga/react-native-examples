import {
  Task,
  TodoActions,
  TodoActionTypes,
  SetTasksAction,
} from './todo.actions';
import {Reducer} from 'redux';

export interface TodoState {
  loading: boolean;
  tasks: Task[];
}

const initialState: TodoState = {
  loading: false,
  tasks: [],
};

export const todoReducer: Reducer<TodoState, TodoActions> = (
  state: TodoState = initialState,
  action: TodoActions,
): TodoState => {
  switch (action.type) {
    case TodoActionTypes.TASK_REQUEST:
      console.log('mamawebo');
      return {...state, loading: true};
    case TodoActionTypes.SET_TASKS:
      action = action as SetTasksAction;
      return {...state, loading: false, tasks: action.payload.tasks};
    default:
      return state;
  }
};

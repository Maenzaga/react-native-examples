import {combineReducers, createStore, Store, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {counterReducer} from './counter.reducer';
import {UserState, loginReducer} from './modules/login/login.reducer';
import {TodoState, todoReducer} from './modules/todolist';

export interface ApplicationState {
  counter: number;
  user: UserState;
  todos: TodoState;
}

const configureStore = (): Store<ApplicationState> => {
  const rootReducer = combineReducers<ApplicationState>({
    counter: counterReducer,
    user: loginReducer,
    todos: todoReducer,
  });
  return createStore(rootReducer, applyMiddleware(...[thunk, logger]));
};

export const store: Store<ApplicationState> = configureStore();

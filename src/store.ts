import {combineReducers, createStore, Store, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import {counterReducer} from './counter.reducer';
import {UserState, loginReducer} from './modules/login/login.reducer';

export interface ApplicationState {
  counter: number;
  user: UserState;
}

const configureStore = (): Store<ApplicationState> => {
  const rootReducer = combineReducers<ApplicationState>({
    counter: counterReducer,
    user: loginReducer,
  });
  return createStore(rootReducer, applyMiddleware(logger));
};

export const store: Store<ApplicationState> = configureStore();

import {combineReducers, createStore, Store, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {counterReducer} from './counter.reducer';
import {UserState, loginReducer} from './modules/login/login.reducer';
import {TodoState, todoReducer} from './modules/todolist';
import {SearchReposState} from './modules/github/features/searchRepos/searchRepos.state';
import {searchReposReducer} from './modules/github/features/searchRepos/searchRepos.reducer';
import {SearchUserState as SearchUsersState} from './modules/github/features/searchUsers/searchUsers.state';
import {searchUsersReducer} from './modules/github/features/searchUsers/searchUsers.reducer';
import {
  RepoBranchesState,
  repoBranchesReducer,
} from './modules/github/features/repoBranches';

export interface ApplicationState {
  counter: number;
  user: UserState;
  todos: TodoState;
  searchRepos: SearchReposState;
  searchUsers: SearchUsersState;
  repoBranches: RepoBranchesState;
}

const configureStore = (): Store<ApplicationState> => {
  const rootReducer = combineReducers<ApplicationState>({
    counter: counterReducer,
    user: loginReducer,
    todos: todoReducer,
    searchRepos: searchReposReducer,
    searchUsers: searchUsersReducer,
    repoBranches: repoBranchesReducer,
  });
  return createStore(rootReducer, applyMiddleware(...[thunk]));
};

export const store: Store<ApplicationState> = configureStore();

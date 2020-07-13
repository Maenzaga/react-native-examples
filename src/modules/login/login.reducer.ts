import {Reducer} from 'redux';
import {LoginActions, LoginActionTypes, SetUserAction} from './login.actions';

interface UserInfo {
  username: string;
  password: string;
}

export interface UserState {
  user?: UserInfo;
}

const initialState: UserState = {
  user: undefined,
};

export const loginReducer: Reducer<UserState, LoginActions> = (
  state: UserState = initialState,
  action: LoginActions,
): UserState => {
  switch (action.type) {
    case LoginActionTypes.SET_USER:
      action = action as SetUserAction;
      if (action.payload.username && action.payload.password) {
        return {
          ...state,
          user: {
            username: action.payload.username,
            password: action.payload.password,
          },
        };
      } else {
        return {
          ...state,
          user: undefined,
        };
      }
    default:
      return state;
  }
};

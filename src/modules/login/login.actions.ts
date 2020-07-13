import {Action} from 'redux';

export enum LoginActionTypes {
  SET_USER = 'SET_USER',
}

export interface SetUserAction extends Action {
  type: typeof LoginActionTypes.SET_USER;
  payload: {username: string; password: string};
}

export type LoginActions = SetUserAction;

import {Action} from 'redux';

export enum SignupActionTypes {
  REGISTER = 'REGISTER',
}

export interface RegisterAction extends Action {
  type: typeof SignupActionTypes.REGISTER;
}

export type SignupActions = RegisterAction;

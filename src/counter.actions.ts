import {Action} from 'redux';

export enum ActionTypes {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
}

export interface IncrementAction extends Action {
  type: typeof ActionTypes.INCREMENT;
}

export interface DecrementAction extends Action {
  type: typeof ActionTypes.DECREMENT;
}

export type CounterActions = IncrementAction | DecrementAction;

import {Reducer} from 'redux';
import {CounterActions, ActionTypes} from './counter.actions';

export const counterReducer: Reducer<number, CounterActions> = (
  state: number = 0,
  action: CounterActions,
): number => {
  switch (action.type) {
    case ActionTypes.INCREMENT:
      return state + 1;
    case ActionTypes.DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

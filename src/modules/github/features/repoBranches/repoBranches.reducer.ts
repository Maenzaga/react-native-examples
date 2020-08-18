import {RepoBranchesState} from './repoBranches.state';
import {Reducer} from 'redux';
import {
  RepoBranchesActions,
  RepoBranchesActionTypes,
} from './repoBranches.actions';

const initialState: RepoBranchesState = {isLoading: false};

export const repoBranchesReducer: Reducer<
  RepoBranchesState,
  RepoBranchesActions
> = (
  state: RepoBranchesState = initialState,
  action: RepoBranchesActions,
): RepoBranchesState => {
  switch (action.type) {
    case RepoBranchesActionTypes.REPO_BRANCHES_REQUEST:
      return {...state, isLoading: true};
    case RepoBranchesActionTypes.REPO_BRANCHES_SUCCESS:
      return {...state, isLoading: false};
    default:
      return state;
  }
};

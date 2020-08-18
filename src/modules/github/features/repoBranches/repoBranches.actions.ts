import {Action} from 'redux';
import githubService from '../../api/GitHubService';
import {AxiosResponse} from 'axios';
import {ThunkAction} from 'redux-thunk';
import {RepoBranchesState} from './repoBranches.state';
import {GitHubBranch} from '../../types';

export enum RepoBranchesActionTypes {
  REPO_BRANCHES_REQUEST = 'USER_BRANCHES_REQUEST',
  REPO_BRANCHES_SUCCESS = 'USER_BRANCHES_SUCCESS',
  REPO_BRANCHES_FAIL = 'USER_BRANCHES_FAIL',
}

export interface RepoBranchesRequest extends Action {
  type: typeof RepoBranchesActionTypes.REPO_BRANCHES_REQUEST;
}

export interface RepoBranchesSuccess extends Action {
  type: typeof RepoBranchesActionTypes.REPO_BRANCHES_SUCCESS;
  payload: {branches: GitHubBranch[]};
}

export interface RepoBranchesFail extends Action {
  type: typeof RepoBranchesActionTypes.REPO_BRANCHES_FAIL;
  payload: {error: string};
}

export type RepoBranchesActions =
  | RepoBranchesRequest
  | RepoBranchesSuccess
  | RepoBranchesFail;

export const getRepoBranches = (
  user: string,
  repo: string,
): ThunkAction<void, RepoBranchesState, undefined, RepoBranchesActions> => {
  return async (dispatch) => {
    return githubService
      .getRepoBranches(user, repo)
      .then((response: AxiosResponse<any>) => {
        const responseData = response.data;
        // console.log('ramas', JSON.stringify(responseData));
        dispatch({
          type: RepoBranchesActionTypes.REPO_BRANCHES_SUCCESS,
          payload: {branches: []},
        });
      });
  };
};

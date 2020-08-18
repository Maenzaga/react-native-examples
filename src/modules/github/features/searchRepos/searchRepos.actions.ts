import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {ApplicationState} from '../../../../store';
import githubService from '../../api/GitHubService';
import {AxiosResponse} from 'axios';
import {GitHubRepo} from '../../types';

const mockJson = require('./mocks.json');

export enum SearchReposActionTypes {
  SEARCH_REPOS_REQUEST = 'SEARCH_REPOS_REQUEST',
  SEARCH_REPOS_SUCCESS = 'SEARCH_REPOS_SUCCESS',
  SEARCH_REPOS_FAIL = 'SEARCH_REPOS_FAIL',
  SEARCH_REPOS_RESET = 'SEARCH_REPOS_RESET',
}

export interface SearchReposRequest extends Action {
  type: typeof SearchReposActionTypes.SEARCH_REPOS_REQUEST;
}

export interface SearchReposSuccess extends Action {
  type: typeof SearchReposActionTypes.SEARCH_REPOS_SUCCESS;
  payload: {data: GitHubRepo[]};
}

export interface SearchReposFail extends Action {
  type: typeof SearchReposActionTypes.SEARCH_REPOS_FAIL;
  payload: {error: string};
}

export interface SearchReposReset extends Action {
  type: typeof SearchReposActionTypes.SEARCH_REPOS_RESET;
}

export type SearchReposActions =
  | SearchReposRequest
  | SearchReposSuccess
  | SearchReposFail
  | SearchReposReset;

type ThunkResult = ThunkAction<
  void,
  ApplicationState,
  undefined,
  SearchReposActions
>;

export const searchRepos = (query: string): ThunkResult => {
  return async (dispatch) => {
    dispatch({type: SearchReposActionTypes.SEARCH_REPOS_REQUEST});
    setTimeout(() => {
      dispatch({
        type: SearchReposActionTypes.SEARCH_REPOS_SUCCESS,
        payload: {data: mockJson},
      });
    }, 1500);
    // return githubService
    //   .searchRepos(query)
    //   .then((response: AxiosResponse<any>) => {
    //     const responseData = response.data;
    //     setTimeout(() => {
    //       dispatch({
    //         type: SearchReposActionTypes.SEARCH_REPOS_SUCCESS,
    //         payload: {data: responseData.items},
    //       });
    //     }, 2000);
    //   });
  };
};

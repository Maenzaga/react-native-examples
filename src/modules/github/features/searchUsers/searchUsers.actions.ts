import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {ApplicationState} from '../../../../store';
import githubService from '../../api/GitHubService';
import {AxiosResponse} from 'axios';
import {GitHubUser} from '../../types';

// const mockJson = require('./mocks.json');

export enum SearchUsersActionTypes {
  SEARCH_USERS_REQUEST = 'SEARCH_USERS_REQUEST',
  SEARCH_USERS_SUCCESS = 'SEARCH_USERS_SUCCESS',
  SEARCH_USERS_FAIL = 'SEARCH_USERS_FAIL',
  SEARCH_USERS_RESET = 'SEARCH_USERS_RESET',
}

export interface SearchUsersRequest extends Action {
  type: typeof SearchUsersActionTypes.SEARCH_USERS_REQUEST;
}

export interface SearchUsersSuccess extends Action {
  type: typeof SearchUsersActionTypes.SEARCH_USERS_SUCCESS;
  payload: {data: GitHubUser[]};
}

export interface SearchUsersFail extends Action {
  type: typeof SearchUsersActionTypes.SEARCH_USERS_FAIL;
  payload: {error: string};
}

export interface SearchUsersReset extends Action {
  type: typeof SearchUsersActionTypes.SEARCH_USERS_RESET;
}

export type SearchUsersActions =
  | SearchUsersRequest
  | SearchUsersSuccess
  | SearchUsersFail
  | SearchUsersReset;

type ThunkResult = ThunkAction<
  void,
  ApplicationState,
  undefined,
  SearchUsersActions
>;

export const searchUsers = (query: string): ThunkResult => {
  return async (dispatch) => {
    dispatch({type: SearchUsersActionTypes.SEARCH_USERS_REQUEST});
    // setTimeout(() => {
    //   dispatch({
    //     type: SearchUsersActionTypes.SEARCH_USERS_SUCCESS,
    //     payload: {data: mockJson},
    //   });
    // }, 1500);
    return githubService
      .searchUsers(query)
      .then((response: AxiosResponse<any>) => {
        const responseData = response.data;
        setTimeout(() => {
          dispatch({
            type: SearchUsersActionTypes.SEARCH_USERS_SUCCESS,
            payload: {
              data: responseData.items.map((item: any) => ({
                username: item.login,
                avatar: item.avatar_url,
              })),
            },
          });
        }, 2000);
      });
  };
};

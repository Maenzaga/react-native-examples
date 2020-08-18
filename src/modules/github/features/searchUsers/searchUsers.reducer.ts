import {SearchUserState} from './searchUsers.state';
import {Reducer} from 'redux';
import {
  SearchUsersActions,
  SearchUsersActionTypes,
  SearchUsersSuccess,
} from './searchUsers.actions';

const initialState: SearchUserState = {
  isLoading: false,
};

export const searchUsersReducer: Reducer<
  SearchUserState,
  SearchUsersActions
> = (
  state: SearchUserState = initialState,
  action: SearchUsersActions,
): SearchUserState => {
  switch (action.type) {
    case SearchUsersActionTypes.SEARCH_USERS_REQUEST:
      return {...state, isLoading: true};
    case SearchUsersActionTypes.SEARCH_USERS_SUCCESS:
      action = action as SearchUsersSuccess;
      return {...state, isLoading: false, users: action.payload.data};
    case SearchUsersActionTypes.SEARCH_USERS_RESET:
      return initialState;
    default:
      return state;
  }
};

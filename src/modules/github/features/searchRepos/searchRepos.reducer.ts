import {SearchReposState} from './searchRepos.state';
import {Reducer} from 'redux';
import {
  SearchReposActions,
  SearchReposActionTypes,
  SearchReposSuccess,
} from './searchRepos.actions';

const initialState: SearchReposState = {
  isLoading: false,
};

export const searchReposReducer: Reducer<
  SearchReposState,
  SearchReposActions
> = (
  state: SearchReposState = initialState,
  action: SearchReposActions,
): SearchReposState => {
  switch (action.type) {
    case SearchReposActionTypes.SEARCH_REPOS_REQUEST:
      return {...state, isLoading: true};
    case SearchReposActionTypes.SEARCH_REPOS_SUCCESS:
      action = action as SearchReposSuccess;
      return {...state, isLoading: false, data: action.payload.data};
    case SearchReposActionTypes.SEARCH_REPOS_RESET:
      return initialState;
    default:
      return state;
  }
};

import {GitHubUser} from '../../types';

export interface SearchUserState {
  isLoading: boolean;
  users?: GitHubUser[];
}

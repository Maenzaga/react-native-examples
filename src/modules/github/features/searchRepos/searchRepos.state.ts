import {GitHubRepo} from '../../types';

export interface SearchReposState {
  isLoading: boolean;
  data?: GitHubRepo[];
}

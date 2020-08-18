import {GitHubBranch} from '../../types';

export interface RepoBranchesState {
  isLoading: boolean;
  branches?: GitHubBranch[];
}

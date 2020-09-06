import {useState} from 'react';
import {GitHubRepo} from '../../modules/github/types';
import githubService from '../../modules/github/api/GitHubService';

export const useFetchUserRepos = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [repos, setRepos] = useState<GitHubRepo[] | undefined>();

  const getUserRepos = (username: string) => {
    setIsLoading(true);
    githubService
      .getUserRepos(username)
      .then(({data}) => setRepos(data))
      .catch((err) => console.log('Error', err))
      .finally(() => setIsLoading(false));
  };

  const clearRepos = () => setRepos(undefined);

  return {isLoading, repos, getUserRepos, clearRepos};
};

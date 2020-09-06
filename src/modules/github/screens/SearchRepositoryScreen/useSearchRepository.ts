import {useState} from 'react';
import githubService from '../../api/GitHubService';
import {GitHubRepo} from '../../types';

type ReturnType = {
  isLoading: boolean;
  repos: GitHubRepo[] | undefined;
  searchRepos: (query: string) => void;
};

export const useSearchRepositories = (): ReturnType => {
  const [isLoading, setIsLoading] = useState(false);
  const [repos, setRepos] = useState<GitHubRepo[] | undefined>();

  const searchRepos = (query: string) => {
    setIsLoading(true);
    githubService
      .searchRepos(query)
      .then(({data: {items}}) => setRepos(items))
      .finally(() => setIsLoading(false));
  };

  return {isLoading, repos, searchRepos};
};

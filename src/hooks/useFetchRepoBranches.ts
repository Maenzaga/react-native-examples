import {useState} from 'react';
import githubService from '../modules/github/api/GitHubService';
import {GitHubBranch} from '../modules/github/types';

export const useFetchRepoBranches = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [branches, setBranches] = useState<GitHubBranch[] | undefined>();

  const fetchRepoBranches = (user: string, repo: string) => {
    setIsLoading(true);
    githubService
      .getRepoBranches(user, repo)
      .then(({data}) => {
        setBranches(data);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  };

  const reset = () => {
    setIsLoading(false);
    setBranches(undefined);
  };

  return {isLoading, branches, fetchRepoBranches, reset};
};

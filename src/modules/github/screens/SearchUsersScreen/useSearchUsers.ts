import {useState} from 'react';
import githubService from '../../api/GitHubService';
import {GitHubUser} from '../../types';

type ReturnType = {
  isLoading: boolean;
  users: GitHubUser[] | undefined;
  searchUsers: (query: string) => void;
};

export const useSearchUsers = (): ReturnType => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<GitHubUser[] | undefined>();

  const searchUsers = (query: string) => {
    setIsLoading(true);
    githubService
      .searchUsers(query)
      .then(({data: {items}}) =>
        setUsers(
          items.map((item: any) => ({
            username: item.login,
            avatar: item.avatar_url,
          })),
        ),
      )
      .finally(() => setIsLoading(false));
  };

  return {isLoading, users, searchUsers};
};

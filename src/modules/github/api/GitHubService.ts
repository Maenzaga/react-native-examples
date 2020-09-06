import axios, {AxiosInstance, AxiosResponse} from 'axios';

enum ApiEndpoints {
  'searchRepos' = 'search/repositories',
  'searchUsers' = 'search/users',
}

class GitHubService {
  private axios: AxiosInstance = axios.create({
    baseURL: 'https://api.github.com/',
  });

  searchRepos = (query: string): Promise<AxiosResponse> => {
    return this.axios.get(ApiEndpoints.searchRepos, {
      params: {q: query},
    });
  };

  searchUsers = (query: string): Promise<AxiosResponse> => {
    return this.axios.get(ApiEndpoints.searchUsers, {
      params: {q: query},
    });
  };

  getRepoBranches = (user: string, repo: string): Promise<AxiosResponse> =>
    axios.get(`https://api.github.com/repos/${user}/${repo}/branches`);

  getUserRepos = (user: string): Promise<AxiosResponse> =>
    axios.get(`https://api.github.com/users/${user}/repos`);
}

const githubService = new GitHubService();

export default githubService;

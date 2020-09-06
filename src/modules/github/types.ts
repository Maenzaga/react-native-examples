export type GitHubRepo = {
  name: string;
  description: string;
};

export type GitHubUser = {
  username: string;
  avatar: string;
};

export type GitHubBranch = {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
  protected: boolean;
};

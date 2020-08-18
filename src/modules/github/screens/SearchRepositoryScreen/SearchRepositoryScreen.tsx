import React, {useState} from 'react';
import {View, ListRenderItemInfo, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {ApplicationState} from '../../../../store';
import {
  searchRepos,
  SearchReposActionTypes,
  SearchReposActions,
} from '../../features/searchRepos/searchRepos.actions';
import {GitHubRepo} from '../../types';
import {withGitHubSearch} from '../../../../components';
import {RepoBranchesScreen} from '../RepoBranchesScreen';

export const SearchRepositoryScreen = () => {
  const isLoading = useSelector(
    (state: ApplicationState) => state.searchRepos.isLoading,
  );
  const repos = useSelector(
    (state: ApplicationState) => state.searchRepos.data,
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user, setUser] = useState<string | undefined>(undefined);
  const [repo, setRepo] = useState<string | undefined>(undefined);

  const showModal = (user: string, repo: string) => {
    setUser(user);
    setRepo(repo);
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const renderItem = (info: ListRenderItemInfo<any>) => {
    const repo = info.item;
    return (
      <TouchableOpacity onPress={() => showModal(repo.owner.login, repo.name)}>
        <View style={{paddingVertical: 16}}>
          <Text style={{fontWeight: 'bold'}}>{repo.name}</Text>
          <Text style={{fontStyle: 'italic'}}>{repo.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <WithSearch
      isLoading={isLoading}
      items={repos}
      dispatchingAction={searchRepos}
      cleanupAction={{type: SearchReposActionTypes.SEARCH_REPOS_RESET}}
      renderItem={renderItem}
      renderModal={() => (
        <RepoBranchesScreen
          user={user}
          repo={repo}
          isVisible={isModalVisible}
          onClose={hideModal}
        />
      )}
    />
  );
};

const WithSearch = withGitHubSearch<GitHubRepo, SearchReposActions>();

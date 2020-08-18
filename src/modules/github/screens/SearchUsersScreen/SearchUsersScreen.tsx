import React from 'react';
import {useSelector} from 'react-redux';
import {ApplicationState} from '../../../../store';
import {withGitHubSearch} from '../../../../components';
import {GitHubUser} from '../../types';
import {
  searchUsers,
  SearchUsersActionTypes,
  SearchUsersActions,
} from '../../features/searchUsers/searchUsers.actions';
import {ListRenderItemInfo, View, Image, Text} from 'react-native';

export const SearchUsersScreen = () => {
  const isLoading = useSelector(
    (state: ApplicationState) => state.searchUsers.isLoading,
  );
  const users = useSelector(
    (state: ApplicationState) => state.searchUsers.users,
  );

  const renderItem = (info: ListRenderItemInfo<GitHubUser>) => {
    const {item} = info;
    console.log('item', item);
    return (
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{uri: item.avatar}}
          style={{width: 35, height: 35, borderRadius: 20}}
        />
        <Text style={{alignSelf: 'center'}}>{item.username}</Text>
      </View>
    );
  };

  return (
    <WithSearch
      isLoading={isLoading}
      items={users}
      dispatchingAction={searchUsers}
      cleanupAction={{type: SearchUsersActionTypes.SEARCH_USERS_RESET}}
      renderItem={renderItem}
    />
  );
};

const WithSearch = withGitHubSearch<GitHubUser, SearchUsersActions>();

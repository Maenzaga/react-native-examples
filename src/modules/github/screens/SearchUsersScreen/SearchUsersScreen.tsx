import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {ApplicationState} from '../../../../store';
import {withGitHubSearch, ReposModal} from '../../../../components';
import {GitHubUser} from '../../types';
import {
  searchUsers as searchUsersAction,
  SearchUsersActionTypes,
  SearchUsersActions,
} from '../../features/searchUsers/searchUsers.actions';
import {
  ListRenderItemInfo,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useSearchUsers} from './useSearchUsers';

export const SearchUsersScreen = () => {
  // const isLoading = useSelector(
  //   (state: ApplicationState) => state.searchUsers.isLoading,
  // );
  // const users = useSelector(
  //   (state: ApplicationState) => state.searchUsers.users,
  // );
  const {isLoading, users, searchUsers} = useSearchUsers();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user, setUser] = useState('');

  const renderItem = (info: ListRenderItemInfo<GitHubUser>) => {
    const {item} = info;
    console.log('item', item);
    return (
      <TouchableOpacity
        onPress={() => {
          setUser(item.username);
          setIsModalVisible(true);
        }}>
        <View style={{flexDirection: 'row', padding: 16}}>
          <Image
            source={{uri: item.avatar}}
            style={{width: 40, height: 40, marginRight: 16, borderRadius: 20}}
          />
          <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>
            {item.username}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <WithSearch
        isLoading={isLoading}
        items={users}
        dispatchingAction={searchUsers}
        cleanupAction={{type: SearchUsersActionTypes.SEARCH_USERS_RESET}}
        renderItem={renderItem}
        withRedux={false}
      />
      <ReposModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        user={user}
      />
    </>
  );
};

const WithSearch = withGitHubSearch<GitHubUser, SearchUsersActions>();

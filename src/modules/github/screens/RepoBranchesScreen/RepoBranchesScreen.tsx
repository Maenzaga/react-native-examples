import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import {useFetchRepoBranches} from '../../../../hooks/useFetchRepoBranches';
import {GitHubBranch} from '../../types';

interface RepoBranchesProps {
  user?: string;
  repo?: string;
  isVisible: boolean;
  onClose: () => void;
}

export const RepoBranchesScreen = ({
  user,
  repo,
  isVisible,
  onClose,
}: RepoBranchesProps) => {
  const {
    isLoading,
    branches,
    fetchRepoBranches,
    reset,
  } = useFetchRepoBranches();

  useEffect(() => {
    if (user && repo) {
      fetchRepoBranches(user, repo);
    }
  }, [user, repo]);

  useEffect(() => {
    if (!isVisible) {
      reset();
    }
  }, [isVisible]);

  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}>
      <View
        style={{
          backgroundColor: '#f6f6f6',
          padding: 16,
          borderRadius: 8,
          height: Dimensions.get('screen').height / 2,
        }}>
        {isLoading && (
          <ActivityIndicator
            size="large"
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
          />
        )}
        {branches && !isLoading && (
          <FlatList
            data={branches}
            renderItem={({item}) => (
              <View style={{paddingVertical: 8}}>
                <Text style={{fontSize: 14}}>{item.name}</Text>
              </View>
            )}
            keyExtractor={(_: GitHubBranch, index: number) => index.toString()}
          />
        )}
      </View>
    </Modal>
  );
};

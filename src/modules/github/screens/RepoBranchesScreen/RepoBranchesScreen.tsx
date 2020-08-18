import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {getRepoBranches} from '../../features/repoBranches';
import {ApplicationState} from '../../../../store';

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
  const dispatch = useDispatch();
  const isLoading = useSelector(
    (state: ApplicationState) => state.repoBranches.isLoading,
  );
  const branches = useSelector(
    (state: ApplicationState) => state.repoBranches.branches,
  );

  useEffect(() => {
    console.log('useEffect');
    if (user && repo) {
      console.log('holaaa');
      dispatch(getRepoBranches(user, repo));
    }
  }, [user, repo]);

  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}>
      <View style={{backgroundColor: '#f6f6f6', padding: 16, borderRadius: 8}}>
        <Text>Hello World</Text>
      </View>
    </Modal>
  );
};

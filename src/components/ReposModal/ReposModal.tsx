import React, {useEffect} from 'react';
import Modal from 'react-native-modal';
import {View, ActivityIndicator, Text, FlatList} from 'react-native';
import {useFetchUserRepos} from './useFetchUserRepos';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {interpolate, Extrapolate} from 'react-native-reanimated';
import {useValue, onScrollEvent} from 'react-native-redash';
import {GitHubRepo} from '../../modules/github/types';
import {Separator} from '../Separator';

interface ReposModalProps {
  user: string;
  isVisible: boolean;
  onClose: () => void;
}

const minHeight = 50;
const maxHeight = 100;
const minFontSize = 12;
const maxFontSize = 24;
const scrollDistance = maxHeight - minHeight;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const AnimatedText = Animated.createAnimatedComponent(Text);

export const ReposModal = (props: ReposModalProps) => {
  const {user, isVisible, onClose} = props;
  const {isLoading, repos, getUserRepos, clearRepos} = useFetchUserRepos();
  const y = useValue(0);
  const onScroll = onScrollEvent({y});
  const onlyPositiveY = interpolate(y, {
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });
  const interpolatedHeight = interpolate(y, {
    inputRange: [0, scrollDistance],
    outputRange: [maxHeight, minHeight],
    extrapolateRight: Extrapolate.CLAMP,
  });
  const interpolatedFontSize = interpolate(y, {
    inputRange: [0, scrollDistance],
    outputRange: [maxFontSize, minFontSize],
    extrapolateRight: Extrapolate.CLAMP,
  });
  const interpolatedOpacity = interpolate(y, {
    inputRange: [0, scrollDistance],
    outputRange: [1, 0],
    extrapolateRight: Extrapolate.CLAMP,
  });

  useEffect(() => {
    if (isVisible) {
      getUserRepos(user);
    }
  }, [user, isVisible]);

  const closeModal = () => {
    onClose();
    clearRepos();
  };

  return (
    <Modal
      style={{height: 500}}
      isVisible={isVisible}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}>
      {/* <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}> */}
      <View
        style={{
          height: 500,
          backgroundColor: '#fff',
          marginVertical: 36,
          borderRadius: 8,
        }}>
        {isLoading && <ActivityIndicator size="large" color="#add8e6" />}
        {repos && (
          <>
            <Animated.View
              style={{
                height: interpolatedHeight,
                backgroundColor: '#add8e6',
                alignItems: 'center',
                justifyContent: 'center',
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                position: 'absolute',
                left: 0,
                right: 0,
                zIndex: 2,
                opacity: interpolatedOpacity,
              }}>
              <AnimatedText
                style={{
                  fontSize: interpolatedFontSize,
                  textAlign: 'center',
                }}>
                {`${user}'s repositories`}
              </AnimatedText>
            </Animated.View>
            <AnimatedFlatList
              // bounces={false}
              contentContainerStyle={{paddingTop: maxHeight}}
              scrollEventThrottle={16}
              onScroll={onScroll}
              data={repos}
              renderItem={({item}) => (
                <View style={{padding: 16}}>
                  <Text style={{fontSize: 16}}>{item.name}</Text>
                  {item.description && (
                    <Text style={{fontStyle: 'italic', marginTop: 8}}>
                      {item.description}
                    </Text>
                  )}
                </View>
              )}
              keyExtractor={(item: GitHubRepo) => item.name}
              ItemSeparatorComponent={() => <Separator />}
            />
          </>
        )}
      </View>
      {/* </SafeAreaView> */}
    </Modal>
  );
};

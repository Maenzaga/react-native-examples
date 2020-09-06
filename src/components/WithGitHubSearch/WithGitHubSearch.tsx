import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  TextInput,
  ActivityIndicator,
  FlatList,
  ListRenderItem,
} from 'react-native';
import {Action} from 'redux';
import {useDispatch} from 'react-redux';
import {debounce} from 'lodash';
import styles from './styles';
import {Separator} from '../Separator';

type DispatchingAction = (query: string) => void;

type HocProps<T extends object | undefined, A extends Action> = {
  isLoading: boolean;
  items: T[];
  cleanupAction: A;
  withRedux: boolean;
  dispatchingAction: DispatchingAction;
  renderItem: ListRenderItem<T>;
  renderModal?: () => React.ReactNode;
};

type WithGitHubSearchProps<
  T extends object | undefined,
  A extends Action
> = HocProps<T, A>;

const debouncingTime = 800;

const ItemSeparator = () => <Separator />;

export const withGitHubSearch = <
  T extends object = {},
  A extends Action = Action
>() => {
  return (props: WithGitHubSearchProps<T, A>) => {
    const {
      isLoading,
      items,
      withRedux,
      dispatchingAction,
      cleanupAction,
      renderItem,
      renderModal,
    } = props;
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
      return () => {
        dispatch(cleanupAction);
      };
    }, []);

    const triggerSearch = (query: string) => {
      withRedux ? dispatch(dispatchingAction(query)) : dispatchingAction(query);
    };

    const debouncedSearch = useCallback(
      debounce(triggerSearch, debouncingTime),
      [],
    );

    const onQueryChanged = (text: string) => {
      setQuery(text);
      debouncedSearch(text);
    };

    const keyExtractor = (item: T, index: number) => index.toString();

    return (
      <View style={styles.container}>
        <TextInput
          value={query}
          placeholder="Type something here..."
          onChangeText={onQueryChanged}
          style={{margin: 16}}
        />
        {isLoading && (!items || items.length === 0) ? (
          <ActivityIndicator
            size="large"
            color="#add8e6"
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          />
        ) : null}
        {items ? (
          <FlatList
            style={{marginTop: 16}}
            data={items}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={ItemSeparator}
          />
        ) : null}
        {renderModal && renderModal()}
      </View>
    );
  };
};

import React, {FC, useEffect, useState} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import {PokemonList, PokemonUrl} from '../../interfaces';
import {ActivityIndicator} from 'react-native-paper';

const INITIAL_URL = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0';
const ITEM_HEIGHT = 386;

const HomeScreen: FC = () => {
  const [pokemon, setPokemon] = useState<PokemonUrl[]>([]);
  const [url, setUrl] = useState<string>(INITIAL_URL);
  const [nextUrl, setNextUrl] = useState<string>('');
  const [nextList, setNextList] = useState<PokemonUrl[]>([]);
  const [loadMore, setLoadMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    if (url || refresh) {
      setIsLoading(true);
      setRefresh(false);
      fetch(url)
        .then(res => res.json())
        .then((response: PokemonList) => {
          setNextUrl(response.next);
          setNextList(response.results);
          setIsLoading(false);
        });
    }
  }, [url, refresh]);

  useEffect(() => {
    if (loadMore && nextList.length > 0) {
      const list = pokemon.concat(nextList);
      setPokemon(list);
      setLoadMore(false);
      setNextList([]);
    }
  }, [loadMore, nextList, pokemon]);

  const getItemLayout = (
    data: PokemonUrl[] | null | undefined,
    index: number,
  ) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  return (
    <SafeAreaView>
      <FlatList
        data={pokemon}
        renderItem={({item}: {item: PokemonUrl}) => {
          return <PokemonCard url={item.url} key={item.name} />;
        }}
        onEndReached={() => {
          setLoadMore(true);
          setUrl(nextUrl);
        }}
        getItemLayout={getItemLayout}
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        onEndReachedThreshold={0.2}
        onRefresh={() => {
          setPokemon([]);
          setNextList([]);
          setTimeout(() => {
            setRefresh(true);
            setLoadMore(true);
            setUrl(INITIAL_URL);
          }, 500);
        }}
        refreshing={isLoading}
        ListFooterComponent={() => {
          if (isLoading) {
            return <ActivityIndicator />;
          }

          return null;
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

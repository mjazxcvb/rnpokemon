import React, {FC, useEffect, useState} from 'react';
import {Card, Text} from 'react-native-paper';
import {Abilities, Pokemon} from '../../interfaces';
import PokemonAttributes from './PokemonAttributes';
import {StyleSheet, View} from 'react-native';
import PokemonTypes from './PokemonTypes';
import {SegmentedButtons} from 'react-native-paper';

interface Props {
  url: string;
}

const PokemonCard: FC<Props> = ({url}) => {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [pokemonImage, setPokemonImage] = useState<string>();
  const [view, setView] = useState<string>('front');

  useEffect(() => {
    if (url) {
      fetch(url)
        .then(res => res.json())
        .then((value: Pokemon) => {
          setPokemon(value);
          setPokemonImage(value.sprites.front_default);
        });
    }
  }, [url]);

  useEffect(() => {
    if (view === 'front') {
      setPokemonImage(pokemon?.sprites.front_default);
    } else {
      setPokemonImage(pokemon?.sprites.back_default);
    }
  }, [view, pokemon]);

  if (!pokemon?.name) {
    return null;
  }

  const getAbilites = (abilites: Abilities[]) =>
    abilites.map(item => item.ability.name).toString();

  return (
    <Card style={styles.main} mode="elevated">
      <Card.Cover resizeMode="contain" source={{uri: pokemonImage}} />
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleLarge">{pokemon?.name}</Text>

          <SegmentedButtons
            style={styles.buttons}
            value={view}
            onValueChange={setView}
            density="small"
            buttons={[
              {
                value: 'front',
                label: 'Front',
              },
              {
                value: 'back',
                label: 'Back',
              },
            ]}
          />
        </View>

        <View style={styles.content}>
          <PokemonTypes types={pokemon?.types} />
          <PokemonAttributes
            label="Abilities"
            value={`${getAbilites(pokemon.abilities)}`}
          />
          <PokemonAttributes
            label="Height"
            value={`${pokemon?.height * 10} cm`}
          />
          <PokemonAttributes
            label="Weight"
            value={`${pokemon?.weight / 10} kg`}
          />
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingVertical: 10,
    margin: 5,
  },
  content: {
    marginTop: 5,
  },
  header: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  buttons: {
    width: '40%',
  },
});

export default PokemonCard;

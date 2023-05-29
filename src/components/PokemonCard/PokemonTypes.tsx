import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {Types} from '../../interfaces';
import {typeColors} from '../../constants';

interface Props {
  types?: Types[];
}

const PokemonTypes: FC<Props> = ({types}) => {
  return (
    <View style={styles.main}>
      {types?.map(item => {
        const color = item.type.name;
        return (
          <View style={{...styles.type, backgroundColor: typeColors[color]}}>
            <Text
              variant="titleMedium"
              style={styles.value}
              key={item.type.name}>
              {item.type.name}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  label: {
    paddingRight: 5,
  },
  value: {
    color: 'white',
  },
  type: {
    borderRadius: 5,
    paddingHorizontal: 5,
    marginRight: 2,
  },
});

export default PokemonTypes;

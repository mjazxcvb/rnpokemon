import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

interface Props {
  label: string;
  value: string;
}

const PokemonAttributes: FC<Props> = ({label, value}) => {
  return (
    <View style={styles.main}>
      <Text variant="labelLarge" style={styles.label}>
        {`${label}:`}
      </Text>
      <Text variant="bodyMedium">{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
  },
  label: {
    paddingRight: 5,
  },
});

export default PokemonAttributes;

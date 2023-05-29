import {useNavigation} from '@react-navigation/core';
import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useAppContext} from '../../context';
import {APP_LOGOUT} from '../../store/actions';

const ConfirmationScreen: FC = () => {
  const navigation = useNavigation();
  const {dispatch} = useAppContext();
  return (
    <View style={styles.main}>
      <Text variant="titleLarge">Are you sure?</Text>
      <View style={styles.actions}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate('Home');
            }
          }}>
          Cancel
        </Button>
        <Button
          mode="outlined"
          style={styles.button}
          onPress={() => {
            dispatch({type: APP_LOGOUT});
          }}>
          Log out
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  button: {
    marginHorizontal: 10,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
  },
});

export default ConfirmationScreen;

import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Button, Menu} from 'react-native-paper';
import {useAppContext} from '../../context';
import {useNavigation} from '@react-navigation/core';

const CustomMenu = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const onLogout = () => {
    navigation.navigate('Confirmation');
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchorPosition="bottom"
      anchor={
        <Button onPress={openMenu}>
          <Image
            style={styles.button}
            source={require('../../assets/kebab.png')}
            resizeMode="contain"
          />
        </Button>
      }>
      <Menu.Item onPress={onLogout} title="Log out" />
    </Menu>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 20,
    tintColor: 'white',
  },
});

export default CustomMenu;

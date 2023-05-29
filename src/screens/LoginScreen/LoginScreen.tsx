import React, {FC, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, HelperText, Text, TextInput} from 'react-native-paper';
import {validateEmail} from '../../utils';
import {errorMessage} from '../../constants';
import {useAppContext} from '../../context';
import {APP_LOGIN} from '../../store/actions';
import {useNavigation} from '@react-navigation/core';

const LoginScreen: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  const {state, dispatch} = useAppContext();
  const navigation = useNavigation();

  const resetForm = () => {
    setEmailError('');
    setPasswordError('');
    setFormError('');
  };

  const onSubmit = () => {
    resetForm();
    const fieldErrors = !validateEmail(email) || password.trim() === '';

    if (!validateEmail(email)) {
      setEmailError(errorMessage.email);
    }

    if (password.trim() === '') {
      setPasswordError(errorMessage.empty);
    }

    if (
      !fieldErrors &&
      state?.users.filter(
        user => user.email === email || user.password === password,
      ).length === 0
    ) {
      setFormError(errorMessage.noMatch);

      return;
    }

    dispatch({
      type: APP_LOGIN,
      payload: {
        email,
        password,
      },
    });
  };

  return (
    <SafeAreaView>
      <View style={styles.content}>
        {formError && <HelperText type="error">{formError}</HelperText>}
        <View>
          <TextInput
            textContentType="emailAddress"
            style={styles.input}
            mode="outlined"
            label={'Email'}
            autoCapitalize="none"
            value={email}
            onChangeText={value => setEmail(value)}
            error={!!emailError || !!formError}
          />
          {emailError && <HelperText type="error">{emailError}</HelperText>}
        </View>
        <View>
          <TextInput
            style={styles.input}
            mode="outlined"
            label={'Password'}
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={value => setPassword(value)}
            error={!!passwordError || !!formError}
          />
          {passwordError && (
            <HelperText type="error">{passwordError}</HelperText>
          )}
        </View>

        <Button style={styles.button} mode="contained" onPress={onSubmit}>
          Log in
        </Button>

        <View style={styles.footer}>
          <Text style={styles.footerText}>New User? </Text>
          <Button
            style={styles.button}
            mode="text"
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            Sign Up
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: '20%',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignContent: 'center',
  },
  input: {
    marginVertical: 2,
  },
  button: {
    marginTop: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    marginTop: 20,
  },
});

export default LoginScreen;

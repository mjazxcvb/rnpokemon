import React, {FC, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, HelperText, TextInput} from 'react-native-paper';
import {validateEmail} from '../../utils';
import {errorMessage} from '../../constants';
import {useAppContext} from '../../context';
import {REGISTER} from '../../store/actions';

const SignUpScreen: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  const {state, dispatch} = useAppContext();

  const resetForm = () => {
    setEmailError('');
    setPasswordError('');
    setFormError('');
  };

  const onSubmit = () => {
    resetForm();
    const emailExists =
      state?.users.filter(user => user.email === email).length !== 0;
    const hasPasswordError =
      password.trim() === '' || password.trim().length < 6;
    const fieldErrors =
      !validateEmail(email) || hasPasswordError || emailExists;

    if (!validateEmail(email)) {
      setEmailError(errorMessage.email);
    }

    if (hasPasswordError) {
      setPasswordError(errorMessage.password);
    }

    if (emailExists) {
      setEmailError(errorMessage.emailExists);
    }

    if (fieldErrors) {
      return;
    }

    dispatch({
      type: REGISTER,
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
          Sign Up
        </Button>
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
});

export default SignUpScreen;

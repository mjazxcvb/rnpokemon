import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/HomeScreen';
import Login from '../screens/LoginScreen';
import {useAppContext} from '../context';
import CustomMenu from '../components/CustomMenu/CustomMenu';
import Confirmation from '../screens/ConfirmationScreen';
import SignUp from '../screens/SignUpScreen/SignUpScreen';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  Confirmation: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigator = () => {
  const {state} = useAppContext();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FB1B1B',
          },
          headerTitleStyle: {
            color: 'white',
          },
          headerTintColor: 'white',
          headerRight: () =>
            state?.loggedInUser?.email ? <CustomMenu /> : null,
        }}
        initialRouteName="Home">
        {state?.loggedInUser?.email ? (
          <Stack.Group>
            <Stack.Screen
              options={{headerTitle: 'Pokemon'}}
              name="Home"
              component={Home}
            />
            <Stack.Screen
              options={{presentation: 'modal', headerRight: undefined}}
              name="Confirmation"
              component={Confirmation}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen
              options={{headerTitle: 'Log in'}}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={{headerTitle: 'Sign Up'}}
              name="SignUp"
              component={SignUp}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

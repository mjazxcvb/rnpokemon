/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import AppContextProvider from './src/context';
import Navigator from './src/navigation';
import {Provider as PaperProvider} from 'react-native-paper';
import {theme} from './theme';

const App = () => {
  return (
    <AppContextProvider>
      <PaperProvider theme={theme}>
        <Navigator />
      </PaperProvider>
    </AppContextProvider>
  );
};

export default App;

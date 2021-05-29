/**
 * @format
 */

import React from 'react';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

//importando as bibliotecas do native paper
import {Provider as PaperProvider} from 'react-native-paper';

//importando as bibliotecas do native paper
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import authReducers from './reducers/authReducers';

//registrando os reducers do projeto
const rootReducer = combineReducers({
  auth: authReducers, //registrando reducer de autenticação (signin e signout)
});

//criando a Store do aplicativo (memoria)
const store = createStore(rootReducer);

//função para 'montar o app'

export default function Main() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);

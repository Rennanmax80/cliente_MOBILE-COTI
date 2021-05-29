import React from 'react';

import Login from './views/Login';
import Dashboard from './views/Dashboard';
import CadastroClientes from './views/CadastroClientes';
import ConsultaClientes from './views/ConsultaClientes';
import EdicaoClientes from './views/EdicaoClientes';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="dashboard" component={Dashboard} />
        <Stack.Screen name="CadastroClientes" component={CadastroClientes} />
        <Stack.Screen name="ConsultaClientes" component={ConsultaClientes} />
        <Stack.Screen name="EdicaoClientes" component={EdicaoClientes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

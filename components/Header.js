import React from 'react';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export default function Header() {
  const navigation = useNavigation();

  return (
    <Appbar.Header>
      <Appbar.Content title="Controle de Clientes" />
      <Appbar.Action
        style={{marginRight: -6}}
        icon="chart-pie"
        onPress={() => navigation.navigate('dashboard')}
      />
      <Appbar.Action
        style={{marginRight: -6}}
        icon="account-plus"
        onPress={() => navigation.navigate('CadastroClientes')}
      />
      <Appbar.Action
        style={{marginRight: -6}}
        icon="format-list-bulleted-square"
        onPress={() => navigation.navigate('ConsultaClientes')}
      />
      <Appbar.Action
        icon="exit-to-app"
        onPress={() => navigation.navigate('login')}
      />
    </Appbar.Header>
  );
}

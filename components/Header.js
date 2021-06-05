/* eslint-disable prettier/prettier */
import React from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { signOut } from '../actions/authActions';
import { Alert } from 'react-native';

export default function Header() {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const logout = () => {
        Alert.alert(
            'Encerrar Sessão',
            'Deseja realmente sair do aplicativo?',
            [
                {
                    text: 'Cancelar',
                    onPress: () => { },
                    style: 'cancel',
                },
                {
                    text: 'Confirmar',
                    onPress: () => {
                        dispatch(signOut());
                        navigation.navigate('login');
                    },
                },
            ]
        );
    };

    return (
        <Appbar.Header>
            <Appbar.Content
                title="Controle de Clientes"
            />
            <Appbar.Action
                style={{ marginRight: -6 }}
                icon="chart-pie"
                onPress={() => navigation.navigate('dashboard')}
            />
            <Appbar.Action
                style={{ marginRight: -6 }}
                icon="account-plus"
                onPress={() => navigation.navigate('CadastroClientes')}
            />
            <Appbar.Action
                style={{ marginRight: -6 }}
                icon="format-list-bulleted-square"
                onPress={() => navigation.navigate('ConsultaClientes')}
            />
            <Appbar.Action
                icon="exit-to-app"
                onPress={() => logout()}
            />
        </Appbar.Header>
    );
}


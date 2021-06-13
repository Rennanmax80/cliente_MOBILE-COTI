/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-native-paper';
import { Alert, ScrollView, Text, View } from 'react-native';
import * as services from '../services/clienteServices';
import { useSelector } from 'react-redux';
import Header from '../components/Header';


import {useNavigation} from '@react-navigation/native';

export default function ConsultaClientes() {

    const [clientes, setClientes] = useState([]);
    const accessToken = useSelector(state => state.auth.accessToken);

    const navigation = useNavigation();

    const consultarClientes = () => {
        services.getAll(accessToken)
            .then(
                data => {
                    setClientes(data);
                }
            )
            .catch(
                e => {
                    Alert.alert('Erro!');
                }
            );
    };

    const excluirCliente = (item) => {
        Alert.alert(
            'Exclusão de Cliente',
            `Deseja excluir o cliente ${item.nome}?`,
            [
                {
                    text : 'Cancelar',
                    onPress: () => {},
                    style: 'cancel',
                },
                {
                    text : 'Confirmar',
                    onPress: () => {
                        services.remove(item.id, accessToken)
                            .then(
                                data => {
                                    Alert.alert('Sucesso!', data);
                                    consultarClientes();
                                }
                            )
                            .catch(
                                e => {
                                    Alert.alert('Erro!');
                                }
                            );
                    },
                },
            ]
        );
    };

    useEffect(() => {
        consultarClientes();
    });

    return (
        <ScrollView style={{backgroundColor: '#fff'}}>
            <Header />
            <Card>
                <Card.Title
                    title="Consulta de Clientes"
                    subtitle="Listagem de clientes cadastrados"
                />
                <Card.Content>
                    <View>
                        <Text>
                            Quantidade de clientes: {clientes.length}
                        </Text>
                    </View>
                    {
                        clientes.map(
                            function (item, i) {
                                return (
                                    <Card key={i}>
                                        <Card.Content>
                                            <View>
                                                <Text style={{
                                                    fontSize: 15,
                                                    fontWeight: 'bold',
                                                }}>
                                                    {item.nome}
                                                </Text>
                                            </View>
                                            <View>
                                                <Text>
                                                    {item.email}
                                                </Text>
                                            </View>
                                            <View>
                                                <Text>
                                                    Cadastrado em: {item.dataCadastro}
                                                </Text>
                                            </View>
                                            <View>
                                                <Text>
                                                    Modificado em: {item.dataUltimaAlteracao}
                                                </Text>
                                            </View>
                                        </Card.Content>
                                        <Card.Actions>
                                            <Button icon="lead-pencil" mode="text"
                                            onPress={() => navigation.navigate('EdicaoClientes', {item}) }
                                            >
                                                Editar
                                            </Button>
                                            <Button icon="delete" mode="text" color="#d9534f"
                                                onPress={
                                                    () => excluirCliente(item)
                                                }>
                                                Excluir
                                            </Button>
                                        </Card.Actions>
                                    </Card>
                                );
                            }
                        )
                    }
                </Card.Content>
            </Card>
        </ScrollView>
    );
}



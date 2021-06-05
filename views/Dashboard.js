/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Alert, ScrollView } from 'react-native';
import { Card, DataTable } from 'react-native-paper';
import Header from '../components/Header';
import * as services from '../services/clienteServices';
import { useSelector } from 'react-redux';

export default function Dashboard() {

    //declarando o state do componente
    const [historico, setHistorico] = useState([]);

    //lendo o token do usuario autenticado (authReducers)
    const accessToken = useSelector(state => state.auth.accessToken);

    //função Hook equivalente ao componentDidMount
    useEffect(() => {
        services.getHistorico(accessToken)
            .then(
                data => {
                    setHistorico(data);
                }
            )
            .catch(
                e => {
                    Alert.alert('Erro!', e.response.status.toString());
                }
            );
    }, []);

    return (
        <ScrollView style={{
            backgroundColor: '#fff',
        }}>
            <Header />
            <Card>
                <Card.Title
                    title="Painel Principal"
                    subtitle="Histórico de Clientes cadastrados"
                />
                <Card.Content>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Data de Cadastro</DataTable.Title>
                            <DataTable.Title numeric>Qtd de Clientes</DataTable.Title>
                        </DataTable.Header>

                        {
                            historico.map(
                                function (item, i) {
                                    return (
                                        <DataTable.Row key={i}>
                                            <DataTable.Cell>{item.name}</DataTable.Cell>
                                            <DataTable.Cell numeric>{item.data}</DataTable.Cell>
                                        </DataTable.Row>

                                    );
                                }
                            )
                        }

                    </DataTable>
                </Card.Content>
            </Card>
        </ScrollView>
    );
}

/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Button, Card, TextInput } from 'react-native-paper';
import { Alert, ScrollView, Text, View } from 'react-native';
import * as services from '../services/clienteServices';
import { useSelector } from 'react-redux';
import Header from '../components/Header';

export default function CadastroClientes() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');

    const [mensagem, setMensagem] = useState('');
    const [erros, setErros] = useState({});

    const accessToken = useSelector(state => state.auth.accessToken);

    const cadastrar = () => {

        setMensagem('');
        setErros({});

        services.post({
            nome, email,
        }, accessToken)
            .then(
                data => {
                    setMensagem(data);

                    setNome('');
                    setEmail('');
                }
            )
            .catch(
                e => {
                    var result = e.response;
                    switch (result.status) {
                        case 400: //BAD REQUEST (validação)
                            setErros(result.data.errors);
                            break;

                        default:
                            Alert.alert('Erro!');
                            break;
                    }
                }
            );

    };

    return (
        <ScrollView>
            <Header />
            <Card>
                <Card.Title
                    title="Cadastro de Clientes"
                    subtitle="Preencha os campos para incluir um cliente."
                />
                <Card.Content>

                    {
                        mensagem ? (
                            <View style={{ marginBottom: 20 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#5cb85c' }}>
                                    {mensagem}
                                </Text>
                            </View>
                        ) : (
                            <View />
                        )
                    }

                    <View style={{ marginBottom: 20 }}>
                        <TextInput
                            label="Nome do Cliente:"
                            keyboardType="default"
                            autoCompleteType="name"
                            mode="outlined"
                            value={nome}
                            onChangeText={value => setNome(value)}
                        />
                        {
                            erros.Nome ? (
                                <View style={{ marginBottom: 20 }}>
                                    {
                                        erros.Nome.map(
                                            (item, i) => (
                                                <View key={i}>
                                                    <Text style={{
                                                        fontSize: 14, color: '#d9534f',
                                                    }}>
                                                        {item}
                                                    </Text>
                                                </View>
                                            )
                                        )
                                    }
                                </View>
                            ) : (
                                <View />
                            )
                        }
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <TextInput
                            label="Email do Cliente:"
                            keyboardType="email-address"
                            autoCompleteType="email"
                            mode="outlined"
                            value={email}
                            onChangeText={value => setEmail(value)}
                        />
                        {
                            erros.Email ? (
                                <View style={{ marginBottom: 20 }}>
                                    {
                                        erros.Email.map(
                                            (item, i) => (
                                                <View key={i}>
                                                    <Text style={{
                                                        fontSize: 14, color: '#d9534f',
                                                    }}>
                                                        {item}
                                                    </Text>
                                                </View>
                                            )
                                        )
                                    }
                                </View>
                            ) : (
                                <View />
                            )
                        }
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <Button mode="contained" icon="check-circle"
                            onPress={() => cadastrar()}>
                            Realizar Cadastro
                        </Button>
                    </View>

                </Card.Content>
            </Card>
        </ScrollView >
    );
}



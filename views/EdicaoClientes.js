import React, {useState, useEffect} from 'react';
import {ScrollView, Text, View, Alert} from 'react-native';
import {Card, TextInput, Button} from 'react-native-paper';

import {useSelector} from 'react-redux';
import * as services from '../services/clienteServices';
import Header from '../components/Header';

export default function EdicaoClientes({route}) {
  //declarando as variáveis de state do componente
  const [idCliente, setIdCliente] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataCadastro, setDataCadastro] = useState('');
  const [dataUltimaAlteracao, setDataUltimaAlteracao] = useState('');

  const [mensagem, setMensagem] = useState('');
  const [erros, setErros] = useState({});

  const accessToken = useSelector(state => state.auth.accessToken);

  //função hook para simular o componentDidMount e componentDidUpdate
  useEffect(() => {
    var cliente = route.params.item;

    //armazenando os dados do cliente no state
    setIdCliente(cliente.id);
    setNome(cliente.nome);
    setEmail(cliente.email);
    setDataCadastro(cliente.dataCadastro);
    setDataUltimaAlteracao(cliente.dataUltimaAlteracao);
  }, []);

  //função para atualizar os dados do cliente
  const atualizar = () => {
    setMensagem('');
    setErros({});

    // eslint-disable-next-line prettier/prettier
    services.put(
        {
          idCliente,
          nome,
          email,
        },
        accessToken,
      )
      .then(data => {
        setMensagem(data);
      })
      .catch(e => {
        var result = e.response;

        switch (result.status) {
          case 400:
            setErros(result.data.errors);
            break;

          default:
            Alert.alert('Erro ao atualizar cliente');
            break;
        }
      });
  };

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <Header />
      <Card>
        <Card.Title
          title="Atualizar dados do cliente"
          subtitle="Utiliza os campos para editar o cliente"
        />
        <Card.Content>
          {mensagem ? (
            <View style={{marginBottom: 20}}>
              <Text
                style={{fontSize: 18, fontWeight: 'bold', color: '#5cb85c'}}>
                {mensagem}
              </Text>
            </View>
          ) : (
            <View />
          )}

          <View style={{marginBottom: 20}}>
            <TextInput
              label="Nome do Cliente:"
              keyboardType="default"
              autoCompleteType="name"
              mode="outlined"
              value={nome}
              onChangeText={value => setNome(value)}
            />
            {erros.Nome ? (
              <View style={{marginBottom: 20}}>
                {erros.Nome.map((item, i) => (
                  <View key={i}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#d9534f',
                      }}>
                      {item}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <View />
            )}
          </View>

          <View style={{marginBottom: 20}}>
            <TextInput
              label="Email do Cliente:"
              keyboardType="email-address"
              autoCompleteType="email"
              mode="outlined"
              value={email}
              onChangeText={value => setEmail(value)}
            />
            {erros.Email ? (
              <View style={{marginBottom: 20}}>
                {erros.Email.map((item, i) => (
                  <View key={i}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#d9534f',
                      }}>
                      {item}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <View />
            )}
          </View>

          <View style={{marginBottom: 20}}>
            <Text>Data de Cadastro: {dataCadastro}</Text>
          </View>
          <View style={{marginBottom: 20}}>
            <Text>Data da Ultima alteração: {dataUltimaAlteracao}</Text>
          </View>

          <View style={{marginBottom: 20}}>
            <Button
              mode="contained"
              icon="check-circle"
              onPress={() => atualizar()}>
              Salvar alterações
            </Button>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

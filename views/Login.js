import React, {useState} from 'react';
import {Alert, ScrollView, Text, View} from 'react-native';
import {Button, Card, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import * as services from '../services/authServices';

export default function Login() {
  //função para utilizar a navegação dos componentes
  const navigation = useNavigation();

  //declarando as variaveis e funções para captura de cada campo da tela..
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  //declarando as variaveis e funções para captura de cada campo da tela
  const [mensagem, setMensagem] = useState('');
  const [erros, setErros] = useState({});

  //função executada ao pressionar o botão..
  const handleButtonPress = () => {
    //limpar mensagem e erros
    setMensagem('');
    setErros({});

    //realizar a chamada para a API
    // eslint-disable-next-line prettier/prettier
    services.post({email, senha }).then(
        data => {
          Alert.alert('Seja bem vindo ao aplicativo!', data.mensagem);

          navigation.navigate('dashboard');
        },
        //navegar para tela de dashborad
      )
      .catch(e => {
        var result = e.response;
        switch (result.status) {
          case 400:
            setErros(result.data.errors);
            break;

          case 401:
            setMensagem(result.data);
            break;
        }
      });
  };

  return (
    <ScrollView style={{backgroundColor: '#FFF'}}>
      <Card>
        <Card.Cover
          source={{
            uri: 'https://newtrade.com.br/wp-content/uploads/2017/04/business-people-16-04.jpg',
          }}
        />
        <Card.Title
          title="Acesso de Usuário"
          subtitle="Informe seus dados para acessar o aplicativo"
          style={{
            backgroundColor: '#FFF',
          }}
        />
      </Card>
      <Card.Content>
        <View style={{margin: 20}}>
          {mensagem ? (
            <View style={{marginBottom: 20}}>
              <Text
                style={{fontSize: 16, fontWeight: 'bold', color: '#d9534f'}}>
                {mensagem}
              </Text>
            </View>
          ) : (
            <View />
          )}
          <TextInput
            label="Email do usuário"
            keyboardType="email-address"
            autoCompleteType="email"
            mode="outlined"
            value={email}
            onChangeText={e => setEmail(e)}
          />
          <View
            style={{
              marginBottom: 20,
            }}>
            {erros.Email ? (
              erros.Email.map((value, i) => (
                <View key={i}>
                  <Text style={{color: '#d9534f', fontSize: 14}}>{value}</Text>
                </View>
              ))
            ) : (
              <View />
            )}
          </View>

          <TextInput
            label="Senha de acesso"
            keyboardType="default"
            secureTextEntry={true}
            mode="outlined"
            style={{
              marginBottom: 20,
            }}
            value={senha}
            onChangeText={e => setSenha(e)}
          />

          <View
            style={{
              marginBottom: 20,
            }}>
            {erros.Senha ? (
              erros.Senha.map((value, i) => (
                <View key={i}>
                  <Text style={{color: '#d9534f', fontSize: 14}}>{value}</Text>
                </View>
              ))
            ) : (
              <View />
            )}
          </View>

          <Button
            mode="contained"
            icon="check-circle"
            style={{
              marginBottom: 20,
            }}
            onPress={() => handleButtonPress()}>
            Iniciar Sessão
          </Button>

          <Button
            mode="outlined"
            icon="help-circle-outline"
            style={{
              marginBottom: 60,
            }}>
            Esqueci minha senha
          </Button>

          <View>
            <Text>Curso REACT DEVELOPER - COTI Informática v1.0</Text>
          </View>
        </View>
      </Card.Content>
    </ScrollView>
  );
}

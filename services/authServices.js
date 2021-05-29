import axios from 'axios';
import * as config from '../config/ApiConfig';

//função para executar a chamada para o servico
//de autenticação de usuário na API

export const post = user => {
  return axios.post(config.ENDPOINT + '/Auth', user).then(response => {
    return response.data;
  });
};

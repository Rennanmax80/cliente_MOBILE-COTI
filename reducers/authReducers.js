import * as actions from '../actions/authActions';

const initialState = {
  accessToken: '',
};

const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case actions.SIGN_IN: //Autenticado
      //gravar o TOKEN no state
      return {
        ...state,
        accessToken: action.data,
      };

    case actions.SIGN_OUT: //não autenticado!
      return {
        ...state,
        accessToken: '',
      };

    default:
      return state;
  }
};

export default authReducers;

import * as types from '../constants/ActionTypes';

export const authLogin = (dataLogin) => {

  return {
    types: [ types.API_REQUEST_SEND, types.AUTH_SET_USER, types.AUTH_DISCARD_TOKEN ],
    payload: {
      request:{
        method: 'POST',
        data: dataLogin
      }
    }
  };
};

export const authLogout = (dataLogout) => {

  return {
    types: [ types.API_REQUEST_SEND, types.AUTH_DISCARD_TOKEN, types.AUTH_DISCARD_TOKEN ],
    payload: {
      request:{
        method: 'POST',
        data: dataLogout
      }
    }
  };
};

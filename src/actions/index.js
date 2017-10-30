import * as types from '../constants/ActionTypes';

export const authLogin = (dataLogin) => {
  return {
    types: [ types.API_REQUEST_SEND, types.AUTH_SET_TOKEN, types.AUTH_DISCARD_TOKEN ],
    payload: {
      request:{
        url: '/auth/signin',
        method: 'POST',
        data: dataLogin
      }
    }
  };
};

export const userLogged = (id) => (dispatch, getState) => dispatch({
  types: [ types.API_REQUEST_SEND, types.AUTH_SET_USER, types.AUTH_DISCARD_TOKEN ],
  payload: {
    request:{
      url: `/users/${id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getState().auth.token}`
      }
    }
  }
});

export const authLogout = () => ({ type: types.AUTH_DISCARD_TOKEN });

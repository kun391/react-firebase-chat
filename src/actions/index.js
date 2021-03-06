import * as types from '../constants/ActionTypes';

export const authLogin = (dataLogin) => {
  return {
    types: [ types.API_REQUEST_SEND, types.AUTH_SET_TOKEN, types.AUTH_DISCARD_TOKEN ],
    payload: {
      request:{
        url: '/admin/signin',
        method: 'POST',
        data: dataLogin
      }
    }
  };
};

export const setToken = (token) => ({ type: types.AUTH_SET_TOKEN, token: token })

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

export const getContacts = () => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.CONTACT_GET_USERS, types.AUTH_DISCARD_TOKEN],
  payload: {
    request: {
      url: `/users`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getState().auth.token}`
      }
    }
  }
});

export const getServices = () => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.SERVICE_GET_SERVICES, types.AUTH_DISCARD_TOKEN],
  payload: {
    request: {
      url: `/services`,
      method: 'GET',
    }
  }
});

export const getTimeAvailable = (service_id) => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.SERVICE_GET_TIME_AVAILABLE, types.AUTH_DISCARD_TOKEN],
  payload: {
    request: {
      url: `/services/${service_id}/available-times?mode=1`,
      method: 'GET',
    }
  }
});

export const booking = (user_id, data) => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.BOOKING_ADMIN_BOOKING, types.API_REQUEST_SUCCESS],
  payload: {
    request: {
      url: `/users/${user_id}/bookings`,
      method: 'POST',
      data: data,
      headers: {
        'Authorization': `Bearer ${getState().auth.token}`
      }
    }
  }
});

export const authLogout = () => ({ type: types.AUTH_DISCARD_TOKEN });

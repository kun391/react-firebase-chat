import {
  AUTH_DISCARD_TOKEN,
  AUTH_SET_USER,
  AUTH_SET_TOKEN
} from '../constants/ActionTypes';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const initialState = cookies.get('authState') ? cookies.get('authState') : {};

export default function auth(state = initialState, action) {
  let authState = state;

  switch (action.type) {
    case AUTH_SET_TOKEN:
      authState = {
        ...state,
        token: action.payload.data.data.accessToken,
        user_id: action.payload.data.data.id
      };
      break;

    case AUTH_DISCARD_TOKEN:
      authState = {};
      break;

    case AUTH_SET_USER:
      const authResponse = action.payload.data;

      if (authResponse) {
        const user = authResponse.user;
        authState = {
          ...state,
          user: user
        };
      } else {
        authState = {};
      }
      break;

    default:
      authState = state;
  }

  cookies.set('authState', authState);

  return authState;
};


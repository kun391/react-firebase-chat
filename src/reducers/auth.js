import {
  AUTH_DISCARD_TOKEN,
  AUTH_SET_USER,
  AUTH_SET_TOKEN
} from '../constants/ActionTypes';
import { Cookies } from 'react-cookie';
import Fire from '../libraries/Fire'

const cookies = new Cookies();
const initialState = cookies.get('authState') ? cookies.get('authState') : {};

export default function auth(state = initialState, action) {
  let authState = state;

  switch (action.type) {
    case AUTH_SET_TOKEN:
      authState = {
        ...state,
        token: action.token
      };
      authState.user_id = authState.user_id || (action.payload ? action.payload.data.data.id : null);
      break;

    case AUTH_DISCARD_TOKEN:
      Fire.auth().signOut().then(function () {
        // Sign-out successful.
      }).catch(function (error) {
        // An error happened.
      });
      authState = {};
      break;

    case AUTH_SET_USER:
      const authResponse = action.payload.data;

      if (authResponse) {
        const user = authResponse.data;
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


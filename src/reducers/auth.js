import {
  AUTH_DISCARD_TOKEN,
  AUTH_SET_USER
} from '../constants/ActionTypes';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const initialState = cookies.get('authState') ? cookies.get('authState') : {};

export default function auth(state = initialState, action) {
  let authState = state;

  switch (action.type) {

    case AUTH_DISCARD_TOKEN:
      authState = {};
      break;

    case AUTH_SET_USER:
      const authResponse = action.payload.data.Envelope.Body.DoLoginResponse.DoLoginResult;

      if (authResponse.Authenticated === 'true') {
        const user = authResponse.SecurityProfile;
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


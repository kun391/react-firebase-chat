import axios from 'axios';
import { SOAP_URL} from '../constants/Api';

export const apiClients = {
  default: {
    client: axios.create({
      baseURL: SOAP_URL,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
};

export const apiMiddlewareConfig = {};

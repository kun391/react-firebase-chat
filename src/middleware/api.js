import axios from 'axios';
import { API_URL } from '../constants/Api';

export const apiClients = {
  default: {
    client: axios.create({
      baseURL: API_URL,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
};

export const apiMiddlewareConfig = {};

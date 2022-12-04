import axios from 'axios';

export const api = axios.create({
  baseURL: "https://estoque-joiasbraga.herokuapp.com/"
})
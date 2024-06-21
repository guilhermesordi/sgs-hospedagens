import axios from 'axios';

export const api = axios.create({ baseURL: 'https://sgs-api.vercel.app/api' });

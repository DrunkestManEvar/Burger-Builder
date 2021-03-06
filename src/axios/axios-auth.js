import axios from 'axios';

const axiosAuthInstance = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
});

export default axiosAuthInstance;

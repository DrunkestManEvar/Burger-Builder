import axios from 'axios';

const axiosOrderInstance = axios.create({
  baseURL: 'https://burger-builder-f2984-default-rtdb.firebaseio.com/',
});

export default axiosOrderInstance;

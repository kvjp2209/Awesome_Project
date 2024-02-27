/**
 *
 * @format
 *
 */

import Axios from 'axios';

/**
 * timeout for 30 seconds
 */
const TIMEOUT = 1 * 15 * 1000;
Axios.defaults.timeout = TIMEOUT;

/**
 * setup axios included content-type & deviceId
 */
const init = () => {
  // console.log('[api.config]------------- Axios INIT');
  const headers: any = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  Axios.defaults.withCredentials = false;
  const auth = Axios.defaults.headers?.Authorization;
  if (auth) {
    headers.Authorization = auth;
    // console.log('-------- Axios INIT with AUTH');
  }
  Axios.defaults.headers = headers;

  //setup Base Url
  Axios.defaults.baseURL = 'https://api.opendota.com/api';
};

const SetupAPI = {
  init,
};

export default SetupAPI;

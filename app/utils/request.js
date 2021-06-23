import axios from 'axios'
import db from 'kilcote-utils/localstorage'
import { API_BASEURL, REQUEST_TIMEOUT, CHECKREGION, MESSAGEDURATION } from './constants'
const authorizationValue = "Basic ZmViczoxMjM0NTY=";
const success = 200

function getToken() {
  return db.get('ACCESS_TOKEN', null);
}

function getLocale() {
  return db.get('LOCALTE', null);
}

function getTimezoneOffset() {
  function z(n) { return (n < 10 ? '0' : '') + n }
  var offset = new Date().getTimezoneOffset();
  var sign = offset < 0 ? '+' : '-';
  offset = Math.abs(offset);
  return sign + z(offset / 60 | 0) + z(offset % 60);
}

const request = {
  auth(url) {
    return axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Locale': getLocale(),
      }
    });
  },
  login(url, params) {
    return axios.post(url, params, {
      headers: {
        'Authorization': authorizationValue,
        'Locale': getLocale(),
        'grant_type': 'password'
      }
    });
  },
  post(url, params) {
    return axios.post(url, params, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Locale': getLocale(),
      }
    });
  },
  post2Json(url, params) {
    return axios.post(url, params, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Locale': getLocale(),
      }
    });
  },
  put(url, params) {
    return axios.put(url, params, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Locale': getLocale(),
      }
    });
  },
  put2Json(url, params) {
    return axios.put(url, params, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Locale': getLocale(),
      }
    });
  },
  get(url, params) {
    return axios.get(url, {
      params: params,
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Locale': getLocale(),
      }
    });
  },
  delete(url, params) {
    return axios.delete(url, {
      params: params,
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Locale': getLocale(),
      }
    });
  },
  download(url, params) {
    return axios({
      url,
      params: params,
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Locale': getLocale(),
      },
      method: 'GET',
      responseType: 'blob'
    });
  }
}


export default request

import axios from 'axios';

import { API_BASEURL } from 'kilcote-utils/constants';
import request from 'kilcote-utils/request'

//login
export function auth() {
  return request.auth(`${API_BASEURL}/oauth/token`);
}
export function login(email, password) {
  return request.login(`${API_BASEURL}/oauth/token`, { email: email, password: password });
}

//signup
export function signup(values) {
  return request.post(`${API_BASEURL}/oauth/signup`, values);
}

//confirm signup
export function confirmSignup(confirmationToken) {
  return request.get(`${API_BASEURL}/oauth/confirm-signup`, { confirmationToken: confirmationToken });
}

//reset
export function reset(values) {
  return request.post(`${API_BASEURL}/oauth/reset`, values);
}

//confirm reset
export function confirmReset(confirmationToken, password) {
  return request.get(`${API_BASEURL}/oauth/confirm-reset`, { confirmationToken: confirmationToken, password: password });
}
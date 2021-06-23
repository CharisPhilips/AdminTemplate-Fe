import { AUTH, LOGIN, LOGOUT, CLOSE_NOTIF } from 'kilcote-actions/actionConstants'

export const authAction = () => ({
  type: AUTH
});

export const loginAction = (email, password, remember) => ({
  type: LOGIN,
  email: email,
  password: password,
  remember: remember,
});

export const logoutAction = () => ({
  type: LOGOUT
});

export const closeNotifAction = () => ({
  type: CLOSE_NOTIF
});
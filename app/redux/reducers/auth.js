import { Map, fromJS } from 'immutable';
import { AUTH, LOGIN, LOGOUT, LOGIN_SUCCESS, LOGIN_FAILED, CLOSE_NOTIF } from 'kilcote-actions/actionConstants';
import { call, put, takeLatest } from "redux-saga/effects";
import db from 'kilcote-utils/localstorage'
import { IntlProvider, useIntl } from 'react-intl';
import * as Webapis from 'kilcote-api/auth'

var initialState = {
  authUser: Map({
    id: undefined,
    email: db.get('EMAIL', null),
    password: db.get('PASSWORD', null),
    remember: db.get('REMEMBER', false),
    accessToken: db.get('ACCESS_TOKEN', null),
    routeToken: db.get('ROUTE_TOKEN', null),
    routes: db.get('USER_ROUTER') || List([]),
    permissions: db.get('PERMISSIONS') || List([]),
    isLogin: false
  }),
  requestCompleted: false,
  notifMsg: ''
};

const initialImmutableState = fromJS(initialState);

export default function authReducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case AUTH:
      return state.withMutations((mutableState) => {
        mutableState.set('requestCompleted', false);
      });
    case LOGIN:
      return state.withMutations((mutableState) => {
        mutableState.set('requestCompleted', false);
      });
    case LOGIN_SUCCESS: {
      console.log('LOGIN_SUCCESS', action.user);
      const { user, remember } = action;
      return state.withMutations((mutableState) => {
        mutableState.set('authUser', Map(user));
        mutableState.set('requestCompleted', true);
        if (remember != null) {
          db.save('REMEMBER', remember);
          if (remember) {
            db.save('EMAIL', user.email);
            db.save('PASSWORD', user.password);
          } else {
            db.save('EMAIL', null);
            db.save('PASSWORD', null);
          }
        }
        if (user.accessToken != null) {
          db.save('ACCESS_TOKEN', user.accessToken);
        }
        if (user.routes != null && user.routes.length > 0) {
          db.save('USER_ROUTER', user.routes);
        }
        if (user.authorities != null && user.authorities.length > 0) {
          db.save('PERMISSIONS', user.authorities);
        }
        user.routes.push({
          name: "Logout",
          key: 'logout',
          link: '/logout',
          icon: 'ios-power-outline'
        });

      });
    }
    case LOGIN_FAILED: {
      return state.withMutations((mutableState) => {
        mutableState.set('requestCompleted', true);
        if (action.error != null) {
          mutableState.set('notifMsg', action.error);
        }
      });
    }
    case LOGOUT: {
      return state.withMutations((mutableState) => {
        mutableState.set('authUser', Map({
          id: undefined,
          email: db.get('EMAIL', null),
          password: db.get('PASSWORD', null),
          remember: db.get('REMEMBER', false),
          accessToken: null,
          routeToken: null,
          routes: null,
          permissions: null,
          isLogin: false
        }));
        db.save('ACCESS_TOKEN', null);
        db.save('ROUTE_TOKEN', null);
        db.save('USER_ROUTER', null);
        db.save('PERMISSIONS', null);
      });
    }
    case CLOSE_NOTIF:
      return state.withMutations((mutableState) => {
        mutableState.set('notifMsg', '');
      });
    default: {
      return state;
    }
  }
}

export const actions = {
  loginSuccessAction: (user, remember) => ({
    type: LOGIN_SUCCESS,
    user: user,
    remember: remember
  }),
  loginFailedAction: (error) => ({
    type: LOGIN_FAILED,
    error
  })
};

export function* sagaAuthSaga() {
  yield takeLatest(AUTH, function* loginSaga(params) {
    try {
      const { data: user } = yield Webapis.auth();
      if (user != null && user.email != null) {
        user.isLogin = true;
        yield put(actions.loginSuccessAction(user, null));
      } else {
        yield put(actions.loginFailedAction(null));
      }
    } catch (e) {
      console.error(e)
      yield put(actions.loginFailedAction(null));
    }
  });

  yield takeLatest(LOGIN, function* loginSaga(params) {
    try {
      const { data: user } = yield Webapis.login(params.email, params.password);
      if (user != null && user.email != null) {
        console.log('user', user);
        user.password = params.password;
        user.isLogin = true;
        yield put(actions.loginSuccessAction(user, params.remember));
      } else {
        yield put(actions.loginFailedAction('unexpectedly server error'));
      }
    } catch (e) {
      console.error(e)
      if (e.response != null && e.response.data != null) {
        console.log('e.response.data.message', e.response.data.message);
        yield put(actions.loginFailedAction(e.response.data.message));
      } else {
        yield put(actions.loginFailedAction('unexpectedly server error'));
      }
    }
  });
}

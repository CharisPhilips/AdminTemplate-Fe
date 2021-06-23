/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { reducer as form } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';
import { all } from "redux-saga/effects";
import { connectRouter } from 'connected-react-router/immutable';
import history from 'utils/history';
import uiReducer, {sagaCrudUI} from './reducers/ui';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import authReducer, { sagaAuthSaga } from './reducers/auth';

import crudTable from './reducers/crudTable';

import { sagaCrudTableUser } from './reducers/admin/crudTableUser';
import { sagaCrudTableRole } from './reducers/admin/crudTableRole';
import { sagaCrudTableLog } from './reducers/admin/crudTableLog';
import { sagaCrudTableLoginLog } from './reducers/admin/crudTableLoginLog';

import treeTable from './reducers/treeTable';

import initval from './reducers/initForm';

function branchReducer(reducerFunction, reducerName) {
  return (state, action) => {
    const { branch } = action;
    const isInitializationCall = state === undefined;
    if (branch !== reducerName && !isInitializationCall) {
      return state;
    }
    return reducerFunction(state, action);
  };
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    form,
    auth: authReducer,
    initval,
    ui: uiReducer,
    treeTableMenu: branchReducer(treeTable, 'treeTableMenu'),
    treeChooserMenu: branchReducer(treeTable, 'treeChooserMenu'),
    treeTableRoleMenu: branchReducer(treeTable, 'treeTableRoleMenu'),

    crudTableUser: branchReducer(crudTable, 'crudTableUser'),
    crudTableRole: branchReducer(crudTable, 'crudTableRole'),
    crudTableLog: branchReducer(crudTable, 'crudTableLog'),
    crudTableLoginLog: branchReducer(crudTable, 'crudTableLoginLog'),

    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });
  
  // Wrap the root reducer and return a new root reducer with router state
  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
}

export function* rootSaga() {
  yield all([sagaCrudUI(), sagaAuthSaga(), sagaCrudTableUser(), sagaCrudTableRole(), sagaCrudTableLog(), sagaCrudTableLoginLog()]);
}
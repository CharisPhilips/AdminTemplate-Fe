import { fromJS, List, Map } from 'immutable';
import { put, takeLatest } from "redux-saga/effects";
import * as Webapis from 'kilcote-api/log'
import { fetchInitCompleteAction, fetchCompleteAction, removeCompleteAction, submitCompleteAction } from 'kilcote-actions/CrudTbActions';
import { FETCH_DATA_INIT_REQUEST, FETCH_DATA_REQUEST, SUBMIT_REQUEST, REMOVE_ROW_REQUEST, EDIT_ROW_FORM } from '../../actions/actionConstants';

const branch = 'crudTableLog';

export function* sagaCrudTableLog() {
  yield takeLatest(`${branch}/${FETCH_DATA_INIT_REQUEST}`, function* crudLogFetchInit(action) {
    try {
      const anchor = action.anchor;
      const rowsPerPage = action.rowsPerPage;
      var dataSchema = [];
      for (let i = 0; i < anchor.length; i++) {
        dataSchema[i] = {};
        dataSchema[i].name = anchor[i].name;
        if (dataSchema[i].name == 'id') {
          dataSchema[i].initialValue = null;
        }
        else {
          dataSchema[i].initialValue = anchor[i].initialValue;
        }
      }
      const { data: pageData } = yield Webapis.getLogsByPage({ page: 0, size: rowsPerPage });
      yield put(fetchInitCompleteAction(dataSchema, fromJS(pageData.content), pageData.totalElements, branch));
    } catch (e) {
      console.error(e)
    }
  });

  yield takeLatest(`${branch}/${FETCH_DATA_REQUEST}`, function* crudLogFetch(action) {
    try {
      console.log('FETCH_DATA_REQUEST', action);
      const rowsPerPage = action.rowsPerPage;
      const page = action.page;
      const { data: pageData } = yield Webapis.getLogsByPage({ page: page, size: rowsPerPage },
        action.email,
        action.dtFrom != null ? action.dtFrom.toISOString() : null,
        action.dtTo != null ? action.dtTo.toISOString() : null);
      yield put(fetchCompleteAction(fromJS(pageData.content), pageData.totalElements, rowsPerPage, pageData.pageable.pageNumber, branch));
    } catch (e) {
      console.error(e)
    }
  });

  yield takeLatest(`${branch}/${SUBMIT_REQUEST}`, function* crudLogSubmit(action) {
    if (action.newData != null) {
      try {
        if (action.newData.get('id') != null && action.newData.get('id') > 0) {
          //update
          const response = yield Webapis.updateLog(action.newData, action.newData.get('id'));
          const success = (response.status == 200 && response.data != null);
          response.data.rolesStr = Array.prototype.map.call(response.data.roles, function (item) { return item.roleName; }).join(", ");
          yield put(submitCompleteAction(success, fromJS(response.data), false, branch));
        }
        else {
          //add
          const response = yield Webapis.addLog(action.newData);
          const success = (response.status == 201 && response.data != null);
          response.data.rolesStr = Array.prototype.map.call(response.data.roles, function (item) { return item.roleName; }).join(", ");
          yield put(submitCompleteAction(success, fromJS(response.data), true, branch));
        }
      } catch (e) {
        console.error(e)
      }
    }
    else {
      yield put(submitCompleteAction(false, "Failed to operation", null, branch));
    }
  });

  yield takeLatest(`${branch}/${REMOVE_ROW_REQUEST}`, function* crudLogRowDelete(action) {
    const id = action.item.get('id');
    if (id != null && id > 0) {
      try {
        const response = yield Webapis.deleteLog(id);
        const success = (response.status == 200 && response.data != false);
        if (success) {
          yield put(removeCompleteAction(action.item, branch));
        }
      } catch (e) {
        console.error(e)
      }
    }
  });
}

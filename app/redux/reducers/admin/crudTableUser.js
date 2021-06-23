import { fromJS, List, Map } from 'immutable';
import { put, takeLatest } from "redux-saga/effects";
import * as Webapis from 'kilcote-api/user'
import { fetchInitCompleteAction, fetchCompleteAction, removeCompleteAction, submitCompleteAction } from 'kilcote-actions/CrudTbActions';
import { FETCH_DATA_INIT_REQUEST, FETCH_DATA_REQUEST, SUBMIT_REQUEST, REMOVE_ROW_REQUEST, EDIT_ROW_FORM } from '../../actions/actionConstants';

const branch = 'crudTableUser';

export function* sagaCrudTableUser() {
  yield takeLatest(`${branch}/${FETCH_DATA_INIT_REQUEST}`, function* crudUserFetchInit(action) {
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
      const { data: pageData } = yield Webapis.getUsersByPage({ page: 0, size: rowsPerPage });
      for (let i = 0; i < pageData.content.length; i++) {
        pageData.content[i].edited = false;
        if (pageData.content[i].roles != null) {
          pageData.content[i].rolesStr = Array.prototype.map.call(pageData.content[i].roles, function (item) { return item.roleName; }).join(", ");
        }
      }
      yield put(fetchInitCompleteAction(dataSchema, fromJS(pageData.content), pageData.totalElements, branch));
    } catch (e) {
      console.error(e)
    }
  });

  yield takeLatest(`${branch}/${FETCH_DATA_REQUEST}`, function* crudUserFetch(action) {
    try {
      const rowsPerPage = action.rowsPerPage;
      const page = action.page;
      const { data: pageData } = yield Webapis.getUsersByPage({ page: page, size: rowsPerPage });
      for (let i = 0; i < pageData.content.length; i++) {
        pageData.content[i].edited = false;
        if (pageData.content[i].roles != null) {
          pageData.content[i].rolesStr = Array.prototype.map.call(pageData.content[i].roles, function (item) { return item.roleName; }).join(", ");
        }
      }
      yield put(fetchCompleteAction(fromJS(pageData.content), pageData.totalElements, rowsPerPage, pageData.pageable.pageNumber, branch));
    } catch (e) {
      console.error(e)
    }
  });

  yield takeLatest(`${branch}/${SUBMIT_REQUEST}`, function* crudUserSubmit(action) {
    if (action.newData != null) {
      try {
        if (action.newData.get('id') != null && action.newData.get('id') > 0) {
          //update
          const response = yield Webapis.updateUser(action.newData, action.newData.get('id'));
          const success = (response.status == 200 && response.data != null);
          response.data.rolesStr = Array.prototype.map.call(response.data.roles, function (item) { return item.roleName; }).join(", ");
          yield put(submitCompleteAction(success, fromJS(response.data), false, branch));
        }
        else {
          //add
          const response = yield Webapis.addUser(action.newData);
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

  yield takeLatest(`${branch}/${REMOVE_ROW_REQUEST}`, function* crudUserRowDelete(action) {
    const id = action.item.get('id');
    if (id != null && id > 0) {
      try {
        const response = yield Webapis.deleteUser(id);
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

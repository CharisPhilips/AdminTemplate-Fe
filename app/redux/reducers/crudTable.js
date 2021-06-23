import { fromJS, List, Map } from 'immutable';

import {
  FETCH_DATA_INIT_COMPLETE,
  FETCH_DATA_COMPLETE,
  ADD_NEW_FORM,
  EDIT_ROW_FORM,
  REMOVE_ROW_COMPLETE,
  SUBMIT_COMPLETE,
  CLOSE_FORM,
  CLOSE_NOTIF
} from '../actions/actionConstants';

const initialState = {
  dataTable: List([]),
  formValues: Map(),
  editingId: '',
  showFrm: false,
  notifMsg: '',
  dataSchema: List([]),
  //pagination
  totalCount: 0,
  page: 0,
  rowsPerPage: 10,
};

const initialItem = (dataSchema) => {
  const staticKey = {};
  for (let i = 0; i < dataSchema.length; i++) {
    staticKey[dataSchema[i].name] = dataSchema[i].initialValue;
  }
  return Map(staticKey);
}

let editingIndex = 0;

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  const { branch } = action;
  switch (action.type) {
    case `${branch}/${FETCH_DATA_INIT_COMPLETE}`:
      return state.withMutations((mutableState) => {
        const {dataTable, dataSchema, totalCount} = action;
        mutableState.set('dataTable', dataTable);
        mutableState.set('dataSchema', dataSchema);
        mutableState.set('totalCount', totalCount);
        mutableState.set('formValues', Map());
        mutableState.set('editingId', '');
        mutableState.set('showFrm', false);
        mutableState.set('notifMsg', '');
      });
    case `${branch}/${FETCH_DATA_COMPLETE}`:  
      return state.withMutations((mutableState) => {
        const {dataTable, totalCount, rowsPerPage, page} = action;
        mutableState.set('dataTable', dataTable);
        mutableState.set('totalCount', totalCount);
        mutableState.set('rowsPerPage', rowsPerPage);
        mutableState.set('page', page);
      });
    case `${branch}/${ADD_NEW_FORM}`:
      return state.withMutations((mutableState) => {
        const initial = initialItem(state.get('dataSchema')); 
        mutableState.set('formValues', initial);
        mutableState.set('showFrm', true);
      });
    case `${branch}/${EDIT_ROW_FORM}`:
      return state.withMutations((mutableState) => {
        editingIndex = state.get('dataTable').indexOf(action.item);
        mutableState
          .set('formValues', action.item)
          .set('editingId', action.item.get('id'))
          .set('showFrm', true);
      });
    case `${branch}/${SUBMIT_COMPLETE}`:
      const {success, data, isAddorUpdate} = action;
      return state.withMutations((mutableState) => {
        if (success) {
          if (data != null) {
            if (isAddorUpdate) {
              mutableState
              .update('dataTable', dataTable => dataTable.unshift(data))
              .set('notifMsg', 'app.notif.saved');//notif.saved
            }
            else {
              mutableState
              .update('dataTable', dataTable => dataTable.setIn([editingIndex], data))
              .set('notifMsg', 'app.notif.updated');
            }
          }
        }
        else {
          mutableState.set('notifMsg', 'app.notif.failed');
        }
        mutableState.set('showFrm', false);
        mutableState.set('formValues', Map());
      });
    case `${branch}/${REMOVE_ROW_COMPLETE}`:
      return state.withMutations((mutableState) => {
        const index = state.get('dataTable').indexOf(action.item);
        const totalCount = mutableState.get('totalCount');
        mutableState
        .update('dataTable', dataTable => dataTable.splice(index, 1))
        .set('notifMsg', 'app.notif.removed');
        mutableState.set('totalCount', totalCount - 1);
      });
    case `${branch}/${CLOSE_FORM}`:
        return state.withMutations((mutableState) => {
          mutableState
            .set('formValues', Map())
            .set('showFrm', false);
        });
    case `${branch}/${CLOSE_NOTIF}`:
      return state.withMutations((mutableState) => {
        mutableState.set('notifMsg', '');
      });
    default: {
      return state;
    }
  }
}
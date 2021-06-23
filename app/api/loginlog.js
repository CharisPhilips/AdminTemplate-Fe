import axios from 'axios';

import { API_BASEURL } from 'kilcote-utils/constants';
import request from 'kilcote-utils/request'

//get logs by page
export function getLoginLogsByPage(page, email, dtFrom, dtTo) {
  return request.get(`${API_BASEURL}/loginLog/loginLogsByPage`, { page: page.page, size: page.size, email, dtFrom, dtTo });
}

export function addLoginLog(data) {
  return request.post(`${API_BASEURL}/loginLog/add`, data);
}

export function updateLoginLog(data, id) {
  return request.put(`${API_BASEURL}/loginLog/update/${id}`, data);
}

export function deleteLoginLog(id) {
  return request.delete(`${API_BASEURL}/loginLog/delete/${id}`, {});
}
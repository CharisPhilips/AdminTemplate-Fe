import axios from 'axios';

import { API_BASEURL } from 'kilcote-utils/constants';
import request from 'kilcote-utils/request'

//get logs by page
export function getLogsByPage(page, email, dtFrom, dtTo) {
  return request.get(`${API_BASEURL}/log/logsByPage`, { page: page.page, size: page.size, email, dtFrom, dtTo });
}

export function addLog(data) {
  return request.post(`${API_BASEURL}/log/add`, data);
}

export function updateLog(data, id) {
  return request.put(`${API_BASEURL}/log/update/${id}`, data);
}

export function deleteLog(id) {
  return request.delete(`${API_BASEURL}/log/delete/${id}`, {});
}
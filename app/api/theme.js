import axios from 'axios';

import { API_BASEURL } from 'kilcote-utils/constants';
import request from 'kilcote-utils/request'

//get themes total
export function getTotalThemes() {
  return request.get(`${API_BASEURL}/theme/getTotalThemes`, {});
}

export function addTheme(data) {
  return request.post(`${API_BASEURL}/theme/add`, data);
}

export function updateTheme(data, id) {
  return request.put(`${API_BASEURL}/theme/update/${id}`, data);
}

export function deleteTheme(id) {
  return request.delete(`${API_BASEURL}/theme/delete/${id}`, {});
}

export function deleteThemes(ids) {
  const params = ids.join(',');
  return request.delete(`${API_BASEURL}/theme/deletes/${params}`, {});
}

export function download() {
  return request.download(`${API_BASEURL}/theme/download/`, {});
}

export function upload(data) {
  return request.post(`${API_BASEURL}/theme/upload/`, data);
}
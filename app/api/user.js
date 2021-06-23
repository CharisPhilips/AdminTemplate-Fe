import axios from 'axios';

import { API_BASEURL } from 'kilcote-utils/constants';
import request from 'kilcote-utils/request'

//get users by page
export function getUsersByPage(page) {
  return request.get(`${API_BASEURL}/user/usersByPage`, { page: page.page, size: page.size });
}

//get users by page
export function getRolesByList() {
  return request.get(`${API_BASEURL}/user/rolesByList`, {});
}

export function addUser(data) {
  const formData = new FormData();
  formData.append('avatar', data.avatar);
  return request.post(`${API_BASEURL}/user/add`, data);
}

export function updateUser(data, id) {
  const formData = new FormData();
  const file = data.get('imgAvatar');
  // data.set('imgAvatar', null);
  formData.append('user', new Blob([JSON.stringify(data)], { type: "application/json" }))
  formData.append('avatar', file);
  return request.put(`${API_BASEURL}/user/update/${id}`, formData);

  // return request.put(`${API_BASEURL}/user/update/${id}`, data);
}

export function deleteUser(id) {
  return request.delete(`${API_BASEURL}/user/delete/${id}`, {});
}
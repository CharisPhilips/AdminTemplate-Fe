import axios from 'axios';

import { API_BASEURL } from 'kilcote-utils/constants';
import request from 'kilcote-utils/request'

//get users by page
export function getRolesByPage(page) {
  return request.get(`${API_BASEURL}/role/rolesByPage`, { page: page.page, size: page.size });
}

//get menu tree
export function getMenuTrees() {
  return request.get(`${API_BASEURL}/role/getMenuTrees`, {});
}
//get meus by roleId
export function getMenusByRoleId(roleId) {
  return request.get(`${API_BASEURL}/role/getMenusByRoleId/${roleId}`);
}

export function addRole(data) {
  return request.post(`${API_BASEURL}/role/add`, data);
}

export function updateRole(data, id) {
  return request.put(`${API_BASEURL}/role/update/${id}`, data);
}

export function deleteRole(ids) {
  const params = ids.join(',');
  return request.put(`${API_BASEURL}/role/delete/${params}`, data);
}


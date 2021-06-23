import axios from 'axios';

import { API_BASEURL, API_KEY } from 'kilcote-utils/constants';
import request from 'kilcote-utils/request';

// get menu
export function getMenuTrees() {
  return request.get(`${API_BASEURL}/menu/getMenuTrees`, {});
}

export function getMenuById(id) {
  return request.get(`${API_BASEURL}/menu/getMenuById/${id}`);
}

export function addMenu(data) {
  return request.post(`${API_BASEURL}/menu/add`, data);
}

export function updateMenu(data, id) {
  return request.put(`${API_BASEURL}/menu/update/${id}`, data);
}

export function deleteMenu(id) {
  return request.delete(`${API_BASEURL}/menu/delete/${id}`, {});
}

export function deleteMenus(ids) {
  const params = ids.join(',');
  return request.delete(`${API_BASEURL}/menu/deletes/${params}`, {});
}

// export function translate(text, lang) {
//   return fetch(`https://translation.googleapis.com/language/translate/v2?key=${API_KEY}&source=en&target=${lang}&q=` + encodeURI(text))
//     .then(res => res.json())
//     .then(
//       ( res ) => {
//         let text = res.data.translations[0].translatedText.replace(/(&quot\;)/g,"\"")
//         return text;
//       }
//     ) .catch(
//       ( error ) => {
//         console.log("There was an error: ", error);
//       }
//     )
// }

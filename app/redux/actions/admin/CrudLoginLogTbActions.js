import * as types from '../actionConstants';

export const fetchLoginLogRequestAction = (rowsPerPage, page, email, dtFrom, dtTo, branch) => ({
  branch,
  type: `${branch}/${types.FETCH_DATA_REQUEST}`,
  rowsPerPage,
  page,
  email,
  dtFrom,
  dtTo
});
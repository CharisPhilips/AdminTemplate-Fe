import * as types from './actionConstants';

export const openAction = (item, branch) => ({
  branch,
  type: `${branch}/${types.TOGGLE_TREE}`,
  item
});

export const checkAction = (item, value, mode, branch) => ({
  branch,
  type: `${branch}/${types.CHECK_TREE}`,
  item,
  value,
  mode //0 : general 1: tree-check,
});

export const initCheckAction = (checkedIds,  branch) => ({
  branch,
  type: `${branch}/${types.INIT_CHECK_TREE}`,
  checkedIds
});
import { fromJS, List } from 'immutable';
import { TOGGLE_TREE, CHECK_TREE, INIT_CHECK_TREE } from 'kilcote-actions/actionConstants';

const initialState = {
  treeOpen: List([]),
  arrowMore: List([]),
  treeChecked: List([])
};

const initialImmutableState = fromJS(initialState);

// Collect existing child of parent id's
function collectId(item, listedId, collapsed, arrowLess) {
  arrowLess.push(item.id);
  for (let i = 0; i < listedId.size; i++) {
    if (listedId.getIn([i]) != item.id && isExistChild(listedId.getIn([i]), item)) {
      collapsed.push(listedId.getIn([i]));
      arrowLess.push(listedId.getIn([i]));
    } else {
    }
  }
}

function isExistChild(id, item) {
  if (id === item.id) {
    return true;
  } else {
    if (item.child != null) {
      for (const child of item.child) {
        if (isExistChild(id, child)) {
          return true;
        }
      }
    }
  }
  return false;
}

function collectChildCheck(item, checkedIds) {
  checkedIds.push(item.id);
  if (item.child != null) {
    for (const child of item.child) {
      collectChildCheck(child, checkedIds);
    }
  }
}

function collectParentCheck(item, checkedIds) {
  if (item.parent != null) {
    checkedIds.push(item.parent.id);
    collectParentCheck(item.parent, checkedIds);
  }
}

export default function reducer(state = initialImmutableState, action = {}) {
  const { branch } = action;
  switch (action.type) {
    case `${branch}/${TOGGLE_TREE}`:
      return state.withMutations((mutableState) => {
        const listedId = state.get('treeOpen');
        const collapsed = [];
        const arrowLess = [];

        // Collect existing id
        collectId(action.item, listedId, collapsed, arrowLess);

        // Collapse and Expand row
        if (collapsed.length > 0) { // Collapse tree table
          mutableState.update('treeOpen', treeOpen => treeOpen.filter(x => collapsed.indexOf(x) < 0));
          mutableState.update('arrowMore', arrowMore => arrowMore.filter(x => arrowLess.indexOf(x) < 0));
        } else { // Expand tree table
          mutableState.update('arrowMore', arrowMore => arrowMore.push(action.item.id));
          action.item.child.map(item => {
            mutableState.update('treeOpen', treeOpen => treeOpen.push(item.id));
            return true;
          });
        }
      });
    case `${branch}/${CHECK_TREE}`:
      return state.withMutations((mutableState) => {
        const listedChecked = state.get('treeChecked');
        const checkedIds = [];

        collectChildCheck(action.item, checkedIds);
        if (action.value && action.mode) {
          collectParentCheck(action.item, checkedIds);
        }

        if (action.value) {
          checkedIds.map(item => {
            const filter = listedChecked.filter(x => x === item);
            if (filter.size <= 0) {
              mutableState.update('treeChecked', treeChecked => treeChecked.push(item));
            }
          });
        } else {
          mutableState.update('treeChecked', treeChecked => treeChecked.filter(x => checkedIds.indexOf(x) < 0));
        }
      });
    case `${branch}/${INIT_CHECK_TREE}`:
      return state.withMutations((mutableState) => {
        const checkedIds = action.checkedIds;
        mutableState.update('treeChecked', treeChecked => treeChecked.filter(x => false));
        checkedIds.map(item => {
          mutableState.update('treeChecked', treeChecked => treeChecked.push(item));
        });
      });
    default:
      return state;
  }
}

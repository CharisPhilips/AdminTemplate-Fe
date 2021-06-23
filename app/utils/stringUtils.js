
export function getParentMenuPath(item, strStack) {
  if (item != null && item.name != null) {
    let result = item.name.toString();
    if(strStack != null && strStack.length > 0) {
      result += '/' + strStack;
    }
    if (item.parent != null) {
      return getParentMenuPath(item.parent, result);
    } else {
      return result;
    }
  }
}
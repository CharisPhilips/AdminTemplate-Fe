export const isAuthenticated = authUser => {
  return authUser != null && authUser.get('isLogin') != null && authUser.get('isLogin') === true;
}

export const hasPermission = (authUser, permissions) => {
  if (authUser != null && authUser.get('authorities') != null) {
    let flag = true;
    const authUserPerms = authUser.get('authorities');
    for (const permission of permissions) {
      if (!isContainPermission(authUserPerms, permission)) {
        flag = false
      }
      if (!flag) {
        break;
      }
    }
    return flag;
  } else {
    return false;
  }
}

export const hasNoPermission = (authUser, permissions) => {
   if (authUser != null && authUser.get('authorities') != null) {
    let flag = true;
    const authUserPerms = authUser.get('authorities');
    for (const permission of permissions) {
      if (isContainPermission(authUserPerms, permission)) {
        flag = false
      }
      if (!flag) {
        break;
      }
    }
    return flag;
  } else {
    return false;
  }
}

export const hasAnyPermission = (authUser, permissions) => {
  if (authUser != null && authUser.get('authorities') != null) {
    let flag = false;
    const authUserPerms = authUser.get('authorities');
    for (const permission of permissions) {
      if (isContainPermission(authUserPerms, permission)) {
        flag = true
      }
      if (flag) {
        break;
      }
    }
    return flag;
  } else {
    return false;
  }
}

export const hasRole = (authUser, roles) => {
  if (authUser != null && authUser.get('roles') != null) {
    let flag = true;
    const authUserRoles = authUser.get('roles');
    for (const role of roles) {
      if (!isContainRole(authUserRoles, role)) {
        flag = false
      }
      if (!flag) {
        break;
      }
    }
    return flag;
  } else {
    return false;
  }
}

export const hasNoRole = (authUser, roles) => {
  if (authUser != null && authUser.get('roles') != null) {
    let flag = true;
    const authUserRoles = authUser.get('roles');
    for (const role of roles) {
      if (isContainRole(authUserRoles, role)) {
        flag = false
      }
      if (!flag) {
        break;
      }
    }
    return flag;
  } else {
    return false;
  }
}

export const hasAnyRole = (authUser, roles) => {
  if (authUser != null && authUser.get('roles') != null) {
    let flag = false;
    const authUserRoles = authUser.get('roles');
    for (const role of roles) {
      if (isContainRole(authUserRoles, role)) {
        flag = true
      }
      if (flag) {
        break;
      }
    }
    return flag;
  } else {
    return false;
  }
}

const isContainPermission = (authorities, permission) => {
  let flag = false;
  for (const v of authorities) {
    if (v.authority === permission) {
      flag = true
    }
    if (flag) {
      break;
    }
  }
  return flag
}

const isContainRole = (roles, role) => {
  let flag = false;
  for (const v of roles) {
    if (v.roleName === role) {
      flag = true
    }
    if (flag) {
      break;
    }
  }
  return flag
}
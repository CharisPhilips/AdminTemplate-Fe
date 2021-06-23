import Loadable from 'react-loadable';
import Loading from 'kilcote-components/Loading';

// Admin
export const AdminHomepage = Loadable({
  loader: () => import('./Pages/Admin/Home/index'),
  loading: Loading,
});

export const UserManage = Loadable({
  loader: () => import('./Pages/Admin/Users/UserManage'),
  loading: Loading,
});

export const RoleManage = Loadable({
  loader: () => import('./Pages/Admin/Roles/RoleManage'),
  loading: Loading,
});

export const MenuManage = Loadable({
  loader: () => import('./Pages/Admin/Menus/MenuManage'),
  loading: Loading,
});

export const ThemeManage = Loadable({
  loader: () => import('./Pages/Admin/Themes/ThemeManage'),
  loading: Loading,
});

export const LogManage = Loadable({
  loader: () => import('./Pages/Admin/Logs/LogManage'),
  loading: Loading,
});

export const LoginLogManage = Loadable({
  loader: () => import('./Pages/Admin/LoginLogs/LoginLogManage'),
  loading: Loading,
});
// Test
export const testHomepage = Loadable({
  loader: () => import('./Pages/Test/Home/index'),
  loading: Loading,
});

export const testGoogleMapPage = Loadable({
  loader: () => import('./Pages/Test/Map/testGoogleMap'),
  loading: Loading,
});

export const testAntdPage = Loadable({
  loader: () => import('./Pages/Test/Antd/testAntd'),
  loading: Loading,
});

export const testBootstrapPage = Loadable({
  loader: () => import('./Pages/Test/Bootstrap/testBootStrap'),
  loading: Loading,
});

export const testBlueprintPage = Loadable({
  loader: () => import('./Pages/Test/Blueprint/testBlueprint'),
  loading: Loading,
});

export const testSemantiUIPage = Loadable({
  loader: () => import('./Pages/Test/SemanticUI/testSemanticUI'),
  loading: Loading,
});

export const Welcome = Loadable({
  loader: () => import('./Welcome'),
  loading: Loading,
});
// Auth
export const Login = Loadable({
  loader: () => import('./Pages/Auths/Login'),
  loading: Loading,
});

export const LoginDedicated = Loadable({
  loader: () => import('./Pages/Standalone/LoginDedicated'),
  loading: Loading,
});

export const Register = Loadable({
  loader: () => import('./Pages/Auths/Register'),
  loading: Loading,
});

export const ConfirmSignup = Loadable({
  loader: () => import('./Pages/Auths/ConfirmSignup'),
  loading: Loading,
});

export const ResetPassword = Loadable({
  loader: () => import('./Pages/Auths/ResetPassword'),
  loading: Loading,
});

export const ConfirmReset = Loadable({
  loader: () => import('./Pages/Auths/ConfirmReset'),
  loading: Loading,
});

// General
export const NotFound = Loadable({
  loader: () => import('./NotFound/NotFound'),
  loading: Loading,
});

export const NotFoundDedicated = Loadable({
  loader: () => import('./Pages/Standalone/NotFoundDedicated'),
  loading: Loading,
});

export const Error = Loadable({
  loader: () => import('./Pages/Error'),
  loading: Loading,
});

import React from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Auths from 'kilcote-utils/auth';
import Dashboard from '../Templates/Dashboard';
import {
  // Admin
  AdminHomepage,
  UserManage,
  RoleManage,
  MenuManage,
  ThemeManage,
  LogManage,
  LoginLogManage,
  // Business
  testHomepage,
  testGoogleMapPage,
  testAntdPage,
  testBootstrapPage,
  testBlueprintPage,
  testSemantiUIPage,
  // general
  Welcome,
  Error,
  NotFound
} from '../pageListAsync';

const branch = 'auth';

class Application extends React.Component {
  componentWillReceiveProps() {
    this.checkAuth();
  }

  checkAuth() {
    const isAuthenciate = Auths.isAuthenticated(this.props.authUser);
    if (!isAuthenciate) {
      this.props.history.push('/login');
    }
  }

  render() {
    const { changeMode, history, authUser } = this.props;
    return (
      <Dashboard history={history} changeMode={changeMode}>
        <Switch>
          <Route exact path="/app" component={Welcome} />

          {/* admin */}
          {Auths.hasPermission(authUser, ['system:view']) && <Route exact path="/app/admin" component={AdminHomepage} />}
          {Auths.hasPermission(authUser, ['system:view']) && <Route exact path="/app/admin/system" component={AdminHomepage} />}
          {Auths.hasPermission(authUser, ['system:view']) && <Route path="/app/admin/system/home" component={AdminHomepage} />}
          {Auths.hasPermission(authUser, ['user:view']) && <Route path="/app/admin/system/user" component={UserManage} />}
          {Auths.hasPermission(authUser, ['role:view']) && <Route path="/app/admin/system/role" component={RoleManage} />}
          {Auths.hasPermission(authUser, ['menu:view']) && <Route path="/app/admin/system/menu" component={MenuManage} />}
          {Auths.hasPermission(authUser, ['theme:view']) && <Route path="/app/admin/system/theme" component={ThemeManage} />}
          {Auths.hasPermission(authUser, ['log:view']) && <Route path="/app/admin/system/log" component={LogManage} />}
          {Auths.hasPermission(authUser, ['loginlog:view']) && <Route path="/app/admin/system/loginlog" component={LoginLogManage} />}

          {/* Test */}
          {Auths.hasPermission(authUser, ['test:view']) && <Route exact path="/app/test" component={testHomepage} />}
          {Auths.hasPermission(authUser, ['test:view']) && <Route exact path="/app/test/googlemap" component={testGoogleMapPage} />}
          {Auths.hasPermission(authUser, ['test:view']) && <Route exact path="/app/test/antd" component={testAntdPage} />}
          {Auths.hasPermission(authUser, ['test:view']) && <Route exact path="/app/test/bootstrap" component={testBootstrapPage} />}
          {Auths.hasPermission(authUser, ['test:view']) && <Route exact path="/app/test/blueprint" component={testBlueprintPage} />}
          {Auths.hasPermission(authUser, ['test:view']) && <Route exact path="/app/test/semantic-ui" component={testSemantiUIPage} />}

          {/* genearal */}
          <Route path="/app/pages/not-found" component={NotFound} />
          <Route path="/app/pages/error" component={Error} />
          <Route component={NotFound} />
        </Switch>
      </Dashboard>
    );
  }
}

Application.propTypes = {
  changeMode: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  force: state,
  authUser: state.getIn([branch, 'authUser'])
});

const mapDispatchToProps = dispatch => ({
});

const ApplicationMaped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Application);

export default ApplicationMaped;

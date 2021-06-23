import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Outer from '../Templates/Outer';
import {
  Login,
  Register,
  ConfirmSignup,
  ResetPassword,
  ConfirmReset,
  NotFound,
} from '../pageListAsync';

class Auth extends React.Component {
  render() {
    return (
      <Outer>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/confirm-signup/:token" strict sensitive
            render={({ match }) => <ConfirmSignup match={match} />}
          />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/confirm-reset/:token" strict sensitive
            render={({ match }) => <ConfirmReset match={match} />}
          />
          <Route component={NotFound} />
        </Switch>
      </Outer>
    );
  }
}

export default Auth;

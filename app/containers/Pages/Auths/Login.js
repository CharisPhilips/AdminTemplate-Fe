import React, { useRef, createRef } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import * as constants from 'kilcote-utils/constants';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { LoginForm, NotificationBar, Notification } from 'kilcote-components';
import Snackbar from '@material-ui/core/Snackbar'
import styles from 'kilcote-components/Forms/user-jss';
import { closeNotifAction } from 'kilcote-actions/AuthActions';
import * as Auths from 'kilcote-utils/auth';

const branch = 'auth';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      valueForm: [],
      showAlert: false,
      message: '',
      msgType: 'success'
    };
  }

  submitForm(values) {
    var checkRemember = values.get('remember');
    if (checkRemember == null) {
      checkRemember = false;
    }
    this.child.onLoginRequest(values.get('email'), values.get('password'), checkRemember);
    this.gotoHome();
  }

  gotoHome() {
    setTimeout(() => {
      if (this.props.requestCompleted) {
        const isAuthenciate = Auths.isAuthenticated(this.props.authUser);
        if (isAuthenciate) {
          this.props.history.push('/');
        }
      }
      else {
        this.gotoHome();
      }
    }, 1000);
  }

  render() {

    const title = constants.BRAND_NAME + ' - Login';
    const description = constants.BRAND_DESC;
    const { classes, className, authUser, messageNotif, closeNotif, requestCompleted } = this.props;
    return (
      <div className={classes.root}>
        <Notification onClose={() => closeNotif()} message={messageNotif} className={className} isOpen={requestCompleted} variant="error" />
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <div className={classes.container}>
          <div className={classes.userFormWrap}>
            <LoginForm childRef={ref => (this.child = ref)} onSubmit={(values) => this.submitForm(values)} data={authUser} />
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  messageNotif: PropTypes.string.isRequired,
  closeNotif: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  force: state,
  authUser: state.getIn([branch, 'authUser']),
  messageNotif: state.getIn([branch, 'notifMsg']),
  requestCompleted: state.getIn([branch, 'requestCompleted']),
});

const mapDispatchToProps = dispatch => ({
  closeNotif: bindActionCreators(closeNotifAction, dispatch)
});

const LoginMaped = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(Login)));

export default LoginMaped;
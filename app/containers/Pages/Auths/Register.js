import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import * as constants from 'kilcote-utils/constants';
import { RegisterForm, Notification } from 'kilcote-components';
import styles from 'kilcote-components/Forms/user-jss';
import * as Webapis from 'kilcote-api/auth'

class Register extends React.Component {
  state = {
    valueForm: [],
    message: '',
    msgType: 'success'
  }

  submitForm(values) {
    try {
      Webapis.signup(values).then((response) => {
        const { intl } = this.props;
        this.showNotification(intl.formatMessage({ id: 'app.notif.register.mail.verify', defaultMessage: "Your register is submitted. Please verify on your email" }), 'info');
      },
        (error) => {
          this.showNotification(error.response.data.message, 'error');
          console.log('error', error.response.data.message);
        });
    } catch (e) {
      console.error(e)
    }
  }

  showNotification(message, msgType) {
    this.setState({ message: message, msgType: msgType });
  }

  closeNotif(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ message: '' });
  }

  render() {
    const title = constants.BRAND_NAME + ' - Register';
    const description = constants.BRAND_DESC;
    const { classes } = this.props;
    const { message, msgType } = this.state;
    return (
      <div className={classes.root}>
        <Notification onClose={(event, reason) => this.closeNotif(event, reason)} message={message} variant={msgType} />
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
            <RegisterForm onSubmit={(values) => this.submitForm(values)} />
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

export default withStyles(styles)(injectIntl(Register));

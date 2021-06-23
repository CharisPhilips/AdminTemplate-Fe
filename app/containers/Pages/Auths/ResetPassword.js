import React from 'react';
import { Helmet } from 'react-helmet';
import * as constants from 'kilcote-utils/constants';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { ResetForm, Notification } from 'kilcote-components';
import styles from '../../../components/Forms/user-jss';
import * as Webapis from 'kilcote-api/auth'

class ResetPassword extends React.Component {
  state = {
    valueForm: [],
    message: '',
    msgType: 'success'
  }

  submitForm(values) {
    console.log('ResetPassword', values);
    try {
      Webapis.reset(values).then((response) => {
        const { intl } = this.props;
        this.showNotification(intl.formatMessage({ id: 'app.notif.reset.mail.verify', defaultMessage: "Your reset is submitted. Please verify on your email" }), 'info');
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
    const title = constants.BRAND_NAME + ' - Reset Password';
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
            <ResetForm onSubmit={(values) => this.submitForm(values)} />
          </div>
        </div>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

export default withStyles(styles)(injectIntl(ResetPassword));

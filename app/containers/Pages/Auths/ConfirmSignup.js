import React from 'react';
import { Helmet } from 'react-helmet';
import * as constants from 'kilcote-utils/constants';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ConfirmSignupForm } from 'kilcote-components';
import styles from '../../../components/Forms/user-jss';

class ConfirmSignup extends React.Component {
  state = {
    valueForm: []
  }

  render() {
    const title = constants.BRAND_NAME + ' - Reset Password';
    const description = constants.BRAND_DESC;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
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
            <ConfirmSignupForm />
          </div>
        </div>
      </div>
    );
  }
}

ConfirmSignup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConfirmSignup);

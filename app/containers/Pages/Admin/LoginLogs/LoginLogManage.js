import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import * as constants from 'kilcote-utils/constants';
import { PapperBlock } from 'kilcote-components';
import DetailLoginLog from './pages/DetailLoginLog.js';

const styles = ({
  root: {
    flexGrow: 1,
  }
});

class LoginLogManagePage extends Component {
  render() {
    const title = constants.BRAND_NAME + ' - Table';
    const description = constants.BRAND_DESC;
    const { classes, intl } = this.props;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock whiteBg icon="ios-people-outline" title={intl.formatMessage({ id: 'app.admin.system.loginlog.title', defaultMessage: "LoginLog Manage" })} desc={intl.formatMessage({ id: 'app.admin.system.loginlog.title_description', defaultMessage: "This page is to manage login logs." })}>
          <div className={classes.root}>
            <DetailLoginLog />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

LoginLogManagePage.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

export default withStyles(styles)(injectIntl(LoginLogManagePage));

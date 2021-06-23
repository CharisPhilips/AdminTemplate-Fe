import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import * as constants from 'kilcote-utils/constants';
import { PapperBlock } from 'kilcote-components';
import EditableUser from './pages/EditableUser';

const styles = ({
  root: {
    flexGrow: 1,
  }
});

class UserManagePage extends Component {
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
        <PapperBlock whiteBg icon="ios-person" title={intl.formatMessage({ id: 'app.admin.system.user.title', defaultMessage: "User Manage" })} desc={intl.formatMessage({ id: 'app.admin.system.user.title_description', defaultMessage: "This page is to manage users." })}>
          <div className={classes.root}>
            <EditableUser />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

UserManagePage.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

export default withStyles(styles)(injectIntl(UserManagePage));

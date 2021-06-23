import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import * as constants from 'kilcote-utils/constants';
import { PapperBlock } from 'kilcote-components';
import DetailLog from './pages/DetailLog';

const styles = ({
  root: {
    flexGrow: 1,
  }
});

class LogManagePage extends Component {
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
        <PapperBlock whiteBg icon="md-time" title={intl.formatMessage({ id: 'app.admin.system.log.title', defaultMessage: "Log Manage" })} desc={intl.formatMessage({ id: 'app.admin.system.log.title_description', defaultMessage: "This page is to manage logs." })}>
          <div className={classes.root}>
            <DetailLog />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

LogManagePage.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

export default withStyles(styles)(injectIntl(LogManagePage));

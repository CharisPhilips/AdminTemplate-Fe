import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import Grid from '@material-ui/core/Grid';
import OndemandVideo from '@material-ui/icons/OndemandVideo';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import CollectionsBookmark from '@material-ui/icons/CollectionsBookmark';
import Edit from '@material-ui/icons/Edit';
import pink from '@material-ui/core/colors/pink';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';
import indigo from '@material-ui/core/colors/indigo';
import teal from '@material-ui/core/colors/teal';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { PapperBlock, CounterWidget } from 'kilcote-components';
import * as constants from 'kilcote-utils/constants';
import styles from './home-jss';

class HomeDashboard extends Component {
  render() {
    const title = constants.BRAND_NAME + ' - Dashboard';
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
        <PapperBlock title="Home" icon="ios-home-outline" desc="" overflowX>
          <Grid container spacing={2} className={classes.rootCounterFull}>
            <Grid item xs={12} md={4}>
              <CounterWidget
                color={pink[300]}
                start={0}
                end={207}
                duration={3}
                title={intl.formatMessage({ id: 'app.admin.home.customer_overview.title', defaultMessage: "Customer overview" })}
              //"Subscribers"
              >
                <OndemandVideo className={classes.counterIcon} />
              </CounterWidget>
            </Grid>
            <Grid item xs={12} md={4}>
              <CounterWidget
                color={blue[300]}
                start={0}
                end={300}
                duration={3}
                title={intl.formatMessage({ id: 'app.admin.home.job_offers_overview.title', defaultMessage: "Job offers Overview" })}
              >
                <SupervisorAccount className={classes.counterIcon} />
              </CounterWidget>
            </Grid>
            <Grid item xs={12} md={4}>
              <CounterWidget
                color={orange[300]}
                start={0}
                end={67}
                duration={3}
                title={intl.formatMessage({ id: 'app.admin.home.job_descriptions_overview.title', defaultMessage: "Job descriptions overview" })}
              >
                <Edit className={classes.counterIcon} />
              </CounterWidget>
            </Grid>
            <Grid item xs={12} md={4}>
              <CounterWidget
                color={teal[300]}
                start={0}
                end={70}
                duration={3}
                title="Total Articles"
                title={intl.formatMessage({ id: 'app.admin.home.matching_overview.title', defaultMessage: "Matching overview" })}
              >
                <CollectionsBookmark className={classes.counterIcon} />
              </CounterWidget>
            </Grid>
            <Grid item xs={12} md={4}>
              <CounterWidget
                color={indigo[300]}
                start={0}
                end={70}
                duration={3}
                title="Total Articles"
                title={intl.formatMessage({ id: 'app.admin.home.student_profile.title', defaultMessage: "Student profiles" })}
              >
                <CollectionsBookmark className={classes.counterIcon} />
              </CounterWidget>
            </Grid>
          </Grid>
        </PapperBlock>
      </div>
    );
  }
}

HomeDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

export default withStyles(styles)(injectIntl(HomeDashboard));
import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import * as constants from 'kilcote-utils/constants';
import { PapperBlock, Notification } from 'kilcote-components';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import styles from './styles/theme-jss';

import TableTheme from './pages/TableTheme';
import EditableTheme from './pages/EditableTheme';

import { clone } from 'kilcote-utils/objUtils'

import * as Webapis from 'kilcote-api/theme'

class ThemeManage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      msgType: 'success'
    };
  }

  componentDidMount() {
  }

  gotoThemeDetail(value) {
    if (value != null) {
      let retValue = clone(value);
      this.childEdit.initData(retValue);
    }
  }

  addTheme() {
    this.childEdit.initData({});
  }

  refreshTheme() {
    this.childTable.fetchData();
  }

  deleteTheme(ids) {
    if (confirm(this.props.intl.formatMessage({ id: 'app.message.theme.confirm_delete', defaultMessage: "Are you sure you want to delete themes?" }))) {
      try {
        Webapis.deleteThemes(ids).then((response) => {
          this.showNotification('delete successed', 'success');
          this.refreshTheme();
        },
          (error) => {
          });
      } catch (e) {
        console.error(e)
      }
    } else {
    }
  }

  onSubmitTheme(values) {
    try {
      if (values.get('id') != null) {
        Webapis.updateTheme(values, values.get('id')).then((response) => {
          this.showNotification('update successed', 'success');
          this.refreshTheme();
        },
          (error) => {
          });
      } else {
        Webapis.addTheme(values).then((response) => {
          this.showNotification('add successed', 'success');
          this.refreshTheme();
        },
          (error) => {
            this.showNotification(error.response.data.message, 'error');
            console.log('error', error.response.data.message);
          });
      }
    } catch (e) {
      console.error(e)
    }
  }

  downloadTheme() {
    Webapis.download().then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'theme.csv');
      document.body.appendChild(link);
      link.click();
    });
  }

  uploadTheme(e) {
    if (e.target.files != null && e.target.files.length > 0) {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      // const filename = e.target.files[0].name;
      Webapis.upload(formData).then(res => {
        console.log("Theme File uploaded successfully.");
      })
    }
    else {
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
    const title = constants.BRAND_NAME + ' - Table';
    const description = constants.BRAND_DESC;
    const { classes, intl } = this.props;
    const { message, msgType } = this.state;
    return (
      <div>
        <Notification onClose={(event, reason) => this.closeNotif(event, reason)} message={message} variant={msgType} />
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock whiteBg icon="ios-color-palette" title={intl.formatMessage({ id: 'app.admin.system.theme.title', defaultMessage: "Theme Manage" })} desc={intl.formatMessage({ id: 'app.admin.system.theme.title_description', defaultMessage: "This page is to manage themes." })}>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TableTheme
                childTableRef={ref => (this.childTable = ref)}
                gotoThemeDetail={(value) => this.gotoThemeDetail(value)}
                addClick={() => this.addTheme()}
                deleteClick={(ids) => this.deleteTheme(ids)}
                downloadClick={() => this.downloadTheme()}
                uploadClick={(e) => this.uploadTheme(e)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <EditableTheme childEditRef={ref => (this.childEdit = ref)} onSubmit={(value) => this.onSubmitTheme(value)} />
            </Grid>
          </Grid>
        </PapperBlock>
      </div>
    );
  }
}

ThemeManage.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

const mapStateToProps = state => ({
  force: state, // force state from reducer
});

const mapDispatchToProps = dispatch => ({
});

const ThemeManageMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(ThemeManage);

export default withStyles(styles)(injectIntl(ThemeManageMapped));

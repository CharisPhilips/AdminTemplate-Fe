import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import * as constants from 'kilcote-utils/constants';
import Snackbar from '@material-ui/core/Snackbar'
import { PapperBlock, Notification } from 'kilcote-components';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import styles from './styles/menu-jss';
import MenuTreeTable from './pages/MenuTreeTable';
import EditableMenu from './pages/EditableMenu';
import { clone } from 'kilcote-utils/objUtils'
import * as Webapis from 'kilcote-api/menu'

class MenuManage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      msgType: 'success'
    };
  }

  componentDidMount() {
    this.childTree.fetchData();
    this.childEdit.initData({});
  }

  gotoMenuDetail(value) {
    if (value != null) {
      let retValue = clone(value);
      this.childEdit.initData(retValue);
    }
  }

  collectParentCheck(value) {
    if (value.parent != null) {
      this.collectParentCheck(value.parent);
      this.collectChildCheck(value.parent);
    }
  }

  collectChildCheck(value) {
    if (value.child != null) {
      for (const child of value.child) {
        if (child.parent != null) {
          child.parent.child = null;
          this.collectChildCheck(child);
        }
      }
    }
  }

  clearMenu() {
    this.childEdit.initData({});
  }

  refreshMenu() {
    this.childTree.fetchData();
  }

  deleteMenu(ids) {
    if (confirm(this.props.intl.formatMessage({ id: 'app.message.menu.confirm_delete', defaultMessage: "Are you sure you want to delete menus?" }))) {
      try {
        Webapis.deleteMenus(ids).then((response) => {
          this.showNotification('delete successed', 'success');
          this.refreshMenu();
        },
          (error) => {
          });
      } catch (e) {
        console.error(e)
      }
    } else {
    }
  }

  onSubmitMenu(values) {
    try {
      if (values.get('id') != null) {
        Webapis.updateMenu(values, values.get('id')).then((response) => {
          this.showNotification('update successed', 'success');
          this.refreshMenu();
        },
          (error) => {
            this.showNotification(error.response.data.message, 'error');
            console.log('error', error.response.data.message);
          });
      } else {
        Webapis.addMenu(values).then((response) => {
          this.showNotification('add successed', 'success');
          this.refreshMenu();
        },
          (error) => {
            this.showNotification(error.response.data.message, 'error');
            console.log('error', error.response.data.message);
          });
      }
    } catch (e) {
      console.error(e);
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
    const { message, msgType } = this.state;
    const { classes, intl } = this.props;
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
        <PapperBlock whiteBg icon="ios-menu" title={intl.formatMessage({ id: 'app.admin.system.menu.title', defaultMessage: "Menu Manage" })} desc={intl.formatMessage({ id: 'app.admin.system.menu.title_description', defaultMessage: "This page is to manage menus." })}>
          <Grid container spacing={3}>
            <Grid item lg={6} item md={12} sm={12} xs={12}>
              <MenuTreeTable childTreeRef={ref => (this.childTree = ref)} gotoMenuDetail={(value) => this.gotoMenuDetail(value)}
                addClick={() => this.clearMenu()}
                deleteClick={(ids) => this.deleteMenu(ids)} />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <EditableMenu childEditRef={ref => (this.childEdit = ref)} onSubmit={(value) => this.onSubmitMenu(value)} />
            </Grid>
          </Grid>
        </PapperBlock>
      </div>
    );
  }
}

MenuManage.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

const mapStateToProps = state => ({
  force: state, // force state from reducer
});

const mapDispatchToProps = dispatch => ({
});

const MenuManageMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuManage);

export default withStyles(styles)(injectIntl(MenuManageMapped));



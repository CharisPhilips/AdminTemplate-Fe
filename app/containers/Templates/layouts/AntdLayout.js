import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { Hidden, Fade, ListItemIcon, SwipeableDrawer, Typography, BreadCrumb } from '@material-ui/core';

import { injectIntl, intlShape } from 'react-intl';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import Ionicon from 'react-ionicons';
import { Layout, Menu, Divider } from 'antd';
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
import { MenuUnfoldOutlined, MenuFoldOutlined, FullscreenOutlined, FullscreenExitOutlined, BulbOutlined } from '@ant-design/icons';
import logo from 'kilcote-images/logo_label.png';
import * as constants from 'kilcote-utils/constants';
import styles from '../antdStyle-jss'
const elem = document.documentElement;

class AntdLayout extends React.Component {

  state = {
    fullScreen: false,
  };

  handleClick(isMobile) {
    const { toggleDrawer, loadTransition } = this.props;
    console.log('isMobile', isMobile)
    if (isMobile != null && isMobile) {
      toggleDrawer();
      loadTransition(false);
    }
  }

  openFullScreen = () => {
    this.setState({ fullScreen: true });
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
  };

  closeFullScreen = () => {
    this.setState({ fullScreen: false });
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  turnMode = mode => {
    const { changeMode } = this.props;
    if (mode === 'light') {
      changeMode('dark');
    } else {
      changeMode('light');
    }
  };

  render() {
    const {
      classes,
      intl,
      children,
      toggleDrawer,
      sidebarOpen,
      pageLoaded,
      mode,
      history,
      bgPosition,
      changeMode,
    } = this.props;

    const { fullScreen } = this.state;

    const getMenus = (parent, menuArray, isRoot, isMobile) => menuArray.map((item, index) => {
      if (item.child) {
        return (
          <SubMenu key={item.key} title={getLocalizationName(item)} className={classNames(classes.siteSubMenu)} icon={item.icon && <Ionicon icon={item.icon} className="anticon" />}>
            {getMenus(item.key, item.child, false, isMobile)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item.key} className={classNames(classes.siteSubMenu)} icon={item.icon && <Ionicon icon={item.icon} className="anticon" />} onClick={() => this.handleClick(isMobile)}>
            {getLocalizationName(item)}
            <Link to={item.link} />
          </Menu.Item>
        );
      }
    });

    const getLocalizationName = item => {
      const name = Reflect.get(item, `name_${intl.locale}`);
      if (name == null || name.toString().trim().length <= 0) {
        return item.name;
      }
      return name;
    };
    const routes = this.props.authUser.get('routes');

    return (
      (routes != null && routes.length > 0) && (
        <Fragment>
          <Layout theme={mode}>
            <Fragment>
              <Fragment>
                <Hidden mdUp>
                  <Layout theme={mode} className={classNames(classes.siteSidebar, !sidebarOpen ? classes.sidebarOpenLeft : classes.sidebarCloseLeftMobile)}>
                    <SwipeableDrawer
                      onClose={toggleDrawer}
                      onOpen={toggleDrawer}
                      open={!sidebarOpen}
                      anchor={'left'}
                    >
                      <div theme={mode} trigger={null} className={classNames(classes.swipeDrawerPaper, classes.siteSideNavbarMobile, classes.siteSideNavbarMenu)}>
                        <Menu theme={mode} mode="inline" className={classes.siteSideMenu}>
                          {getMenus(null, routes, true, true)}
                        </Menu>
                      </div>
                    </SwipeableDrawer>
                  </Layout>
                </Hidden>
                <Hidden smDown>
                  <Layout theme={mode} className={classNames(classes.siteSidebar, sidebarOpen ? classes.sidebarOpenLeft : classes.sidebarCloseLeft)}>
                    <div className={classNames(classes.logo, classes.siteLayout, classes.siteSideNavbarMenu, !sidebarOpen ? classes.logoClose : classes.logo)}>
                      {
                        sidebarOpen ? (
                          <img src={logo} alt={constants.BRAND_NAME} />
                        ) : (
                          <MenuUnfoldOutlined className={classNames(classes.icon, classes.trigger, classes.triggerClose)} onClick={toggleDrawer} />
                        )
                      }
                    </div>
                    <Sider theme={mode} trigger={null} collapsible collapsed={!sidebarOpen} className={classNames(classes.siteSideNavbar, classes.siteSideNavbarMenu, !sidebarOpen ? classes.sidebarOpenLeft : classes.sidebarCloseLeft)}>
                      <Menu theme={mode} mode="inline" className={classes.siteSideMenu}>
                        {getMenus(null, routes, true, false)}
                      </Menu>
                    </Sider>
                  </Layout>
                </Hidden>
              </Fragment>
            </Fragment>
            <Layout className={classNames(classes.siteLayout)}>
              <Fragment>
                <Hidden lgUp>
                  <Hidden mdUp>
                    <Header theme={mode} className={classNames(classes.siteHeader, classes.siteLayout)}>
                      {
                        sidebarOpen && (
                          <MenuUnfoldOutlined className={classNames(classes.icon, classes.triggerMobile, classes.triggerClose)} onClick={toggleDrawer} />
                        )
                      }
                      <div className={classes.siteHeaderActionMobile}>
                        <BulbOutlined className={classNames(classes.icon, classes.actionIcon, classes.siteLayout)} onClick={() => this.turnMode(mode)} />
                      </div>
                    </Header>
                    <Content
                      className={classNames(classes.siteLayoutBackground, classes.siteContentMobile, !sidebarOpen ? classes.sidebarOpenRight : classes.sidebarCloseRight)}
                    >
                      <div className={!pageLoaded ? classes.hideApp : ''}>
                        {children}
                      </div>
                    </Content>
                  </Hidden>
                  <Hidden smDown>
                    <Header theme={mode} className={classNames(classes.siteHeader, classes.siteLayout, sidebarOpen ? classes.sidebarOpenRight : classes.sidebarCloseRight)}>
                      {
                        sidebarOpen && (
                          <MenuFoldOutlined className={classNames(classes.icon, classes.trigger, classes.triggerOpen)} onClick={toggleDrawer} />
                        )
                      }
                      <div className={classes.siteHeaderAction}>
                        {fullScreen ? (
                          <FullscreenExitOutlined className={classNames(classes.icon, classes.actionIcon, classes.siteLayout)} onClick={this.closeFullScreen} />
                        ) : (
                          <FullscreenOutlined className={classNames(classes.icon, classes.actionIcon, classes.siteLayout)} onClick={this.openFullScreen} />
                        )}
                        <BulbOutlined className={classNames(classes.icon, classes.actionIcon, classes.siteLayout)} onClick={() => this.turnMode(mode)} />
                      </div>
                    </Header>
                    <Content
                      className={classNames(classes.siteContentMedium, sidebarOpen ? classes.sidebarOpenRight : classes.sidebarCloseRight)}
                    >
                      <div className={!pageLoaded ? classes.hideApp : ''}>
                        {children}
                      </div>
                    </Content>
                  </Hidden>
                </Hidden>
                <Hidden mdDown>
                  <Header theme={mode} className={classNames(classes.siteLayoutBackground, classes.siteHeader, classes.siteLayout, sidebarOpen ? classes.sidebarOpenRight : classes.sidebarCloseRight)}>
                    {
                      sidebarOpen && (
                        <MenuFoldOutlined className={classNames(classes.icon, classes.trigger, classes.triggerOpen)} onClick={toggleDrawer} />
                      )
                    }
                    <div className={classes.siteHeaderAction}>
                      {fullScreen ? (
                        <FullscreenExitOutlined className={classNames(classes.icon, classes.actionIcon, classes.siteLayout)} onClick={this.closeFullScreen} />
                      ) : (
                        <FullscreenOutlined className={classNames(classes.icon, classes.actionIcon, classes.siteLayout)} onClick={this.openFullScreen} />
                      )}
                      <BulbOutlined className={classNames(classes.icon, classes.actionIcon, classes.siteLayout)} onClick={() => this.turnMode(mode)} />
                    </div>
                    <Menu theme={mode} mode="horizontal" className={classes.siteTopMenu} inlineIndent={10}>
                      {getMenus(null, routes, true)}
                    </Menu>
                  </Header>
                  <Content
                    className={classNames(classes.siteLayoutBackground, classes.siteContent, sidebarOpen ? classes.sidebarOpenRight : classes.sidebarCloseRight)}
                  >
                    <div className={!pageLoaded ? classes.hideApp : ''}>
                      {children}
                    </div>
                  </Content>
                </Hidden>
              </Fragment>
            </Layout>
          </Layout>
        </Fragment>
      )
    );
  }
}

AntdLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  pageLoaded: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  gradient: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
  bgPosition: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  titleException: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  authUser: state.getIn(['auth', 'authUser']),
  mode: state.getIn(['ui', 'type']),
});

const mapDispatchToProps = dispatch => ({
});

const AntdLayoutMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(AntdLayout);

export default (withStyles(styles)(injectIntl(AntdLayoutMapped)));

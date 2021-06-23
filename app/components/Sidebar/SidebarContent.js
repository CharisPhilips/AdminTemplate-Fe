import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import * as constants from 'kilcote-utils/constants';
import logo from 'kilcote-images/logo_label.png';

import MainMenu from './MainMenu';
import styles from './sidebar-jss';

class SidebarContent extends React.Component {
  state = {
    transform: 0,
  };

  componentDidMount = () => {
    const mainContent = document.getElementById('sidebar');
    mainContent.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    const mainContent = document.getElementById('sidebar');
    mainContent.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (event) => {
    const scroll = event.target.scrollTop;
    this.setState({
      transform: scroll
    });
  }

  render() {
    const {
      classes,
      turnDarker,
      drawerPaper,
      toggleDrawerOpen,
      loadTransition,
      leftSidebar,
      dataMenu,
      status,
      anchorEl,
      openMenuStatus,
      closeMenuStatus,
      changeStatus,
      authUser,
      isLogin
    } = this.props;

    const { transform } = this.state;
    const email = (authUser != null && authUser.get('email') != null && this.props.authUser.get('email').length != null) ? authUser.get('email') : 'anonymous'
    const avatar = (authUser != null && authUser.get('avatar') != null && this.props.authUser.get('avatar').length != null) ? authUser.get('avatar') : '/images/avatars/pp_boy.svg'
    const setStatus = st => {
      switch (st) {
        case 'online':
          return classes.online;
        case 'idle':
          return classes.idle;
        case 'bussy':
          return classes.bussy;
        default:
          return classes.offline;
      }
    };
    return (
      <div className={classNames(classes.drawerInner, !drawerPaper ? classes.drawerPaperClose : '')}>
        <div className={classes.drawerHeader}>
          <NavLink to="/app" className={classNames(classes.brand, classes.brandBar, turnDarker && classes.darker)}>
            <img src={logo} alt={constants.BRAND_NAME} />
          </NavLink>
          {isLogin && (
            <div
              className={classNames(classes.profile, classes.user)}
              style={{ opacity: 1 - (transform / 100), marginTop: transform * -0.3 }}
            >
              <Avatar
                alt={email}
                src={avatar}
                className={classNames(classes.avatar, classes.bigAvatar)}
              />
              <div>
                <h4>{email}</h4>
                <Button size="small" onClick={openMenuStatus}>
                  <i className={classNames(classes.dotStatus, setStatus(status))} />
                  {status}
                </Button>
                <Menu
                  id="status-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={closeMenuStatus}
                  className={classes.statusMenu}
                >
                  <MenuItem onClick={() => changeStatus('online')}>
                    <i className={classNames(classes.dotStatus, classes.online)} />
                    Online
                  </MenuItem>
                  <MenuItem onClick={() => changeStatus('idle')}>
                    <i className={classNames(classes.dotStatus, classes.idle)} />
                    Idle
                  </MenuItem>
                  <MenuItem onClick={() => changeStatus('bussy')}>
                    <i className={classNames(classes.dotStatus, classes.bussy)} />
                    Bussy
                  </MenuItem>
                  <MenuItem onClick={() => changeStatus('offline')}>
                    <i className={classNames(classes.dotStatus, classes.offline)} />
                    Offline
                  </MenuItem>
                </Menu>
              </div>
            </div>
          )}
        </div>
        <div
          id="sidebar"
          className={
            classNames(
              classes.menuContainer,
              leftSidebar && classes.rounded,
              isLogin && classes.withProfile
            )
          }
        >
          <MainMenu loadTransition={loadTransition} dataMenu={dataMenu} toggleDrawerOpen={toggleDrawerOpen} />
        </div>
      </div>
    );
  }
}

SidebarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  drawerPaper: PropTypes.bool.isRequired,
  turnDarker: PropTypes.bool,
  toggleDrawerOpen: PropTypes.func,
  loadTransition: PropTypes.func,
  leftSidebar: PropTypes.bool.isRequired,
  dataMenu: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  anchorEl: PropTypes.object,
  openMenuStatus: PropTypes.func.isRequired,
  closeMenuStatus: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  isLogin: PropTypes.bool
};

SidebarContent.defaultProps = {
  turnDarker: false,
  toggleDrawerOpen: () => { },
  loadTransition: () => { },
  anchorEl: null,
  isLogin: true,
};

const mapStateToProps = state => ({
  force: state,
  authUser: state.getIn(['auth', 'authUser'])
});

const mapDispatchToProps = dispatch => ({
});

const SidebarContentMaped = connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarContent);


export default withStyles(styles)(SidebarContentMaped);

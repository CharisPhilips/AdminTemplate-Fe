import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import ButtonBase from '@material-ui/core/ButtonBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import styles from './sidebarBig-jss';

class MenuProfile extends React.Component {
  state = {
    status: 'online', //dummy.user.status
    anchorEl: null,
  }

  handleOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleChangeStatus = status => {
    this.setState({ status });
    this.handleClose();
  }

  render() {
    const { classes, authUser } = this.props;
    const { anchorEl, status } = this.state;

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
      <div>
        <ButtonBase className={classes.avatarHead} onClick={this.handleOpen}>
          <Avatar
            alt={email}
            src={avatar}
            className={classNames(classes.avatar, classes.bigAvatar)}
          />
          <i className={classNames(classes.dotStatus, classes.pinned, setStatus(status))} />
        </ButtonBase>
        <Menu
          id="status-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          className={classes.statusMenu}
        >
          <MenuItem className={classes.profile}>
            <Avatar
              alt={email}
              src={avatar}
              className={classNames(classes.avatar, classes.bigAvatar)}
            />
            <div className={classes.name}>
              <h5>{email}</h5>
              <i className={classNames(classes.dotStatus, setStatus(status))} />
              {status}
            </div>
          </MenuItem>
          <MenuItem onClick={() => this.handleChangeStatus('online')}>
            <i className={classNames(classes.dotStatus, classes.online)} />
            online
          </MenuItem>
          <MenuItem onClick={() => this.handleChangeStatus('idle')}>
            <i className={classNames(classes.dotStatus, classes.idle)} />
            idle
          </MenuItem>
          <MenuItem onClick={() => this.handleChangeStatus('bussy')}>
            <i className={classNames(classes.dotStatus, classes.bussy)} />
            bussy
          </MenuItem>
          <MenuItem onClick={() => this.handleChangeStatus('offline')}>
            <i className={classNames(classes.dotStatus, classes.offline)} />
            offline
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

MenuProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

MenuProfile.defaultProps = {
  anchorEl: null,
  isLogin: false,
};

const mapStateToProps = state => ({
  force: state,
  authUser: state.getIn(['auth', 'authUser'])
});

const mapDispatchToProps = dispatch => ({
});

const MenuProfileMaped = connect(
  mapStateToProps,
  mapDispatchToProps
  )(MenuProfile);
  
  export default withStyles(styles)(MenuProfileMaped);
import React from 'react';
import PropTypes from 'prop-types';
import { closeAllAction } from 'kilcote-actions/UiActions';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Link, NavLink } from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import Ionicon from 'react-ionicons';
import ExpandMore from '@material-ui/icons/ExpandMore';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { injectIntl, intlShape } from 'react-intl';
import styles from './header-jss';

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  if (props.to != null) {
    return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
  }
  return <></>;
});

// eslint-disable-next-line
class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: [],
      openMenu: [],
      anchorEl: null
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpenMenu = this.handleOpenMenu.bind(this);
  }

  componentDidMount() {
    const { open } = this.props;
    this.setState({ active: open });
  }

  handleOpenMenu = (event, key, keyParent) => {
    const { openSubMenu } = this.props;
    openSubMenu(key, keyParent);
    // this.setState({ anchorEl: event.currentTarget });
    setTimeout(() => {
      this.setState({ openMenu: this.props.open });
    }, 50);
  };

  handleClose = event => {
    const { closeAll } = this.props;
    closeAll();
    // if (this.anchorEl.contains(event.target)) {
    //   return;
    // }
    this.setState({ openMenu: [] });
  }

  handleActiveParent = (event, key) => {
    this.setState({
      active: [key],
      openMenu: []
    });
  }

  render() {
    const {
      classes, intl, open, dataMenu
    } = this.props;
    const { active, openMenu, anchorEl } = this.state;

    const getLocalizationName = item => {
      const name = Reflect.get(item, `name_${intl.locale}`);
      if (name == null || name.toString().trim().length <= 0) {
        return item.name;
      }
      return name;
    };

    const getMenus = (parent, menuArray, isRoot) => menuArray.map((item, index) => {
      if (item.child) {
        return (
          <div key={index.toString()}>
            <Button
              aria-owns={open ? 'menu-list-grow' : undefined}
              className={
                classNames(
                  classes.headMenu,
                  open.indexOf(item.key) > -1 ? classes.opened : '',
                  active.indexOf(item.key) > -1 ? classes.selected : ''
                )
              }
              onClick={(event) => this.handleOpenMenu(event, item.key, parent)}
            >
              {getLocalizationName(item)}
              <ExpandMore className={classes.rightIcon} />
            </Button>
            <Popper
              open={openMenu.indexOf(item.key) != -1}
              className={classes.menuPopper}
              anchorEl={anchorEl}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="menu-list-grow"
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper className={classes.dropDownMenu}>
                    <ClickAwayListener onClickAway={this.handleClose}>
                      <List role="menu" component="nav" className={classes.paperMenu}>
                        {getMenus(item.key, item.child, false)}
                      </List>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        );
      }
      if (isRoot) {
        return (
          <div key={index.toString()}>
            <Link
              to={item.link}
              style={{ textDecoration: 'none' }}
            >
              <Button
                aria-owns={open ? 'menu-list-grow' : undefined}
                className={
                  classNames(
                    classes.headMenu,
                    open.indexOf(item.key) > -1 ? classes.opened : '',
                    active.indexOf(item.key) > -1 ? classes.selected : ''
                  )
                }
                onClick={(event) => this.handleActiveParent(event, parent)}
              >
                {getLocalizationName(item) + '\u00A0'}
                <Ionicon fontSize="24px" icon={item.icon} size="medium" />
              </Button>
            </Link>
          </div>
        );
      }
      if (item.title) {
        return (
          <ListSubheader component="div" key={index.toString()} className={classes.title}>{getLocalizationName(item)}</ListSubheader>
        );
      }
      return (
        <ListItem
          key={index.toString()}
          button
          exact
          className={classes.menuItem}
          activeClassName={classes.active}
          component={LinkBtn}
          to={item.link}
          onClick={(event) => this.handleActiveParent(event, parent)}
        >
          <ListItemText primary={getLocalizationName(item)} />
        </ListItem>
      );
    });
    return (
      <nav className={classes.mainMenu}>
        <div>
          {getMenus(null, dataMenu, true)}
        </div>
      </nav>
    );
  }
}

MainMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  open: PropTypes.object.isRequired,
  openSubMenu: PropTypes.func.isRequired,
  closeAll: PropTypes.func.isRequired,
  dataMenu: PropTypes.array.isRequired,
};

const openAction = (key, keyParent) => ({ type: 'OPEN_SUBMENU', key, keyParent });
const reducer = 'ui';

const mapStateToProps = state => ({
  force: state, // force active class for sidebar menu
  open: state.getIn([reducer, 'subMenuOpen'])
});

const mapDispatchToProps = dispatch => ({
  openSubMenu: bindActionCreators(openAction, dispatch),
  closeAll: () => dispatch(closeAllAction),
});

const MainMenuMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMenu);

export default withStyles(styles)(injectIntl(MainMenuMapped));

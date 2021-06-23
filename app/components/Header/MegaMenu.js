import React from 'react';
import PropTypes from 'prop-types';
import { closeAllAction } from 'kilcote-actions/UiActions';
import { withStyles } from '@material-ui/core/styles';
import { Link, NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Popper from '@material-ui/core/Popper';
import ExpandMore from '@material-ui/icons/ExpandMore';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Ionicon from 'react-ionicons';
import Grid from '@material-ui/core/Grid';
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
class MegaMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: [],
      openMenu: [],
      anchorEl: null,
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

  handleClose = (event) => {
    const { closeAll } = this.props;
    closeAll();
    // if (this.anchorEl.contains(event.target)) {
    //   return;
    // }
    this.setState({ openMenu: [] });
  }

  handleActiveParent = (event, key, parent) => {
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
              aria-haspopup="true"
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
              open={openMenu.indexOf(item.key) > -1}
              className={classes.menuPopper}
              anchorEl={anchorEl}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Fade
                  {...TransitionProps}
                  id="menu-list-grow"
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper className={classes.dropDownMegaMenu}>
                    <ClickAwayListener onClickAway={this.handleClose}>
                      <Grid container >
                        <Grid item md={3} container spacing={0} justify="center">
                          <span className={classes.bigIcon}>
                            <Ionicon icon={item.icon} />
                          </span>
                        </Grid>
                        <Grid item md={9}>
                          <List role="menu" component="nav" className={classes.megaMenu}>
                            {getMenus(item.key, item.child, false)}
                          </List>
                        </Grid>
                      </Grid>
                    </ClickAwayListener>
                  </Paper>
                </Fade>
              )}
            </Popper>
          </div>
        );
      } if (isRoot) {
        return (
          <div key={index.toString()}>
            <Link
              to={item.link}
              style={{ textDecoration: 'none' }}
            >
              <Button
                aria-haspopup="true"
                className={
                  classNames(
                    classes.headMenu,
                    open.indexOf(item.key) > -1 ? classes.opened : '',
                    active.indexOf(item.key) > -1 ? classes.selected : ''
                  )
                }
                onClick={(event) => this.handleActiveParent(event, item.key)}
              >
                {getLocalizationName(item) + '\u00A0'}
                <Ionicon fontSize="24px" icon={item.icon} />
              </Button>
            </Link>
          </div>
        );
      }
      if (item.title) {
        return (
          <ListSubheader
            component="div"
            key={index.toString()}
            className={classes.title}
          >
            {getLocalizationName(item)}
          </ListSubheader>
        );
      }
      return (
        <ListItem
          key={index.toString()}
          button
          exact
          className={classes.megaItem}
          activeClassName={classes.selected}
          component={LinkBtn}
          to={item.link}
          onClick={() => this.handleActiveParent(event, item.key, parent)}
        >
          <ListItemText primary={getLocalizationName(item)} />
        </ListItem>
      );
    });
    return (
      <nav className={classes.mainMenu}>
        <div className={classes.megaMenu}>
          {getMenus(null, dataMenu, true)}
        </div>
      </nav>
    );
  }
}

MegaMenu.propTypes = {
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

const MegaMenuMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(MegaMenu);

export default withStyles(styles)(injectIntl(MegaMenuMapped));

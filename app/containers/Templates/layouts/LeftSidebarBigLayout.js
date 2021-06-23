import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import {
  Header,
  SidebarBig,
  BreadCrumb,
} from 'kilcote-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import dataMenu from 'kilcote-api/ui/menu';
import Decoration from '../Decoration';
import styles from '../appStyles-jss';

class LeftSidebarBigLayout extends React.Component {

  render() {
    const {
      classes,
      children,
      toggleDrawer,
      sidebarOpen,
      loadTransition,
      pageLoaded,
      mode,
      gradient,
      deco,
      history,
      bgPosition,
      changeMode,
      place,
      titleException,
    } = this.props;

    const routes = this.props.authUser.get('routes');

    return (
      (routes != null && routes.length > 0) ? (
        <Fragment>
          <Header
            toggleDrawerOpen={toggleDrawer}
            margin={sidebarOpen}
            gradient={gradient}
            position="left-sidebar-big"
            changeMode={changeMode}
            mode={mode}
            title={place}
            history={history}
          />
          <SidebarBig
            dataMenu={routes}
            loadTransition={loadTransition}
            open={sidebarOpen}
            toggleDrawerOpen={toggleDrawer}
          />
          <main className={classNames(classes.content, !sidebarOpen ? classes.contentPaddingLeftBig : '')} id="mainContent">
            <Decoration
              mode={mode}
              gradient={gradient}
              decoration={deco}
              bgPosition={bgPosition}
              horizontalMenu={false}
            />
            <section className={classNames(classes.mainWrap, classes.sidebarLayout)}>
              {titleException.indexOf(history.location.pathname) < 0 && (
                <div className={classes.pageTitle}>
                  <Typography component="h4" className={bgPosition === 'header' ? classes.darkTitle : classes.lightTitle} variant="h4">{place}</Typography>
                  <BreadCrumb separator=" / " theme={bgPosition === 'header' ? 'dark' : 'light'} location={history.location} />
                </div>
              )}
              {!pageLoaded && (<img src="/images/spinner.gif" alt="spinner" className={classes.circularProgress} />)}
              <Fade
                in={pageLoaded}
                mountOnEnter
                unmountOnExit
                {...(pageLoaded ? { timeout: 700 } : {})}
              >
                <div className={!pageLoaded ? classes.hideApp : ''}>
                  {/* Application content will load here */}
                  {children}
                </div>
              </Fade>
            </section>
          </main>
        </Fragment>
      ) : (
        <></>
      )
    );
  }
}

LeftSidebarBigLayout.propTypes = {
  classes: PropTypes.object.isRequired,
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
  authUser: state.getIn(['auth', 'authUser'])
});

const mapDispatchToProps = dispatch => ({
});

const LeftSidebarBigLayoutMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftSidebarBigLayout);

export default withStyles(styles)(LeftSidebarBigLayoutMapped);

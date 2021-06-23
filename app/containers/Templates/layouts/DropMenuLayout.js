import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { HeaderMenu, BreadCrumb } from 'kilcote-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import dataMenu from 'kilcote-api/ui/menu';
import Decoration from '../Decoration';
import styles from '../appStyles-jss';

class DropMenuLayout extends React.Component {
  render() {
    const {
      classes,
      children,
      pageLoaded,
      mode,
      gradient,
      deco,
      bgPosition,
      changeMode,
      place,
      history,
      titleException,
      toggleDrawer,
      sidebarOpen,
      loadTransition
    } = this.props;

    const routes = this.props.authUser.get('routes');

    return (
      (routes != null && routes.length > 0) ? (
        <Fragment>
          <HeaderMenu
            type="top-navigation"
            dataMenu={routes}
            changeMode={changeMode}
            mode={mode}
            history={history}
            toggleDrawerOpen={toggleDrawer}
            openMobileNav={sidebarOpen}
            loadTransition={loadTransition}
            logoLink="/app"
          />
          <main
            className={
              classNames(
                classes.content,
                classes.highMargin
              )
            }
            id="mainContent"
          >
            <Decoration
              mode={mode}
              gradient={gradient}
              decoration={deco}
              bgPosition={bgPosition}
              horizontalMenu
            />
            <section className={classNames(classes.mainWrap, classes.topbarLayout)}>
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

DropMenuLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired,
  changeMode: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
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

const DropMenuLayoutMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(DropMenuLayout);

export default (withStyles(styles)(DropMenuLayoutMapped));

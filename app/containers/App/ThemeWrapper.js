import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Loading from 'react-loading-bar';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/styles';
import { bindActionCreators } from 'redux';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import 'kilcote-styles/vendors/react-loading-bar/index.css';
import {
  fetchThemeRequestAction,
  changeThemeAction,
  changeRandomThemeAction,
  changeModeAction,
  changeGradientAction,
  changeDecoAction,
  changeBgPositionAction,
  changeLayoutAction,
  changeDirectionAction
} from 'kilcote-actions/UiActions';

import {
  changeLocale,
} from '../LanguageProvider/actions';

import { TemplateSettings } from 'kilcote-components';
import applicationTheme from '../../styles/theme/applicationTheme';

const styles = {
  root: {
    width: '100%',
    minHeight: '100%',
    marginTop: 0,
    zIndex: 1,
  },
};

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

export const AppContext = React.createContext();

class ThemeWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLoaded: false,
      theme: null //createMuiTheme(applicationTheme(props.color, props.mode, props.direction)),
    };
  }

  componentWillMount = () => {
    this.onProgressShow();
  }

  componentDidMount = () => {
    const { fetchTheme } = this.props;
    this.playProgress();
    fetchTheme();
    this.handleFetchTheme();
  }

  handleFetchTheme() {
    const { palette, fetchTheme, isFetchedTheme } = this.props;
    setTimeout(() => {
      if (palette != null && isFetchedTheme) {
        this.setState({
          pageLoaded: true,
          theme: createMuiTheme(applicationTheme(palette, this.props.color, this.props.mode, this.props.direction)),
        });
      } else {
        this.handleFetchTheme();
      }
    }, 50);
  }

  componentWillUnmount() {
    this.onProgressShow();
  }

  onProgressShow = () => {
    this.setState({ pageLoaded: true });
  }

  onProgressHide = () => {
    this.setState({ pageLoaded: false });
  }

  playProgress = () => {
    this.onProgressShow();
    setTimeout(() => {
      this.onProgressHide();
    }, 500);
  }

  handleChangeLanguage = event => {
    this.props.changeLocale(event.target.value);
  }

  handleChangeTheme = event => {
    const { mode, changeTheme, direction, palette } = this.props;
    this.setState({ theme: createMuiTheme(applicationTheme(palette, event.target.value, mode, direction)) });
    changeTheme(event.target.value);
  };

  handleChangeRandomTheme = () => {
    const { mode, direction, palette } = this.props;
    this.props.changeRandomTheme(); // eslint-disable-line
    setTimeout(() => {
      this.setState({ theme: createMuiTheme(applicationTheme(palette, this.props.color, mode, direction)) }); // eslint-disable-line
    }, 500);
  };

  handleChangeMode = mode => {
    const { color, changeMode, direction, palette } = this.props;
    this.setState({ theme: createMuiTheme(applicationTheme(palette, color, mode, direction)) });
    changeMode(mode);
  };

  handleChangeGradient = value => {
    const { changeGradient } = this.props;
    changeGradient(value);
  }

  handleChangeDecoration = value => {
    const { changeDecoration } = this.props;
    changeDecoration(value);
  }

  handleChangeBgPosition = value => {
    const { changeBgPosition } = this.props;
    changeBgPosition(value);
  }

  handleChangeLayout = value => {
    const { changeLayout } = this.props;
    changeLayout(value);
  }

  handleChangeDirection = dirVal => {
    // Set reducer state direction
    const { changeDirection, color, mode, palette } = this.props;
    this.setState({ theme: createMuiTheme(applicationTheme(palette, color, mode, dirVal)) });
    changeDirection(dirVal);

    // Set HTML root direction attribute
    document.dir = dirVal;
  };

  render() {
    const {
      classes,
      children,
      language,
      color,
      mode,
      gradient,
      decoration,
      bgPosition,
      layout,
      direction,
      palette
    } = this.props;
    const { pageLoaded, theme } = this.state;

    return (
      (theme != null) ? (
        <StylesProvider jss={jss}>
          <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
              <Loading
                show={pageLoaded}
                color="rgba(255,255,255,.9)"
                showSpinner={false}
              />
              <TemplateSettings
                language={language}
                palette={palette}
                selectedValue={color}
                mode={mode}
                gradient={gradient}
                decoration={decoration}
                bgPosition={bgPosition}
                layout={layout}
                direction={direction}
                changeLanguage={this.handleChangeLanguage}
                changeTheme={this.handleChangeTheme}
                changeRandomTheme={this.handleChangeRandomTheme}
                changeMode={this.handleChangeMode}
                changeGradient={this.handleChangeGradient}
                changeDecoration={this.handleChangeDecoration}
                changeBgPosition={this.handleChangeBgPosition}
                changeLayout={this.handleChangeLayout}
                changeDirection={this.handleChangeDirection}
              />
              <AppContext.Provider value={this.handleChangeMode}>
                {children}
              </AppContext.Provider>
            </div>
          </MuiThemeProvider>
        </StylesProvider>
      ) : (
        <></>
      )
    );
  }
}

ThemeWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  language: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  gradient: PropTypes.bool.isRequired,
  decoration: PropTypes.bool.isRequired,
  bgPosition: PropTypes.string.isRequired,
  palette: PropTypes.object.isRequired,
  layout: PropTypes.string.isRequired,
  changeTheme: PropTypes.func.isRequired,
  changeRandomTheme: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired,
  changeGradient: PropTypes.func.isRequired,
  changeDecoration: PropTypes.func.isRequired,
  changeBgPosition: PropTypes.func.isRequired,
  changeLayout: PropTypes.func.isRequired,
  changeDirection: PropTypes.func.isRequired,
};

const reducer = 'ui';
const mapStateToProps = state => ({
  force: state, // force state from reducer
  language: state.getIn(['language', 'locale']),
  color: state.getIn([reducer, 'theme']),
  palette: state.getIn([reducer, 'palette']),
  mode: state.getIn([reducer, 'type']),
  gradient: state.getIn([reducer, 'gradient']),
  decoration: state.getIn([reducer, 'decoration']),
  bgPosition: state.getIn([reducer, 'bgPosition']),
  layout: state.getIn([reducer, 'layout']),
  direction: state.getIn([reducer, 'direction']),
  isFetchedTheme: state.getIn([reducer, 'isFetchedTheme']),
});

const dispatchToProps = dispatch => ({
  changeLocale: bindActionCreators(changeLocale, dispatch),
  fetchTheme: bindActionCreators(fetchThemeRequestAction, dispatch),
  changeTheme: bindActionCreators(changeThemeAction, dispatch),
  changeRandomTheme: () => dispatch(changeRandomThemeAction),
  changeMode: bindActionCreators(changeModeAction, dispatch),
  changeGradient: bindActionCreators(changeGradientAction, dispatch),
  changeDecoration: bindActionCreators(changeDecoAction, dispatch),
  changeBgPosition: bindActionCreators(changeBgPositionAction, dispatch),
  changeLayout: bindActionCreators(changeLayoutAction, dispatch),
  changeDirection: bindActionCreators(changeDirectionAction, dispatch),
});

const ThemeWrapperMapped = connect(
  mapStateToProps,
  dispatchToProps
)(ThemeWrapper);

export default withStyles(styles)(ThemeWrapperMapped);

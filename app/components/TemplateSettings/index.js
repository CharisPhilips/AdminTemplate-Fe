import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Fab from '@material-ui/core/Fab';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import ArrowBack from '@material-ui/icons/ArrowBack';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Palette from '@material-ui/icons/Palette';
import Close from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

// import {
//   IconFlagUS,
//   IconFlagIN,
//   IconFlagDE,
//   IconFlagRU,
//   IconFlagFR,
// } from 'material-ui-flags';

import {
  LeftSidebarThumb,
  LeftSidebarBigThumb,
  TopNavigationThumb,
  MegaMenuThumb,
  AntdThemeThumb
} from './templatePreview';

import ThemeThumb from './ThemeThumbs';
import LayoutThumb from './LayoutThumb';
import styles from './settings-jss';

function TabContainer({ children }) {
  return (
    <Typography component="div" style={{ padding: 8 * 1.5 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class TemplateSettings extends React.Component {
  state = {
    type: 0,
    show: false,
    showAllThemes: false
  };

  // Tab Handle
  handleChangeTab = (event, type) => {
    this.setState({ type });
  };

  handleChangeIndexTab = index => {
    this.setState({ type: index });
  };

  // Language
  handleLangChange = event => {
    const { changeLanguage } = this.props;
    changeLanguage(event)
  }

  // Theme Mode Handle
  handleSwitchMode = name => event => {
    const { changeMode } = this.props;
    const mode = event.target.checked ? 'dark' : 'light';
    changeMode(mode);
    this.setState({ [name]: event.target.checked });
  };

  handeSwitchDirection = name => event => {
    const { changeDirection } = this.props;
    const dir = event.target.checked ? 'rtl' : 'ltr';
    changeDirection(dir);
    this.setState({ [name]: event.target.checked });
  }

  // Background Position Handle
  handleBgChangePosition = event => {
    const { changeBgPosition } = this.props;
    this.setState({ [event.target.name]: event.target.value });
    changeBgPosition(event.target.value);
  };

  // Decoration Handle
  handleChangeDecoration = name => event => {
    const { changeDecoration } = this.props;
    this.setState({ [name]: event.target.checked });
    changeDecoration(event.target.checked);
  };

  // Decoration Handle
  handleChangeGradient = name => event => {
    const { changeGradient } = this.props;
    this.setState({ [name]: event.target.checked });
    changeGradient(event.target.checked);
  };

  // Layout Handle
  handleChangeLayout = event => {
    const { changeLayout } = this.props;
    changeLayout(event.target.value);
  };

  // Show Hide Panel
  handleTogglePanel = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  }

  // Toggle All Themes
  handleToggleAllThemes = () => {
    const { showAllThemes } = this.state;
    this.setState({ showAllThemes: !showAllThemes });
  }

  render() {
    const {
      classes,
      intl,
      palette,
      mode,
      gradient,
      decoration,
      bgPosition,
      language,
      selectedValue,
      layout,
      direction,
      changeTheme,
      changeRandomTheme
    } = this.props;

    const { show, type, showAllThemes } = this.state;

    const getItem = dataArray => dataArray.map((item, index) => (
      <FormControlLabel
        key={index.toString()}
        className={
          classNames(
            classes.themeField,
            index > 7 && !showAllThemes ? classes.hide : ''
          )
        }
        control={(
          <ThemeThumb
            value={item.key}
            selectedValue={selectedValue}
            handleChange={changeTheme}
            name={item.name}
          />
        )}
      />
    ));

    return (
      <aside
        className={
          classNames(
            classes.settingSidebar,
            layout === 'right-sidebar' ? classes.leftSidebar : classes.rightSidebar,
            show && classes.expanded
          )
        }
      >
        <div className={classes.toggleButton}>
          <Fab
            size="small"
            color="primary"
            aria-label="toggle"
            className={classes.button}
            onClick={this.handleTogglePanel}
            classes={{
              root: classes.buttonDrawer,
            }}
          >
            {show ? <Close /> : <Palette />}
          </Fab>
        </div>
        <Slide direction={direction === 'rtl' ? 'right' : 'left'} in={show} mountOnEnter unmountOnExit>
          <div className={classes.root}>
            <AppBar position="fixed" className={classes.tab} color="default">
              <div className={classes.header}>
                <IconButton
                  onClick={this.handleTogglePanel}
                  className={classes.backButton}
                  aria-label="Back"
                >
                  <ArrowBack />
                </IconButton>
                <Typography variant="button">Template Settings</Typography>
              </div>
              <Tabs
                value={type}
                onChange={this.handleChangeTab}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
              >
                <Tab label={intl.formatMessage({id: 'app.template.theme', defaultMessage: "Theme"})} />
                <Tab label={intl.formatMessage({id: 'app.template.layout', defaultMessage: "Layout"})} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              index={type}
              onChangeIndex={this.handleChangeIndexTab}
            >
              <TabContainer>
                <section className={classes.settingWraper}>
                  <Paper className={classes.optBlock}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend" className={classes.title}>
                        <Icon className={classes.icon}>language</Icon>
                        <FormattedMessage id="app.template.display_language" defaultMessage="Display Language"/>
                      </FormLabel>
                      <FormControl className={classNames(classes.formControl, classes.formOption)}>
                        <InputLabel htmlFor="language-selector"><FormattedMessage id="app.template.choose_language" defaultMessage="Choose Language"/></InputLabel>
                        <Select
                          value={language}
                          onChange={this.handleLangChange}
                          inputProps={{
                            name: 'language',
                            id: 'language-selector',
                          }}
                        >
                          <MenuItem value="en">
                            <svg
                              fill="#fff"
                              className={ classNames(classes.flag) }
                            >
                              <use xlinkHref="/images/flags/us.svg#flag-icon-css-us" />
                            </svg>
                            <FormattedMessage id="app.template.language_english" defaultMessage="English"/>
                          </MenuItem>
                          <MenuItem value="de">
                            <svg
                              fill="#fff"
                              className={ classNames(classes.flag) }
                            >
                              <use xlinkHref="/images/flags/de.svg#flag-icon-css-de" />
                            </svg>
                            <FormattedMessage id="app.template.language_Germany" defaultMessage="Germany"/>
                          </MenuItem>
                          <MenuItem value="cs">
                            <svg
                              fill="#fff"
                              className={ classNames(classes.flag) }
                            >
                              <use xlinkHref="/images/flags/cz.svg#flag-icon-css-cz" />
                            </svg>
                            <FormattedMessage id="app.template.language_Czech" defaultMessage="Czech"/>
                          </MenuItem>
                          <MenuItem value="pl">
                            <svg
                              fill="#fff"
                              className={ classNames(classes.flag) }
                            >
                              <use xlinkHref="/images/flags/pl.svg#flag-icon-css-pl" />
                            </svg>
                            <FormattedMessage id="app.template.language_Polish" defaultMessage="Polish"/>
                          </MenuItem>
                          <MenuItem value="ru">
                            <svg
                              fill="#fff"
                              className={ classNames(classes.flag) }
                            >
                              <use xlinkHref="/images/flags/ru.svg#flag-icon-css-ru" />
                            </svg>
                            <FormattedMessage id="app.template.language_Russian" defaultMessage="Russian"/>
                          </MenuItem>
                          <MenuItem value="fr">
                            <svg
                              fill="#fff"
                              className={ classNames(classes.flag) }
                            >
                              <use xlinkHref="/images/flags/fr.svg#flag-icon-css-fr" />
                            </svg>
                            <FormattedMessage id="app.template.language_France" defaultMessage="France"/>
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </FormControl>
                  </Paper>
                  <Paper className={classes.optBlock}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend" className={classes.title}>
                        <Icon className={classes.icon}>invert_colors</Icon>
                        <FormattedMessage id="app.template.theme_mode" defaultMessage="Theme Mode"/>
                      </FormLabel>
                      <FormGroup className={classes.themeMode}>
                        <span><FormattedMessage id="app.template.theme_mode_light" defaultMessage="Light Mode"/></span>
                        <FormControlLabel
                          className={classes.switch}
                          control={(
                            <Switch
                              checked={mode === 'dark'}
                              onChange={this.handleSwitchMode('dark')}
                              value="dark"
                              color="default"
                              classes={{
                                track: classes.themeCheckBar,
                                thumb: classes.themeCheck,
                              }}
                            />
                          )}
                        />
                        <span><FormattedMessage id="app.template.theme_mode_dark" defaultMessage="Dark Mode"/></span>
                      </FormGroup>
                    </FormControl>
                  </Paper>
                  <Paper className={classes.optBlock}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend" className={classes.title}>
                        <Icon className={classes.icon}>
                          format_textdirection_r_to_l
                        </Icon>
                        <FormattedMessage id="app.template.theme_layout_direction" defaultMessage="Layout Direction"/>
                      </FormLabel>
                      <FormGroup className={classes.themeMode}>
                        <span>LTR</span>
                        <FormControlLabel
                          className={classes.switch}
                          control={(
                            <Switch
                              checked={direction === 'rtl'}
                              onChange={this.handeSwitchDirection('rtl')}
                              value="rtl"
                              color="default"
                              classes={{
                                track: classes.themeCheckBar,
                                thumb: classes.themeCheck,
                              }}
                            />
                          )}
                        />
                        <span>RTL</span>
                      </FormGroup>
                    </FormControl>
                  </Paper>
                  <Paper className={classes.optBlock}>
                    <FormControl component="fieldset" className={classes.themeGroup}>
                      <FormLabel component="legend" className={classes.title}>
                        <Icon className={classes.icon}>color_lens</Icon>
                        <FormattedMessage id="app.template.theme_color" defaultMessage="Theme Color"/>
                      </FormLabel>
                      <div className={classes.randomThemeField}>
                        <ButtonBase onClick={() => changeRandomTheme()}>
                          <img src="/images/random.jpg" alt="random" />
                        </ButtonBase>
                      </div>
                      { palette !== undefined && getItem(palette) }
                      <div className={classes.center}>
                        <Button color="primary" onClick={this.handleToggleAllThemes}>
                          {showAllThemes ? intl.formatMessage({id: 'app.template.theme_hide_some', defaultMessage: "Hide Some"}) : intl.formatMessage({id: 'app.template.theme_show_all', defaultMessage: "Show All"})}
                        </Button>
                      </div>
                    </FormControl>
                  </Paper>
                  <Paper className={classes.optBlock}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend" className={classes.title}>
                        <Icon className={classes.icon}>branding_watermark</Icon>
                        <FormattedMessage id="app.template.theme_background_size" defaultMessage="Background Size"/>
                      </FormLabel>
                      <FormControl className={classNames(classes.formControl, classes.formOption)}>
                        <InputLabel htmlFor="background-position">Choose Size</InputLabel>
                        <Select
                          value={bgPosition}
                          onChange={this.handleBgChangePosition}
                          inputProps={{
                            name: 'position',
                            id: 'background-position',
                          }}
                        >
                          <MenuItem value="header"><FormattedMessage id="app.template.theme_background_size_header" defaultMessage="Header"/></MenuItem>
                          <MenuItem value="half"><FormattedMessage id="app.template.theme_background_size_half" defaultMessage="Half"/></MenuItem>
                          <MenuItem value="full"><FormattedMessage id="app.template.theme_background_size_full" defaultMessage="Full"/></MenuItem>
                        </Select>
                      </FormControl>
                    </FormControl>
                  </Paper>
                  <Paper className={classes.optBlock}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend" className={classes.title}>
                        <Icon className={classes.icon}>texture</Icon>
                        <FormattedMessage id="app.template.theme_art_decoration" defaultMessage="Art Decoration"/>
                      </FormLabel>
                      <FormGroup row>
                        <FormControlLabel
                          control={(
                            <Checkbox
                              checked={decoration}
                              onChange={this.handleChangeDecoration('decorated')}
                              value="decorated"
                            />
                          )}
                          label={intl.formatMessage({id: 'app.template.theme_art_decoration_show', defaultMessage: "Show Art Decoration"})}
                        />
                      </FormGroup>
                      <FormGroup row>
                        <FormControlLabel
                          control={(
                            <Checkbox
                              checked={gradient}
                              onChange={this.handleChangeGradient('gradient')}
                              value="gradient"
                            />
                          )}
                          label={intl.formatMessage({id: 'app.template.theme_art_decoration_gradient', defaultMessage: "Use Gradient"})}
                        />
                      </FormGroup>
                    </FormControl>
                  </Paper>
                </section>
                {/* END */}
              </TabContainer>
              <TabContainer>
                <section className={classes.settingWraper}>
                  <Paper className={classes.optBlock}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend" className={classes.title}>
                        <Icon className={classes.icon}>chrome_reader_mode</Icon>
                        <FormattedMessage id="app.template.layout_title" defaultMessage="Navigation Layout"/>
                      </FormLabel>
                      <FormGroup row>
                        <FormControlLabel
                          className={classes.layoutField}
                          control={(
                            <LayoutThumb
                              value="left-sidebar"
                              selectedLayout={layout}
                              handleChange={this.handleChangeLayout}
                              name={intl.formatMessage({id: 'app.template.layout_left_sidebar', defaultMessage: "Left Sidebar"})}
                              preview={<LeftSidebarThumb />}
                            />
                          )}
                        />
                        <FormControlLabel
                          className={classes.layoutField}
                          control={(
                            <LayoutThumb
                              value="big-sidebar"
                              selectedLayout={layout}
                              handleChange={this.handleChangeLayout}
                              name={intl.formatMessage({id: 'app.template.layout_left_big_sidebar', defaultMessage: "Left Big Sidebar"})}
                              preview={<LeftSidebarBigThumb />}
                            />
                          )}
                        />
                        <FormControlLabel
                          className={classes.layoutField}
                          control={(
                            <LayoutThumb
                              value="top-navigation"
                              selectedLayout={layout}
                              handleChange={this.handleChangeLayout}
                              name={intl.formatMessage({id: 'app.template.layout_top_navigation', defaultMessage: "Top Navigation"})}
                              preview={<TopNavigationThumb />}
                            />
                          )}
                        />
                        <FormControlLabel
                          className={classes.layoutField}
                          control={(
                            <LayoutThumb
                              value="mega-menu"
                              selectedLayout={layout}
                              handleChange={this.handleChangeLayout}
                              name={intl.formatMessage({id: 'app.template.layout_mega_menu', defaultMessage: "Mega Menu"})}
                              preview={<MegaMenuThumb />}
                            />
                          )}
                        />
                        <FormControlLabel
                          className={classes.layoutField}
                          control={(
                            <LayoutThumb
                              value="antd-menu"
                              selectedLayout={layout}
                              handleChange={this.handleChangeLayout}
                              name={intl.formatMessage({id: 'app.template.layout_antd_menu', defaultMessage: "Antd Menu"})}
                              preview={<AntdThemeThumb />}
                            />
                          )}
                        />
                      </FormGroup>
                    </FormControl>
                  </Paper>
                </section>
              </TabContainer>
            </SwipeableViews>
          </div>
        </Slide>
      </aside>
    );
  }
}

TemplateSettings.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  palette: PropTypes.object,
  mode: PropTypes.string.isRequired,
  gradient: PropTypes.bool.isRequired,
  decoration: PropTypes.bool.isRequired,
  bgPosition: PropTypes.string.isRequired,
  selectedValue: PropTypes.string.isRequired,
  layout: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  changeTheme: PropTypes.func.isRequired,
  changeRandomTheme: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired,
  changeGradient: PropTypes.func.isRequired,
  changeDecoration: PropTypes.func.isRequired,
  changeBgPosition: PropTypes.func.isRequired,
  changeLayout: PropTypes.func.isRequired,
  changeDirection: PropTypes.func.isRequired,
};

TemplateSettings.defaultProps = {
  palette: undefined
};

export default withStyles(styles)(injectIntl(TemplateSettings));

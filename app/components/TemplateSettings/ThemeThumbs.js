import React from 'react';
import Radio from '@material-ui/core/Radio';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import themePalette from 'kilcote-utils/themePaletteMode';
import styles from './settings-jss';

const ThemeThumb = props => {
  const {
    classes,
    theme,
    palette,
    value,
    selectedValue,
    handleChange,
    name
  } = props;
  return (
    <div className={classNames(classes.thumb, theme === value ? classes.selectedTheme : '')}>
      <Radio
        checked={selectedValue === value}
        value={value}
        onChange={handleChange}
      />
      <Tooltip title={name} placement="top">
        <div className={classes.appPreview}>
          <div className={classes.decoration} style={{ backgroundImage: `linear-gradient(-45deg, ${themePalette(palette, value, 'themePalette').primary.main} 0%, ${themePalette(palette, value, 'themePalette').primary.main} 33%, ${themePalette(palette, value, 'themePalette').secondary.main} 100%)` }} />
          <ul>
            <li style={{ backgroundColor: themePalette(palette, value, 'themePalette').primary.main }} />
            <li style={{ backgroundColor: themePalette(palette, value, 'themePalette').secondary.main }} />
          </ul>
        </div>
      </Tooltip>
    </div>
  );
};

ThemeThumb.propTypes = {
  theme: PropTypes.string.isRequired,
  palette: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  selectedValue: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

// Redux
const reducer = 'ui';
const mapStateToProps = state => ({
  theme: state.getIn([reducer, 'theme']),
  palette: state.getIn([reducer, 'palette']),
});

const ThumbsMapped = connect(
  mapStateToProps,
)(ThemeThumb);

export default withStyles(styles)(ThumbsMapped);

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import { Field, reduxForm, change } from 'redux-form/immutable';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

import AddCircle from '@material-ui/icons/AddCircle';
import Save from '@material-ui/icons/Save';
import Clear from '@material-ui/icons/Clear';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import { CheckboxRedux, SelectRedux, TextFieldRedux, SwitchRedux } from 'kilcote-components/Forms/ReduxFormMUI';
import { initAction, clearAction } from 'kilcote-actions/ReduxFormActions';
import * as Auths from 'kilcote-utils/auth';
import styles from '../styles/edittheme-jss';
//main dialog

const required = value => (value == null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    valueselected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
)

const branch = 'editThemeForm';

class EditableTheme extends Component {

  saveRef = ref => {
    this.ref = ref;
    return this.ref;
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { childEditRef } = this.props;
    childEditRef(this);
    this.props.init();
  }

  componentWillUnmount() {
    const { childEditRef } = this.props;
    childEditRef(undefined);
  }

  initData(data) {
    this.props.init(data);
  }

  render() {
    const { classes, intl, authUser, reset, pristine, submitting, handleSubmit } = this.props
    const themeId = this.props.initialValues ? this.props.initialValues.get('id') : null;
    return (
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={10}>
            <Field
              name="name"
              component={TextFieldRedux}
              label={intl.formatMessage({ id: 'app.admin.system.theme.table_name', defaultMessage: "Theme Name" })}
              validate={required}
              required
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={10}>
            <Field
              name="key"
              component={TextFieldRedux}
              label={intl.formatMessage({ id: 'app.admin.system.theme.table_key', defaultMessage: "Theme Key" })}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={2} />
          {/* light palate */}
          <Grid item xs={12}>
            <span><FormattedMessage id="app.admin.system.theme.edit_l1_light" defaultMessage="Light" /></span>
          </Grid>
          {/* light/primary */}
          <Grid item xs={1} />
          <Grid item xs={11}>
            <span><FormattedMessage id="app.admin.system.theme.edit_l2_primary" defaultMessage="Primary" /></span>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={2}>
            <Field
              name="lightPalette.primary.light"
              component={TextFieldRedux}
              label={intl.formatMessage({ id: 'app.admin.system.theme.edit_l3_light', defaultMessage: "light" })}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={2}>
            <Field
              name="lightPalette.primary.dark"
              component={TextFieldRedux}
              label={intl.formatMessage({ id: 'app.admin.system.theme.edit_l3_dark', defaultMessage: "Dark" })}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={2}>
            <Field
              name="lightPalette.primary.main"
              component={TextFieldRedux}
              label={intl.formatMessage({ id: 'app.admin.system.theme.edit_l3_main', defaultMessage: "Main" })}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={2}>
            <Field
              name="lightPalette.primary.contrastText"
              component={TextFieldRedux}
              label={intl.formatMessage({ id: 'app.admin.system.theme.edit_l3_contrast_text', defaultMessage: "contrastText" })}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={2} />
          {/* light/secondary */}
          <Grid item xs={1} />
          <Grid item xs={11}>
            <span><FormattedMessage id="app.admin.system.theme.edit_l2_secondary" defaultMessage="Secondary" /></span>
          </Grid>
          <Grid item xs={2} />

          <Grid item xs={2}>
            <Field
              name="lightPalette.secondary.light"
              component={TextFieldRedux}
              label={intl.formatMessage({ id: 'app.admin.system.theme.edit_l3_light', defaultMessage: "light" })}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={2}>
            <Field
              name="lightPalette.secondary.dark"
              component={TextFieldRedux}
              label={intl.formatMessage({ id: 'app.admin.system.theme.edit_l3_dark', defaultMessage: "Dark" })}
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={2}>
            <Field
              name="lightPalette.secondary.main"
              component={TextFieldRedux}
              label={intl.formatMessage({ id: 'app.admin.system.theme.edit_l3_main', defaultMessage: "Main" })}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={2}>
            <Field
              name="lightPalette.secondary.contrastText"
              component={TextFieldRedux}
              label={intl.formatMessage({ id: 'app.admin.system.theme.edit_l3_contrast_text', defaultMessage: "contrastText" })}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={2} />

          {/* dark palette */}
          <Grid item xs={12}>
            <span><FormattedMessage id="app.admin.system.theme.edit_l1_dark" defaultMessage="Dark" /></span>
          </Grid>
          {/* dark/primary */}
          <Grid item xs={1} />
          <Grid item xs={11}>
            <span><FormattedMessage id="app.admin.system.theme.edit_l2_primary" defaultMessage="Primary" /></span>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={2}>
            <Field
              name="darkPalette.primary.light"
              component={TextFieldRedux}
              label={intl.formatMessage({ id: 'app.admin.system.theme.edit_l3_light', defaultMessage: "light" })}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={2}>
            <Field
              name="darkPalette.primary.dark"
              component={TextFieldRedux}
              label={intl.formatMessage({ id: 'app.admin.system.theme.edit_l3_dark', defaultMessage: "Dark" })}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={2}>
            <Field
              name="darkPalette.primary.main"
              component={TextFieldRedux}
              label={intl.formatMessage({ id: 'app.admin.system.theme.edit_l3_main', defaultMessage: "Main" })}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={2}>
            <Field
              name="darkPalette.primary.contrastText"
              component={TextFieldRedux}
              label={intl.formatMessage({ id: 'app.admin.system.theme.edit_l3_contrast_text', defaultMessage: "contrastText" })}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={2} />
          {/* dark/secondary */}
          <Grid item xs={1} />
          <Grid item xs={11}>
            <span><FormattedMessage id="app.admin.system.theme.edit_l2_secondary" defaultMessage="Secondary" /></span>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={2}>
            <Field
              name="darkPalette.secondary.light"
              component={TextFieldRedux}
              label={intl.formatMessage({ id: 'app.admin.system.theme.edit_l3_light', defaultMessage: "light" })}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={2}>
            <Field
              name="darkPalette.secondary.dark"
              component={TextFieldRedux}
              label={intl.formatMessage({ id: 'app.admin.system.theme.edit_l3_dark', defaultMessage: "Dark" })}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={2}>
            <Field
              name="darkPalette.secondary.main"
              component={TextFieldRedux}
              label={intl.formatMessage({ id: 'app.admin.system.theme.edit_l3_main', defaultMessage: "Main" })}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={2}>
            <Field
              name="darkPalette.secondary.contrastText"
              component={TextFieldRedux}
              label={intl.formatMessage({ id: 'app.admin.system.theme.edit_l3_contrast_text', defaultMessage: "contrastText" })}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={2} />

          {/* themePalette palette */}
          <Grid item xs={12}>
            <span><FormattedMessage id="app.admin.system.theme.edit_l1_theme_palette" defaultMessage="ThemePalette" /></span>
          </Grid>
          {/* themePalette/primary */}
          <Grid item xs={1} />
          <Grid item xs={11}>
            <span><FormattedMessage id="app.admin.system.theme.edit_l2_primary" defaultMessage="Primary" /></span>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={2}>
            <Field
              name="themePalette.primary.light"
              component={TextFieldRedux}
              label={intl.formatMessage({ id: 'app.admin.system.theme.edit_l3_light', defaultMessage: "light" })}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={2}>
            <Field
              name="themePalette.primary.dark"
              component={TextFieldRedux}
              label={intl.formatMessage({ id: 'app.admin.system.theme.edit_l3_dark', defaultMessage: "Dark" })}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={2}>
            <Field
              name="themePalette.primary.main"
              component={TextFieldRedux}
              label={intl.formatMessage({ id: 'app.admin.system.theme.edit_l3_main', defaultMessage: "Main" })}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={2}>
            <Field
              name="themePalette.primary.contrastText"
              component={TextFieldRedux}
              label={intl.formatMessage({ id: 'app.admin.system.theme.edit_l3_contrast_text', defaultMessage: "contrastText" })}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={2} />

          {/* themePalette/secondary */}
          <Grid item xs={1} />
          <Grid item xs={11}>
            <span><FormattedMessage id="app.admin.system.theme.edit_l2_secondary" defaultMessage="Secondary" /></span>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={2}>
            <Field
              name="themePalette.secondary.light"
              component={TextFieldRedux}
              label={intl.formatMessage({ id: 'app.admin.system.theme.edit_l3_light', defaultMessage: "light" })}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={2}>
            <Field
              name="themePalette.secondary.dark"
              component={TextFieldRedux}
              label={intl.formatMessage({ id: 'app.admin.system.theme.edit_l3_dark', defaultMessage: "Dark" })}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={2}>
            <Field
              name="themePalette.secondary.main"
              component={TextFieldRedux}
              label={intl.formatMessage({ id: 'app.admin.system.theme.edit_l3_main', defaultMessage: "Main" })}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={2}>
            <Field
              name="themePalette.secondary.contrastText"
              component={TextFieldRedux}
              label={intl.formatMessage({ id: 'app.admin.system.theme.edit_l3_contrast_text', defaultMessage: "contrastText" })}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={2} />
          <Grid item container item xs={10} direction="row" justify="flex-end" alignItems="flex-start">
            {(themeId != null && Auths.hasPermission(authUser, ['theme:update'])) &&
              <Button className={classes.button} color="primary" type="submit" variant="contained" size="small" disabled={submitting}>
                <Save className={classes.leftIcon} /><FormattedMessage id="app.button.update" defaultMessage="Update" />
              </Button>
            }
            {(themeId == null && Auths.hasPermission(authUser, ['theme:add'])) &&
              <Button className={classes.button} color="primary" type="submit" variant="contained" size="small" disabled={submitting}>
                <AddCircle className={classes.leftIcon} /><FormattedMessage id="app.button.add" defaultMessage="Add" />
              </Button>
            }
            {(Auths.hasAnyPermission(authUser, ['theme:add', 'theme:update'])) && (
              <Button className={classes.button} type="button" disabled={pristine || submitting} onClick={reset} >
                <Clear className={classes.leftIcon} /><FormattedMessage id="app.button.reset" defaultMessage="Reset" />
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    );
  }
}

EditableTheme.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  init: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  force: state,
  authUser: state.getIn(['auth', 'authUser']),
  initialValues: state.getIn(['initval', 'formValues']),
  editValues: state.getIn(['form', branch])
});

const mapDispatchToProps = dispatch => ({
  init: bindActionCreators(initAction, dispatch),
  // clear: bindActionCreators(clearAction, dispatch),
  clear: () => dispatch(clearAction),
});

const ReduxFormMapped = reduxForm({
  form: branch,
  enableReinitialize: true,
})(EditableTheme);

const CrudThemeEditMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxFormMapped);

export default withStyles(styles)(injectIntl(CrudThemeEditMapped));


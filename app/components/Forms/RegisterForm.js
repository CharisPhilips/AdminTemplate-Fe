import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForward';
import AllInclusive from '@material-ui/icons/AllInclusive';
import Brightness5 from '@material-ui/icons/Brightness5';
import People from '@material-ui/icons/People';
import Icon from '@material-ui/core/Icon';
import Hidden from '@material-ui/core/Hidden';
import * as constants from 'kilcote-utils/constants';
import logo from 'kilcote-images/logo_label.png';
import { TextFieldRedux, CheckboxRedux, SelectRedux, SwitchRedux } from './ReduxFormMUI';
import styles from './user-jss';

// validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

const passwordsMatch = (value, allValues) => {
  if (value !== allValues.get('password')) {
    return 'Passwords dont match';
  }
  return undefined;
};

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

// eslint-disable-next-line
class RegisterForm extends React.Component {
  state = {
    tab: 0,
    isAgreeTerm: false
  };

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleChangeTab = (event, value) => {
    this.setState({ tab: value });
  };

  changeAgreeTerm(value) {
    this.setState({ isAgreeTerm: value });
  }

  render() {
    const {
      classes,
      intl,
      handleSubmit,
      pristine,
      submitting,
      deco
    } = this.props;
    const { tab, isAgreeTerm } = this.state;
    return (
      <Fragment>
        <Hidden mdUp>
          <NavLink to="/" className={classNames(classes.brand, classes.outer)}>
            <img src={logo} alt={constants.BRAND_NAME} />
          </NavLink>
        </Hidden>
        <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
          <Hidden smDown>
            <div className={classes.topBar}>
              <NavLink to="/" className={classes.brand}>
                <img src={logo} alt={constants.BRAND_NAME} />
              </NavLink>
              <Button size="small" className={classes.buttonLink} component={LinkBtn} to="/login">
                <Icon className={classes.icon}>arrow_forward</Icon>
                <FormattedMessage id="app.register.goto_login" defaultMessage="Already have account?" />
              </Button>
            </div>
          </Hidden>
          <Typography variant="h4" className={classes.title} gutterBottom>
            <FormattedMessage id="app.register.title" defaultMessage="Register" />
          </Typography>
          <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">
            <FormattedMessage id="app.register.please_message" defaultMessage="Please register with your account" />
          </Typography>
          <section className={classes.formWrap}>
            <form onSubmit={handleSubmit}>
              {/* <div>
                  <FormControl className={classes.formControl}>
                    <Field
                      name="name"
                      component={TextFieldRedux}
                      placeholder="Username"
                      label="Username"
                      required
                      className={classes.field}
                      autoComplete="off"
                    />
                  </FormControl>
                </div> */}
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="email"
                    component={TextFieldRedux}
                    placeholder={intl.formatMessage({ id: 'app.register.mail', defaultMessage: "Your Email" })}
                    label={intl.formatMessage({ id: 'app.register.mail', defaultMessage: "Your Email" })}
                    required
                    validate={[required, email]}
                    className={classes.field}
                    autoComplete="off"
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="password"
                    component={TextFieldRedux}
                    type="password"
                    label={intl.formatMessage({ id: 'app.register.password', defaultMessage: "Your Password" })}
                    required
                    validate={[required, passwordsMatch]}
                    className={classes.field}
                    autoComplete="off"
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="passwordConfirm"
                    component={TextFieldRedux}
                    type="password"
                    label={intl.formatMessage({ id: 'app.register.repassword', defaultMessage: "Re-type Password" })}
                    required
                    validate={[required, passwordsMatch]}
                    className={classes.field}
                    autoComplete="off"
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="status"><FormattedMessage id="app.register.choose_type" defaultMessage="Choose Type" /></InputLabel>
                  <Field
                    name="status"
                    component={SelectRedux}
                    placeholder={intl.formatMessage({ id: 'app.register.choose_type', defaultMessage: "Choose Type" })}
                    autoWidth={true}
                    autoComplete="off"
                  >
                    <MenuItem value={0}>Pupil</MenuItem>
                    <MenuItem value={1}>Client</MenuItem>
                  </Field>
                </FormControl>
              </div>
              <div>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={isAgreeTerm}
                      onChange={(event) => this.changeAgreeTerm(event.target.checked)}
                      value={intl.formatMessage({ id: 'app.register.agree_with', defaultMessage: "Agree with" })}
                    />
                  )}
                  label={intl.formatMessage({ id: 'app.register.agree_with', defaultMessage: "Agree with" })}
                />
                <a href="#" className={classes.link}><FormattedMessage id="app.register.term_condition" defaultMessage="Terms & Condition" /></a>
              </div>
              <div className={classes.btnArea}>
                <Button variant="contained" color="primary" type="submit" disabled={!isAgreeTerm}>
                  <FormattedMessage id="app.register.confirm" defaultMessage="Confirm" />
                  <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
                </Button>
              </div>
            </form>
          </section>
        </Paper>
      </Fragment>
    );
  }
}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const RegisterFormReduxed = reduxForm({
  form: 'immutableRegister',
  enableReinitialize: true,
})(RegisterForm);

const reducer = 'ui';
const RegisterFormMapped = connect(
  state => ({
    force: state,
    deco: state.getIn([reducer, 'decoration'])
  }),
)(RegisterFormReduxed);

export default withStyles(styles)(injectIntl(RegisterFormMapped));

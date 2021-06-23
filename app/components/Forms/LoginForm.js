import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Hidden from '@material-ui/core/Hidden';
import * as constants from 'kilcote-utils/constants';
import logo from 'kilcote-images/logo_label.png';
import { TextFieldRedux, CheckboxRedux } from './ReduxFormMUI';
import { loginAction } from 'kilcote-actions/AuthActions'
import { initAction } from 'kilcote-actions/ReduxFormActions';
import styles from './user-jss';
// validation functions

const required = value => (value == null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

const branch = 'immutableLogin'

// eslint-disable-next-line
class LoginForm extends React.Component {
  state = {
    showPassword: false
  }

  componentDidMount() {
    const { childRef, data } = this.props;
    this.props.init(data);
    childRef(this);
  }

  componentWillUnmount() {
    const { childRef } = this.props;
    childRef(undefined);
  }

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  onLoginRequest = (email, password, remember) => {
    this.props.onSubmitHandle(email, password, remember);
  }

  render() {
    const {
      classes,
      intl,
      pristine,
      submitting,
      handleSubmit,
      deco,
    } = this.props;
    const { showPassword } = this.state;

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
              <Button size="small" className={classes.buttonLink} component={LinkBtn} to="/register">
                <Icon className={classes.icon}>arrow_forward</Icon>
                <FormattedMessage id="app.login.create_new_account" defaultMessage="Create new account" />
              </Button>
            </div>
          </Hidden>
          <Typography variant="h4" className={classes.title} gutterBottom>
            <FormattedMessage id="app.login.title" defaultMessage="Sign In" />
          </Typography>
          <section className={classes.formWrap}>
            <form onSubmit={handleSubmit}>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="email"
                    component={TextFieldRedux}
                    placeholder={intl.formatMessage({ id: 'app.login.mail', defaultMessage: "Your Email" })}
                    label={intl.formatMessage({ id: 'app.login.mail', defaultMessage: "Your Email" })}
                    required
                    validate={[required, email]}
                    className={classNames(classes.field, classes.email)}
                    autoComplete="off"
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="password"
                    component={TextFieldRedux}
                    type={showPassword ? 'text' : 'password'}
                    label={intl.formatMessage({ id: 'app.login.password', defaultMessage: "Your Password" })}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            onMouseDown={this.handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    required
                    validate={required}
                    className={classes.field}
                    value="admin@gmail.com"
                  />
                </FormControl>
              </div>
              <div className={classes.optArea}>
                <FormControlLabel className={classes.label} control={<Field name="remember" component={CheckboxRedux} />} label={intl.formatMessage({ id: "app.login.remember", defaultMessage: "Remember" })} />
                <Button size="small" component={LinkBtn} to="/reset-password" className={classes.buttonLink}>
                  <FormattedMessage id="app.login.forgot_password" defaultMessage="Forgot Password" />
                </Button>
              </div>
              <div className={classes.btnArea}>
                <Button variant="contained" color="primary" size="large" type="submit">
                  {intl.formatMessage({ id: 'app.login.continue', defaultMessage: "Continue" })}
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

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  onSubmitHandle: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  force: state,
  initialValues: state.getIn(['initval', 'formValues']),
  editValues: state.getIn(['form', branch]),
  deco: state.getIn(['ui', 'decoration'])
});

const mapDispatchToProps = dispatch => ({
  onSubmitHandle: bindActionCreators(loginAction, dispatch),
  init: bindActionCreators(initAction, dispatch),
});

const LoginFormReduxed = reduxForm({
  form: branch,
  enableReinitialize: true,
})(LoginForm);

const FormInit = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginFormReduxed);

export default withStyles(styles)(injectIntl(FormInit));

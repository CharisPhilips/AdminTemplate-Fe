import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import { withRouter } from "react-router";
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowBack from '@material-ui/icons/ArrowBack'
import ArrowForward from '@material-ui/icons/ArrowForward'
import Hidden from '@material-ui/core/Hidden';
import * as constants from 'kilcote-utils/constants';
import logo from 'kilcote-images/logo_label.png';
import { TextFieldRedux } from './ReduxFormMUI';
import { initAction } from 'kilcote-actions/ReduxFormActions';
import styles from './user-jss';

// validation functions
const required = value => (value == null ? 'Required' : undefined);

const passwordsMatch = (value, allValues) => {
  if (value !== allValues.get('password')) {
    return 'Passwords dont match';
  }
  return undefined;
};

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

const branch = 'immutableResetPassword';
// eslint-disable-next-line
class ConfirmResetForm extends React.Component {
  state = {
    tab: 0,
  };

  componentDidMount() {
    const { match: { params } } = this.props;
    if (params) {
      this.props.init({ confirmationToken: params.token, password: '' });
    }
  }

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

  render() {
    const {
      classes,
      intl,
      handleSubmit,
      pristine,
      submitting,
      deco
    } = this.props;
    const { tab } = this.state;
    return (
      <Fragment>
        <Hidden mdUp>
          <NavLink to="/" className={classNames(classes.brand, classes.outer)}>
            <img src={logo} alt={constants.BRAND_NAME} />
          </NavLink>
        </Hidden>
        <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
          <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">
            <FormattedMessage id="app.confirm_reset.title" defaultMessage="Please reset password" />
          </Typography>
          <section className={classes.formWrap}>
            <form onSubmit={handleSubmit}>
              <div>
                <Field
                  name="confirmationToken"
                  component={TextFieldRedux}
                  className={classes.txtHidden}
                  type="hidden"
                />
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="password"
                    component={TextFieldRedux}
                    type="password"
                    label={intl.formatMessage({ id: 'app.confirm_reset.password', defaultMessage: "Your Password" })}
                    required
                    validate={[required, passwordsMatch]}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="passwordConfirm"
                    component={TextFieldRedux}
                    type="password"
                    label={intl.formatMessage({ id: 'app.confirm_reset.repassword', defaultMessage: "Re-type Password" })}
                    required
                    validate={[required, passwordsMatch]}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div className={classes.btnArea}>
                <Button variant="contained" className={classes.buttonLink} component={LinkBtn} to="/login" color="secondary" type="button">
                  <FormattedMessage id="app.confirm_reset.goto_login" defaultMessage="Go to Login" />
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  <FormattedMessage id="app.confirm_reset.confirm" defaultMessage="Confirm" />
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

ConfirmResetForm.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
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
  init: bindActionCreators(initAction, dispatch),
});

const ConfirmResetFormReduxed = reduxForm({
  form: branch,
  enableReinitialize: true,
})(ConfirmResetForm);

const reducer = 'ui';
const ConfirmResetFormMapped = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmResetFormReduxed);

export default withRouter(withStyles(styles)(injectIntl(ConfirmResetFormMapped)));

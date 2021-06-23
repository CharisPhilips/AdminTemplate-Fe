import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import * as constants from 'kilcote-utils/constants';
import logo from 'kilcote-images/logo_label.png';
import { TextFieldRedux } from './ReduxFormMUI';
import styles from './user-jss';

// validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

class ResetForm extends React.Component {
  render() {
    const {
      classes,
      intl,
      handleSubmit,
      pristine,
      submitting,
      deco,
    } = this.props;
    return (
      <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
        <div className={classes.topBar}>
          <NavLink to="/" className={classes.brand}>
            <img src={logo} alt={constants.BRAND_NAME} />
          </NavLink>
        </div>
        <Typography variant="h4" className={classes.title} gutterBottom>
          <FormattedMessage id="app.reset.title" defaultMessage="Reset Password" />
        </Typography>
        <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">
          <FormattedMessage id="app.reset.please_message" defaultMessage="Send reset password link to Your email" />

        </Typography>
        <section className={classes.formWrap}>
          <form onSubmit={handleSubmit}>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="email"
                  component={TextFieldRedux}
                  placeholder={intl.formatMessage({ id: 'app.reset.mail', defaultMessage: "Your Email" })}
                  label={intl.formatMessage({ id: 'app.reset.mail', defaultMessage: "Your Email" })}
                  required
                  validate={[required, email]}
                  className={classes.field}
                />
              </FormControl>
            </div>
            <div className={classes.btnArea}>
              <Button variant="contained" color="primary" type="submit">
                <FormattedMessage id="app.reset.send" defaultMessage="Send Reset Link" />
                <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
              </Button>
            </div>
          </form>
        </section>
      </Paper>
    );
  }
}

ResetForm.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const ResetFormReduxed = reduxForm({
  form: 'immutableResetFrm',
  enableReinitialize: true,
})(ResetForm);

const reducer = 'ui';
const RegisterFormMapped = connect(
  state => ({
    force: state,
    deco: state.getIn([reducer, 'decoration'])
  }),
)(ResetFormReduxed);

export default withStyles(styles)(injectIntl(RegisterFormMapped));

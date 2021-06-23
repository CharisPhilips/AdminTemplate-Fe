import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import * as constants from 'kilcote-utils/constants';
import logo from 'kilcote-images/logo_label.png';
import styles from './user-jss';
import * as Webapis from 'kilcote-api/auth'

// validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

const branch = 'immutableConfirmFrm';
class ConfirmSignupForm extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      isSuccess: null,
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    if (params) {
      this._isMounted = true;
      console.log('params.token', params.token);
      Webapis.confirmSignup(params.token).then(
        (response) => {
          if (this._isMounted) {
            this.setState({ isSuccess: response });
          }
        },
        (error) => {
          if (this._isMounted) {
            this.setState({ isSuccess: false });
          }
        }
      );
    }
  }

  render() {
    const {
      classes,
      intl,
      deco,
    } = this.props;

    const { isSuccess } = this.state;
    return (
      (isSuccess != null &&
        <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
          <div className={classes.topBar}>
            <NavLink to="/" className={classes.brand}>
              <img src={logo} alt={constants.BRAND_NAME} />
            </NavLink>
          </div>
          {(isSuccess) ? (
            <Typography variant="h4" className={classes.title} gutterBottom>
              <FormattedMessage id="app.confirm_register.title_success" defaultMessage="Your registration is success!" />
            </Typography>
          ) : (
            <Typography variant="h4" className={classes.title} gutterBottom>
              <FormattedMessage id="app.confirm_register.title_failed" defaultMessage="Your registration is failed!" />
            </Typography>
          )}
          {(isSuccess) ? (
            <section className={classes.formWrap}>
              <div className={classes.btnArea}>
                <NavLink to="/login" className={classes.brand}>
                  <Button variant="contained" color="primary" type="submit">
                    <FormattedMessage id="app.confirm_register.goto_login" defaultMessage="Go to Login" />
                    <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} />
                  </Button>
                </NavLink>
              </div>
            </section>
          ) : (
            <section className={classes.formWrap}>
              <div className={classes.btnArea}>
                <NavLink to="/register" className={classes.brand}>
                  <Button variant="contained" color="primary" type="submit">
                    <FormattedMessage id="app.confirm_register.return_register" defaultMessage="Return Register" />
                    <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} />
                  </Button>
                </NavLink>
              </div>
            </section>
          )}
        </Paper>
      )
    );
  }
}

ConfirmSignupForm.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  deco: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  force: state, // force state from reducer
  deco: state.getIn([reducer, 'decoration']),
  initialValues: state.getIn(['initval', 'formValues']),
  editValues: state.getIn(['form', branch]),
});

const mapDispatchToProps = dispatch => ({
});

const ConfirmSignupFormReduxed = reduxForm({
  form: branch,
  enableReinitialize: true,
})(ConfirmSignupForm);

const reducer = 'ui';
const ConfirmSignupFormMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmSignupFormReduxed);

export default withRouter(withStyles(styles)(injectIntl(ConfirmSignupFormMapped)));

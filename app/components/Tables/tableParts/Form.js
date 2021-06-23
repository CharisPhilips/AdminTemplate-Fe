import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import css from 'kilcote-styles/Form.scss';

class Form extends Component {

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  render() {
    const {
      intl,
      handleSubmit,
      children,
      reset,
      pristine,
      submitting,
      isSubmit
    } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <section className={css.bodyForm}>
            {children}
          </section>
          {(isSubmit == true) &&
            <div className={css.buttonArea}>
              <Button variant="contained" color="secondary" type="submit" disabled={submitting}>
                <FormattedMessage id="app.button.submit" defaultMessage="Submit" />
              </Button>
              <Button
                type="button"
                disabled={pristine || submitting}
                onClick={reset}
              >
                <FormattedMessage id="app.button.reset" defaultMessage="Reset" />
              </Button>
            </div>
          }
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  intl: intlShape.isRequired,
  children: PropTypes.node.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  branch: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
  isSubmit: PropTypes.bool,
};

Form.defaultProps = {
  isSubmit: true
};

const FormMapped = reduxForm({
  form: 'immutableTableForm',
  enableReinitialize: true,
})(Form);

const FormMappedInit = connect(
)(FormMapped);

export default injectIntl(FormMappedInit);

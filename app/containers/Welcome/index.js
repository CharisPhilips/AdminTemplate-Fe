import React from 'react';
import { PropTypes } from 'prop-types';
import { Helmet } from 'react-helmet';
import * as constants from 'kilcote-utils/constants';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl, intlShape } from 'react-intl';
import { PapperBlock } from 'kilcote-components';

const styles = {
  link: {
    display: 'block',
    textTransform: 'capitalize'
  },
  title: {
    margin: '20px 16px 5px',
    textTransform: 'uppercase',
    fontSize: 12,
  }
};

class Parent extends React.Component {

  render() {
    const title = constants.BRAND_NAME;
    const description = constants.BRAND_DESC;
    const { classes, history, intl } = this.props;
    const routes = this.props.authUser.get('routes');
    if (routes != null) {

      return (
        <div>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
          </Helmet>
          <PapperBlock title='Welcome to Admin template of KilCote' desc="">
            <span>Please write some code</span>
          </PapperBlock>
        </div>
      );
    } else {
      return (<></>);
    }
  }
}

Parent.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

const mapStateToProps = state => ({
  authUser: state.getIn(['auth', 'authUser'])
});

const mapDispatchToProps = dispatch => ({
});

const ParentMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Parent);

export default withStyles(styles)(injectIntl(ParentMapped));

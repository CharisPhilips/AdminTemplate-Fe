import React, { Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logoutAction } from 'kilcote-actions/AuthActions'

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
    this.props.history.push('./');
  }

  render() {
    return (
      <></>
    );
  }
}

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  force: state,
});

const mapDispatchToProps = dispatch => ({
  onLogout: bindActionCreators(logoutAction, dispatch),
});

const LogoutMaped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);

export default LogoutMaped;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Checkbox } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import * as Webapis from 'kilcote-api/user'

const branch = 'crudTableUser';
const styles = {}

class MenuCheckGroup extends Component {

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      body: [],
      checkedRoles: []
    };
  }

  componentDidMount() {
    const { childRef } = this.props;
    this._isMounted = true;
    childRef(this);
    this.fetchTotalData();
  }

  componentWillUnmount() {
    const { childRef } = this.props;
    childRef(undefined);
    this._isMounted = false;
  }

  fetchTotalData(id) {
    Webapis.getRolesByList().then(
      (response) => {
        if (this._isMounted) {
          this.setState({ body: response.data });
        }
      },
      (error) => {
      }
    );
  }

  fetchData(item) {
    if (item != null && item.get('id') != null) {
      const checkedRoles = [];
      const roles = item.get('roles');
      for (let i = 0; i < roles.size; i++) {
        checkedRoles.push(roles.getIn([i]).get('roleId'));
      }
      this.setState({ checkedRoles: checkedRoles });
    } else {
      this.setState({ checkedRoles: [] });
    }
  }

  handleChange(roleId, value) {
    const checkedRoles = this.state.checkedRoles;
    if (value && checkedRoles.indexOf(roleId) === -1) {
      checkedRoles.push(roleId);
      this.setState({ checkedRoles: checkedRoles });
    } else if (!value && checkedRoles.indexOf(roleId) !== -1) {
      checkedRoles.splice(checkedRoles.indexOf(roleId), 1);
      this.setState({ checkedRoles: checkedRoles });
    }
  }

  getCheckedIds() {
    return this.state.checkedRoles;
  }

  render() {
    const {
      classes,
    } = this.props;

    const { body, checkedRoles } = this.state;

    const renderCheckboxGroup = roles => roles.map((item, index) => {
      const checked = checkedRoles.indexOf(item.id) != -1;
      return (
        <FormControlLabel
          key={item.id}
          control={(
            <Checkbox
              checked={checked}
              onChange={(event) => this.handleChange(item.id, event.target.checked)}
              value="antoine"
            />
          )}
          label={item.roleName}
        />
      )
    })

    return (
      <div>
        <FormLabel component="legend"><FormattedMessage id="app.admin.system.user.edit_assign_roles" defaultMessage="Assign Roles" /></FormLabel>
        <FormGroup>
          {renderCheckboxGroup(body)}
        </FormGroup>
      </div>
    );
  }
}

MenuCheckGroup.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

const MenuCheckGroupMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuCheckGroup);

export default withStyles(styles)(injectIntl(MenuCheckGroupMapped));

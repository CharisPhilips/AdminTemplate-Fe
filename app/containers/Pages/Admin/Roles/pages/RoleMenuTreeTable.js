import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddCircle from '@material-ui/icons/AddCircle';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Clear from '@material-ui/icons/Clear';
import { TreeTable } from 'kilcote-components';
import { openAction, checkAction, initCheckAction } from 'kilcote-actions/TreeTableActions';
import * as Webapis from 'kilcote-api/role'
import styles from '../styles/role-jss.js';

const branch = 'treeTableRoleMenu';

class RoleMenuTreeTable extends Component {

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      body: [
      ]
    };
  }

  componentDidMount() {
    const { childTreeRef } = this.props;
    this._isMounted = true;
    childTreeRef(this);
    this.fetchTreeData();
  }

  componentWillUnmount() {
    const { childTreeRef } = this.props;
    childTreeRef(undefined);
    this._isMounted = false;
  }

  fetchTreeData() {
    Webapis.getMenuTrees().then(
      (response) => {
        if (this._isMounted) {
          this.setState({ body: response.data });
        }
      },
      (error) => {
      }
    );
  }

  fetchData(id) {
    if (id != null) {
      Webapis.getMenusByRoleId(id).then(
        (response) => {
          const menuIds = this.getCheckedIdArray(response.data);
          this.props.initCheckAction(menuIds, branch);
        },
        (error) => {
        }
      );
    } else {
      this.props.initCheckAction([], branch);
    }
  }

  getCheckedIdArray(menus) {
    const arr = []
    menus.length && menus.map((menu) => {
      arr.push(menu.id)
    })
    return arr
  }

  render() {
    const {
      arrowMore,
      treeOpen,
      treeChecked,
      classes,
      toggleTree,
      changeCheck,
      gotoMenuDetail,
    } = this.props;

    const { body } = this.state;

    return (
      <Grid item xs={12}>
        <div className={classes.rootTable}>
          <TreeTable
            treeOpen={treeOpen}
            toggleTree={toggleTree}
            clickLeaf={gotoMenuDetail}
            showCheck={true}
            checkMode={true}
            treeChecked={treeChecked}
            changeCheck={changeCheck}
            arrowMore={arrowMore}
            tableBody={body}
            branch={branch}
          />
        </div>
      </Grid>
    );
  }
}

RoleMenuTreeTable.propTypes = {
  classes: PropTypes.object.isRequired,
  treeOpen: PropTypes.object.isRequired,
  treeChecked: PropTypes.object.isRequired,
  arrowMore: PropTypes.object.isRequired,
  toggleTree: PropTypes.func.isRequired,
  changeCheck: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  force: state, // force state from reducer
  treeOpen: state.getIn([branch, 'treeOpen']),
  treeChecked: state.getIn([branch, 'treeChecked']),
  arrowMore: state.getIn([branch, 'arrowMore']),
});

const mapDispatchToProps = dispatch => ({
  toggleTree: bindActionCreators(openAction, dispatch),
  changeCheck: bindActionCreators(checkAction, dispatch),
  initCheckAction: bindActionCreators(initCheckAction, dispatch)
});

const RoleMenuTreeTableMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleMenuTreeTable);

export default withStyles(styles)(RoleMenuTreeTableMapped);

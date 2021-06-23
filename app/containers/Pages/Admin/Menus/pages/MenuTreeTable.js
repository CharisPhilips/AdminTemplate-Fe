import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddCircle from '@material-ui/icons/AddCircle';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Clear from '@material-ui/icons/Clear';
import { TreeTable } from 'kilcote-components';
import { openAction, checkAction } from 'kilcote-actions/TreeTableActions';
import styles from '../styles/menu-jss.js';
import * as Auths from 'kilcote-utils/auth';
import * as Webapis from 'kilcote-api/menu'

const branch = 'treeTableMenu';

class MenuTreeTable extends Component {

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      body: [
      ],
    };
  }

  componentDidMount() {
    const { childTreeRef } = this.props;
    this._isMounted = true;
    childTreeRef(this);
  }

  componentWillUnmount() {
    const { childTreeRef } = this.props;
    childTreeRef(undefined);
    this._isMounted = false;
  }

  fetchData() {
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

  render() {
    const {
      classes,
      intl,
      authUser,
      arrowMore,
      treeOpen,
      treeChecked,
      toggleTree,
      changeCheck,
      gotoMenuDetail,
      addClick,
      deleteClick
    } = this.props;
    return (
      <Grid item xs={12}>
        <Grid container item xs={12} spacing={3} direction="row" justify="flex-end" alignItems="flex-start">
          {
            Auths.hasPermission(authUser, ['menu:add']) &&
            <Button variant="contained" size="medium" color="primary" className={classes.buttonAction} onClick={addClick}>
              <AddCircle className={classes.leftIcon} /><FormattedMessage id="app.button.add" defaultMessage="Add" />
            </Button>
          }
          {
            Auths.hasPermission(authUser, ['menu:delete']) &&
            <Button disabled={treeChecked.size <= 0} variant="contained" size="medium" color="secondary" className={classes.buttonAction} onClick={() => deleteClick(treeChecked)}>
              <DeleteForever className={classes.leftIcon} /><FormattedMessage id="app.button.delete" defaultMessage="Delete" />
            </Button>
          }
        </Grid>
        <Grid item xs={12}>
          <div className={classes.rootTable}>
            <TreeTable
              treeOpen={treeOpen}
              toggleTree={toggleTree}
              clickLeaf={gotoMenuDetail}
              showCheck={true}
              treeChecked={treeChecked}
              changeCheck={changeCheck}
              arrowMore={arrowMore}
              tableBody={this.state.body}
              branch={branch}
            />
          </div>
        </Grid>
      </Grid>
    );
  }
}

MenuTreeTable.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  treeOpen: PropTypes.object.isRequired,
  treeChecked: PropTypes.object.isRequired,
  arrowMore: PropTypes.object.isRequired,
  toggleTree: PropTypes.func.isRequired,
  changeCheck: PropTypes.func.isRequired,
  gotoMenuDetail: PropTypes.func.isRequired,
  addClick: PropTypes.func.isRequired,
  deleteClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  force: state, // force state from reducer
  authUser: state.getIn(['auth', 'authUser']),
  treeOpen: state.getIn([branch, 'treeOpen']),
  treeChecked: state.getIn([branch, 'treeChecked']),
  arrowMore: state.getIn([branch, 'arrowMore']),
});

const mapDispatchToProps = dispatch => ({
  toggleTree: bindActionCreators(openAction, dispatch),
  changeCheck: bindActionCreators(checkAction, dispatch)
});

const MenuTreeTableMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuTreeTable);

export default withStyles(styles)(injectIntl(MenuTreeTableMapped));

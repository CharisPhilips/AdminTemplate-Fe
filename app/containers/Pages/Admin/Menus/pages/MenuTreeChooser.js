import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { openAction } from 'kilcote-actions/TreeTableActions';
import { TreeTable } from 'kilcote-components';
import styles from 'kilcote-components/Tables/tableStyle-jss';
import * as Webapis from 'kilcote-api/menu'

const branch = 'treeChooserMenu';

class MenuTreeChooser extends Component {

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      body: [],
    };
  }

  componentDidMount() {
    const { fectchInit, rowsPerPage } = this.props;
    this._isMounted = true;
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

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {
      arrowMore,
      treeOpen,
      treeChecked,
      classes,
      toggleTree,
      changeCheck,
      selectMenuHandle
    } = this.props;
    return (
      <div className={classes.rootTable}>
        <TreeTable
          treeOpen={treeOpen}
          toggleTree={toggleTree}
          clickLeaf={selectMenuHandle}
          arrowMore={arrowMore}
          tableBody={this.state.body}
          branch={branch}
        />
      </div>
    );
  }
}

MenuTreeChooser.propTypes = {
  classes: PropTypes.object.isRequired,
  treeOpen: PropTypes.object.isRequired,
  arrowMore: PropTypes.object.isRequired,
  toggleTree: PropTypes.func.isRequired,
  selectMenuHandle: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  force: state, // force state from reducer
  treeOpen: state.getIn([branch, 'treeOpen']),
  arrowMore: state.getIn([branch, 'arrowMore']),
});

const mapDispatchToProps = dispatch => ({
  toggleTree: bindActionCreators(openAction, dispatch)
});

const MenuTreeChooserMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuTreeChooser);

export default withStyles(styles)(MenuTreeChooserMapped);

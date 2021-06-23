import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field } from 'redux-form/immutable';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { openAction, checkAction } from 'kilcote-actions/TreeTableActions';
import { CrudTableForm, Notification } from 'kilcote-components';
import { CheckboxRedux, SelectRedux, TextFieldRedux, SwitchRedux } from 'kilcote-components/Forms/ReduxFormMUI';
import { fetchInitRequestAction, fetchRequestAction, submitRequestAction, removeReuestAction, addAction, editAction, closeAction, closeNotifAction } from 'kilcote-actions/CrudTbActions';
import RoleMenuTreeTable from './RoleMenuTreeTable';
import * as Auths from 'kilcote-utils/auth';

// Reducer Branch
const branch = 'crudTableRole';

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    valueselected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

// validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

const styles = ({
  root: {
    flexGrow: 1,
  },
  field: {
    width: '100%',
    marginBottom: 20
  },
  fieldBasic: {
    width: '100%',
    marginBottom: 20,
    marginTop: 10
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row'
  }
});

class EditableRole extends Component {

  saveRef = ref => {
    this.ref = ref;
    return this.ref;
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      columnData: [
        {
          name: 'id',
          type: 'static',
          initialValue: '',
          hidden: true
        },
        {
          name: 'roleName',
          label: props.intl.formatMessage({ id: 'app.admin.system.role.table_name', defaultMessage: 'Role Name' }),
          type: 'text',
          initialValue: '',
          width: 'auto',
          hidden: false
        },
        {
          name: 'remark',
          label: props.intl.formatMessage({ id: 'app.admin.system.role.table_remark', defaultMessage: "Remark" }),
          type: 'text',
          initialValue: '',
          width: 'auto',
          hidden: false
        },
        {
          name: 'edited',
          label: '',
          type: 'static',
          initialValue: '',
          hidden: true
        },
        {
          name: 'action',
          label: props.intl.formatMessage({ id: 'app.admin.system.role.table_action', defaultMessage: "Action" }),
          type: 'static',
          initialValue: '',
          width: 'auto',
          hidden: false
        },
      ]
    };
  }

  componentDidMount() {
    const { intl, fectchInit, rowsPerPage } = this.props;
    fectchInit(this.state.columnData, rowsPerPage, branch);
  }

  onChangePageHandle(page) {
    const { fectchData, rowsPerPage } = this.props;
    fectchData(rowsPerPage, page, branch);

  };

  onChangeRowsPerPageHandle(rowsPerPage) {
    const { fectchData, page } = this.props;
    fectchData(rowsPerPage, page, branch);
  };

  onAddRowHandle(anchor, branch) {
    this.childTree.fetchData(null);
    this.props.addNew(anchor, branch);
  }

  onEditRowHandle(item, branch) {
    this.childTree.fetchData(item.get('id'));
    this.props.editRow(item, branch);
  }

  onDeleteRowHandel(item, branch) {
    if (confirm(this.props.intl.formatMessage({ id: 'app.message.role.confirm_delete', defaultMessage: "Are you sure you want to delete role?" }))) {
      try {
        this.props.removeRow(item, branch);
      } catch (e) {
        console.error(e)
      }
    } else {
    }
  }

  onSubmit(item, branch) {
    const addItem = item.set('menuIds', this.props.treeChecked);
    this.props.submit(addItem, branch);
  }

  render() {
    const {
      classes, intl, authUser, closeForm, submit, removeRow, addNew, editRow, dataTable, openForm, initialValues, closeNotif, messageNotif,
      //pagination
      rowsPerPage, totalCount, page } = this.props;
    const { columnData } = this.state;

    return (
      <div>
        <Notification onClose={() => closeNotif(branch)} messageIntl={messageNotif} />
        <div className={classes.rootTable}>
          <CrudTableForm
            branch={branch}
            dataTable={dataTable}
            openForm={openForm}
            anchor={columnData}
            title={intl.formatMessage({ id: 'app.admin.system.role.title', defaultMessage: "Role Manage" })}
            editTitle={intl.formatMessage({ id: 'app.admin.system.role.edit_title', defaultMessage: "Edit Role" })}
            addNew={Auths.hasPermission(authUser, ['role:add']) ? (anchor, branch) => this.onAddRowHandle(anchor, branch) : null}
            editRow={Auths.hasPermission(authUser, ['role:update']) ? (item, branch) => this.onEditRowHandle(item, branch) : null}
            removeRow={Auths.hasPermission(authUser, ['role:delete']) ? (item, branch) => this.onDeleteRowHandel(item, branch) : null}
            closeForm={closeForm}
            submit={(item, branch) => this.onSubmit(item, branch)}
            initialValues={initialValues}
            //pagination
            rowsPerPage={rowsPerPage}
            totalCount={totalCount}
            page={page}
            handleChangePage={(page) => this.onChangePageHandle(page)}
            handleChangeRowsPerPage={(rowsPerPage) => this.onChangeRowsPerPageHandle(rowsPerPage)}
          >
            <div>
              <Field
                name="roleName"
                component={TextFieldRedux}
                placeholder={intl.formatMessage({ id: 'app.admin.system.role.table_name', defaultMessage: "Role Name" })}
                label={intl.formatMessage({ id: 'app.admin.system.role.table_name', defaultMessage: "Role Name" })}
                required
                validate={[required]}
                ref={this.saveRef}
                className={classes.field}
                autoComplete="off"
              />
            </div>
            <div>
              <Field
                name="remark"
                component={TextFieldRedux}
                placeholder={intl.formatMessage({ id: 'app.admin.system.role.table_remark', defaultMessage: "Remark" })}
                label={intl.formatMessage({ id: 'app.admin.system.role.table_remark', defaultMessage: "Remark" })}
                required
                validate={required}
                ref={this.saveRef}
                className={classes.field}
                autoComplete="off"
              />
            </div>
            <div>
              <RoleMenuTreeTable childTreeRef={ref => (this.childTree = ref)} />
            </div>
          </CrudTableForm>
        </div>
      </div>
    );
  }
}

renderRadioGroup.propTypes = {
  input: PropTypes.object.isRequired,
};

EditableRole.propTypes = {
  // dataSource: PropTypes.array.isRequired,
  intl: intlShape.isRequired,
  dataTable: PropTypes.object.isRequired,
  openForm: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  fectchInit: PropTypes.func.isRequired,
  fectchData: PropTypes.func.isRequired,
  addNew: PropTypes.func.isRequired,
  editRow: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  removeRow: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  closeNotif: PropTypes.func.isRequired,
  messageNotif: PropTypes.string.isRequired,
  //pagination
  rowsPerPage: PropTypes.number,
  totalCount: PropTypes.number,
  page: PropTypes.number,
  handleChangePage: PropTypes.func,
  handleChangeRowsPerPage: PropTypes.func,
};

const mapStateToProps = state => ({
  force: state, // force state from reducer
  authUser: state.getIn(['auth', 'authUser']),
  initialValues: state.getIn([branch, 'formValues']),
  dataTable: state.getIn([branch, 'dataTable']),
  openForm: state.getIn([branch, 'showFrm']),
  messageNotif: state.getIn([branch, 'notifMsg']),
  //pagination
  totalCount: state.getIn([branch, 'totalCount']),
  rowsPerPage: state.getIn([branch, 'rowsPerPage']),
  page: state.getIn([branch, 'page']),
  treeChecked: state.getIn(['treeTableRoleMenu', 'treeChecked']),
});

const mapDispatchToProps = dispatch => ({
  fectchInit: bindActionCreators(fetchInitRequestAction, dispatch),
  fectchData: bindActionCreators(fetchRequestAction, dispatch),
  addNew: bindActionCreators(addAction, dispatch),
  closeForm: bindActionCreators(closeAction, dispatch),
  submit: bindActionCreators(submitRequestAction, dispatch),
  removeRow: bindActionCreators(removeReuestAction, dispatch),
  editRow: bindActionCreators(editAction, dispatch),
  closeNotif: bindActionCreators(closeNotifAction, dispatch),
});

const CrudRoleTableMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditableRole);

export default withStyles(styles)(injectIntl(CrudRoleTableMapped));

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Field } from 'redux-form/immutable';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Checkbox } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { CrudTableForm, Notification } from 'kilcote-components';
import { CheckboxRedux, SelectRedux, TextFieldRedux, SwitchRedux } from 'kilcote-components/Forms/ReduxFormMUI';
import { fetchInitRequestAction, submitRequestAction, removeReuestAction, editAction, closeAction, closeNotifAction } from 'kilcote-actions/CrudTbActions';
import { fetchLogRequestAction } from 'kilcote-actions/admin/CrudLogTbActions';
import * as Auths from 'kilcote-utils/auth';
import * as Webapis from 'kilcote-api/user'

// Reducer Branch
const branch = 'crudTableLog';

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
  },
  button: {
    margin: 'auto'
  }
});

class DetailLog extends Component {

  saveRef = ref => {
    this.ref = ref;
    return this.ref;
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      dtFrom: null,
      dtTo: null,
      columnData: [
        {
          name: 'id',
          type: 'static',
          initialValue: '',
          hidden: true
        },
        {
          name: 'email',
          label: props.intl.formatMessage({ id: 'app.admin.system.log.table_email', defaultMessage: "Email" }),
          type: 'text',
          initialValue: '',
          width: 'auto',
          hidden: false
        },
        {
          name: 'createTime',
          label: props.intl.formatMessage({ id: 'app.admin.system.log.table_create_time', defaultMessage: "Create Time" }),
          type: 'text',
          initialValue: '',
          hidden: false
        },
        {
          name: 'ip',
          label: props.intl.formatMessage({ id: 'app.admin.system.log.table_ip', defaultMessage: "Ip" }),
          type: 'text',
          initialValue: '',
          width: 'auto',
          hidden: false
        },
        {
          name: 'operation',
          label: props.intl.formatMessage({ id: 'app.admin.system.log.table_operation', defaultMessage: "Operation" }),
          type: 'text',
          initialValue: '',
          width: 'auto',
          hidden: false
        },
        {
          name: 'time',
          label: props.intl.formatMessage({ id: 'app.admin.system.log.table_consume_time', defaultMessage: "Consume Time(ms)" }),
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
          label: props.intl.formatMessage({ id: 'app.admin.system.log.table_action', defaultMessage: "Action" }),
          type: 'static',
          initialValue: '',
          width: 'auto',
          hidden: false
        },
      ]
    };
  }

  componentDidMount() {
    const { fectchInit, rowsPerPage } = this.props;
    fectchInit(this.state.columnData, rowsPerPage, branch);
  }

  onChangePageHandle(page) {
    const { fectchData, rowsPerPage } = this.props;
    const { email, dtFrom, dtTo } = this.state;
    fectchData(rowsPerPage, page, email, dtFrom, dtTo, branch);
  }

  onChangeRowsPerPageHandle(rowsPerPage) {
    const { fectchData, page } = this.props;
    const { email, dtFrom, dtTo } = this.state;
    fectchData(rowsPerPage, page, email, dtFrom, dtTo, branch);
  }

  onEditRowHandle(item, branch) {
    this.props.editRow(item, branch);
  }

  onDeleteRowHandel(item, branch) {
    if (confirm(this.props.intl.formatMessage({ id: 'app.message.log.confirm_delete', defaultMessage: "Are you sure you want to delete logs?" }))) {
      try {
        this.props.removeRow(item, branch);
      } catch (e) {
        console.error(e)
      }
    } else {
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  }

  handleDateFromChange = (date) => {
    this.setState({ dtFrom: date });
  }

  handleDateToChange = (date) => {
    this.setState({ dtTo: date });
  }

  handleSearch = () => {
    const { fectchData, rowsPerPage, page } = this.props;
    const { email, dtFrom, dtTo } = this.state;
    fectchData(rowsPerPage, page, email, dtFrom, dtTo, branch);
  }

  onSubmit(item, branch) {
    const checkedRole = this.child.getCheckedIds();
    const addItem = item.set('roleIds', checkedRole);
    this.props.submit(addItem, branch);
  }

  render() {
    const { classes, intl, authUser, closeForm, submit, editRow, removeRow, dataTable, openForm, initialValues, closeNotif, messageNotif, rowsPerPage, totalCount, page } = this.props;
    const { email, dtFrom, dtTo, columnData } = this.state;

    return (
      <Grid container direction="row" spacing={3} >
        <Grid item xs={12} md={3}>
          <TextField
            id="email"
            label={intl.formatMessage({ id: 'app.admin.system.log.filter_email', defaultMessage: "Email" })}
            value={email}
            margin="normal"
            variant="outlined"
            fullWidth
            onChange={this.handleChange('email')}
            autoComplete="off"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2} >
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDateTimePicker
              label={intl.formatMessage({ id: 'app.admin.system.log.filter_from_time', defaultMessage: "From time" })}
              value={dtFrom}
              onChange={this.handleDateFromChange}
              format="YYYY-MM-DD HH:mm:ss"
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDateTimePicker
              label={intl.formatMessage({ id: 'app.admin.system.log.filter_to_time', defaultMessage: "To time" })}
              value={dtTo}
              onChange={this.handleDateToChange}
              format="YYYY-MM-DD HH:mm:ss"
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} sm={6} md={2} className={classes.button}>
          <Button variant="contained" color="primary" onClick={this.handleSearch} >
            <SearchIcon className={classes.rightIcon} />
            <FormattedMessage id="app.button.search" defaultMessage="Search" />
          </Button>
        </Grid>

        <Grid item xs={12}>
          <div>
            <Notification onClose={() => closeNotif(branch)} messageIntl={messageNotif} />
            <div className={classes.rootTable}>
              <CrudTableForm
                branch={branch}
                dataTable={dataTable}
                openForm={openForm}
                anchor={columnData}
                title={intl.formatMessage({ id: 'app.admin.system.log.title', defaultMessage: "Log Manage" })}
                editTitle={intl.formatMessage({ id: 'app.admin.system.log.edit_title', defaultMessage: "Edit Log" })}
                editRow={(item, branch) => this.onEditRowHandle(item, branch)}
                readonly={true}
                removeRow={Auths.hasPermission(authUser, ['log:delete']) ? (item, branch) => this.onDeleteRowHandel(item, branch) : null}
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
                    name="email"
                    component={TextFieldRedux}
                    placeholder={intl.formatMessage({ id: 'app.admin.system.log.table_email', defaultMessage: "Email" })}
                    label={intl.formatMessage({ id: 'app.admin.system.log.table_email', defaultMessage: "Email" })}
                    ref={this.saveRef}
                    className={classes.field}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <Field
                    name="createTime"
                    type="text"
                    component={TextFieldRedux}
                    placeholder={intl.formatMessage({ id: 'app.admin.system.log.table_create_time', defaultMessage: "Create Time" })}
                    label={intl.formatMessage({ id: 'app.admin.system.log.table_create_time', defaultMessage: "Create Time" })}
                    ref={this.saveRef}
                    className={classes.field}
                    inputProps={{ readOnly: true }}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <Field
                    name="ip"
                    type="text"
                    component={TextFieldRedux}
                    placeholder={intl.formatMessage({ id: 'app.admin.system.log.table_ip', defaultMessage: "Ip" })}
                    label={intl.formatMessage({ id: 'app.admin.system.log.table_ip', defaultMessage: "Ip" })}
                    ref={this.saveRef}
                    className={classes.field}
                    inputProps={{ readOnly: true }}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <Field
                    name="location"
                    type="text"
                    component={TextFieldRedux}
                    placeholder={intl.formatMessage({ id: 'app.admin.system.log.table_location', defaultMessage: "Location" })}
                    label={intl.formatMessage({ id: 'app.admin.system.log.table_location', defaultMessage: "Location" })}
                    ref={this.saveRef}
                    className={classes.field}
                    inputProps={{ readOnly: true }}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <Field
                    name="operation"
                    type="text"
                    component={TextFieldRedux}
                    placeholder={intl.formatMessage({ id: 'app.admin.system.log.table_operation', defaultMessage: "Operation" })}
                    label={intl.formatMessage({ id: 'app.admin.system.log.table_operation', defaultMessage: "Operation" })}
                    ref={this.saveRef}
                    className={classes.field}
                    inputProps={{ readOnly: true }}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <Field
                    name="time"
                    type="text"
                    component={TextFieldRedux}
                    placeholder={intl.formatMessage({ id: 'app.admin.system.log.table_consume_time', defaultMessage: "Consume Time(ms)" })}
                    label={intl.formatMessage({ id: 'app.admin.system.log.table_consume_time', defaultMessage: "Consume Time(ms)" })}
                    ref={this.saveRef}
                    className={classes.field}
                    inputProps={{ readOnly: true }}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <Field
                    name="method"
                    type="text"
                    component={TextFieldRedux}
                    placeholder={intl.formatMessage({ id: 'app.admin.system.log.edit_method', defaultMessage: "Method" })}
                    label={intl.formatMessage({ id: 'app.admin.system.log.edit_method', defaultMessage: "Method" })}
                    ref={this.saveRef}
                    className={classes.field}
                    inputProps={{ readOnly: true }}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <Field
                    name="params"
                    type="text"
                    component={TextFieldRedux}
                    placeholder={intl.formatMessage({ id: 'app.admin.system.log.edit_params', defaultMessage: "Params" })}
                    label={intl.formatMessage({ id: 'app.admin.system.log.edit_params', defaultMessage: "Params" })}
                    ref={this.saveRef}
                    multiline={true}
                    className={classes.field}
                    inputProps={{ readOnly: true }}
                    autoComplete="off"
                  />
                </div>
              </CrudTableForm>
            </div>
          </div>
        </Grid>
      </Grid>
    );
  }
}

renderRadioGroup.propTypes = {
  input: PropTypes.object.isRequired,
};

DetailLog.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  dataTable: PropTypes.object.isRequired,
  openForm: PropTypes.bool.isRequired,
  fectchInit: PropTypes.func.isRequired,
  fectchData: PropTypes.func.isRequired,
  editRow: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
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
});

const mapDispatchToProps = dispatch => ({
  fectchInit: bindActionCreators(fetchInitRequestAction, dispatch),
  fectchData: bindActionCreators(fetchLogRequestAction, dispatch),
  closeForm: bindActionCreators(closeAction, dispatch),
  removeRow: bindActionCreators(removeReuestAction, dispatch),
  editRow: bindActionCreators(editAction, dispatch),
  closeNotif: bindActionCreators(closeNotifAction, dispatch),
});

const CrudLogTableMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailLog);

export default withStyles(styles)(injectIntl(CrudLogTableMapped));


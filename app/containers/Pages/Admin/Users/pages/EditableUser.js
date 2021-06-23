import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field } from 'redux-form/immutable';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Checkbox } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Tooltip from '@material-ui/core/Tooltip';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { CrudTableForm, Notification } from 'kilcote-components';
import Type from 'kilcote-styles/Typography.scss';
import { CheckboxRedux, SelectRedux, TextFieldRedux, SwitchRedux } from 'kilcote-components/Forms/ReduxFormMUI';
import { fetchInitRequestAction, fetchRequestAction, submitRequestAction, removeReuestAction, addAction, editAction, closeAction, closeNotifAction } from 'kilcote-actions/CrudTbActions';
import MenuCheckGroup from './MenuCheckGroup';
import styles from '../styles/edituser-jss';
import * as Auths from 'kilcote-utils/auth';
import * as Webapis from 'kilcote-api/user'
// Reducer Branch
const branch = 'crudTableUser';

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    valueselected={input.value}
    onChange={(event, value) => {
      input.onChange(Number(value))
    }
    }
  />
);

// validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

class EditableUser extends Component {

  saveRef = ref => {
    this.ref = ref;
    return this.ref;
  };

  constructor(props) {
    super(props);
    this.state = {
      rolesData: [],
      imgAvatar: null,
      files: [],
      columnData: [
        {
          name: 'id',
          type: 'static',
          initialValue: '',
          hidden: true
        },
        {
          name: 'email',
          label: props.intl.formatMessage({ id: 'app.admin.system.user.table_email', defaultMessage: "Email" }),
          type: 'text',
          initialValue: '',
          width: 'auto',
          hidden: false
        },
        {
          name: 'password',
          label: props.intl.formatMessage({ id: 'app.admin.system.user.table_password', defaultMessage: "Password" }),
          type: 'text',
          initialValue: '',
          width: 'auto',
          hidden: false
        },
        {
          name: 'rolesStr',
          label: props.intl.formatMessage({ id: 'app.admin.system.user.table_roles', defaultMessage: "Roles" }),
          type: 'text',
          initialValue: '',
          width: 'auto',
          hidden: false
        },
        {
          name: 'status',
          label: props.intl.formatMessage({ id: 'app.admin.system.user.table_status', defaultMessage: "Status" }),
          type: 'radio',
          rule: Map({
            1: 'Enable', 0: 'Disable'
          }),
          initialValue: 0,
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
          label: props.intl.formatMessage({ id: 'app.admin.system.user.table_action', defaultMessage: "Action" }),
          type: 'static',
          initialValue: '',
          width: 'auto',
          hidden: false
        },
      ]
    };
    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount() {
    const { fectchInit, rowsPerPage } = this.props;
    fectchInit(this.state.columnData, rowsPerPage, branch);
  }

  onChangePageHandle(page) {
    const { fectchData, rowsPerPage } = this.props;
    fectchData(rowsPerPage, page, branch);
  }

  onChangeRowsPerPageHandle(rowsPerPage) {
    const { fectchData, page } = this.props;
    fectchData(rowsPerPage, page, branch);
  }

  onAddRowHandle(anchor, branch) {
    this.child.fetchData(null);
    this.props.addNew(anchor, branch);
  }

  onEditRowHandle(item, branch) {
    this.child.fetchData(item);
    this.props.editRow(item, branch);
  }

  onDeleteRowHandel(item, branch) {
    if (confirm(this.props.intl.formatMessage({ id: 'app.message.user.confirm_delete', defaultMessage: "Are you sure you want to delete users?" }))) {
      try {
        this.props.removeRow(item, branch);
      } catch (e) {
        console.error(e)
      }
    } else {
    }
  }

  onDrop(filesVal) {
    const { files } = this.state;
    let oldFiles = files;
    const filesLimit = 1;
    oldFiles = oldFiles.concat(filesVal);
    if (oldFiles.length > filesLimit) {
      console.log('Cannot upload more than ' + filesLimit + ' items.');
    } else {
      this.setState({ imgAvatar: filesVal[0] });
    }
  }

  onSubmit(item, branch) {
    const checkedRole = this.child.getCheckedIds();
    let addItem = item.set('roleIds', checkedRole);
    if (this.state.imgAvatar != null && typeof this.state.imgAvatar !== 'string') {
      addItem = addItem.set('imgAvatar', this.state.imgAvatar);
    }
    this.props.submit(addItem, branch);
    setTimeout(() => {
      this.setState({ imgAvatar: null });
    }, 1000);
  }

  render() {
    const {
      classes,
      authUser,
      intl,
      addNew,
      closeForm,
      submit,
      removeRow,
      editRow,
      dataTable,
      openForm,
      initialValues,
      closeNotif,
      messageNotif,
      rowsPerPage,
      totalCount,
      page,
    } = this.props;

    let { imgAvatar, columnData } = this.state;

    let dropzoneRef;
    const acceptedFiles = ['image/jpeg', 'image/png', 'image/bmp'];
    const fileSizeLimit = 300000;

    const imgPreview = img => {
      if (img == null) {
        img = '/images/avatars/silver_camera.svg';
        if (this.ref != null &&
          this.ref.props != null &&
          this.ref.props._reduxForm.values.get('avatar') != null) {
          return this.ref.props._reduxForm.values.get('avatar');
        }
      }
      else if (typeof img !== 'string' && img !== '') {
        return URL.createObjectURL(imgAvatar);
      }
      return img;
    };

    return (
      <div>
        <Notification onClose={() => closeNotif(branch)} messageIntl={messageNotif} />
        <div className={classes.rootTable}>
          <CrudTableForm
            branch={branch}
            dataTable={dataTable}
            openForm={openForm}
            anchor={columnData}
            title={intl.formatMessage({ id: 'app.admin.system.user.title', defaultMessage: "User Manage" })}
            editTitle={intl.formatMessage({ id: 'app.admin.system.user.edit_title', defaultMessage: "Edit User" })}
            addNew={Auths.hasPermission(authUser, ['user:add']) ? (anchor, branch) => this.onAddRowHandle(anchor, branch) : null}
            editRow={Auths.hasPermission(authUser, ['user:update']) ? (item, branch) => this.onEditRowHandle(item, branch) : null}
            removeRow={Auths.hasPermission(authUser, ['user:delete']) ? (item, branch) => this.onDeleteRowHandel(item, branch) : null}
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
              <Typography display="block" variant="button" className={Type.textCenter}>
                <FormattedMessage id="app.admin.system.user.edit_upload_photo" defaultMessage="Upload Photo" />
              </Typography>
              <Dropzone
                className={classes.hiddenDropzone}
                accept={acceptedFiles.join(',')}
                acceptClassName="stripes"
                onDrop={this.onDrop}
                maxSize={fileSizeLimit}
                ref={(node) => { dropzoneRef = node; }}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                  </div>
                )}
              </Dropzone>
              <div className={classes.avatarWrap}>
                <Avatar
                  alt={intl.formatMessage({ id: 'app.admin.system.user.edit_avatar', defaultMessage: "User Avatar" })}
                  className={classes.uploadAvatar}
                  src={imgPreview(imgAvatar)}
                />
                <Tooltip id="tooltip-upload" title={intl.formatMessage({ id: 'app.admin.system.user.edit_upload_photo', defaultMessage: "Upload Photo" })}>
                  <IconButton
                    className={classes.buttonUpload}
                    component="button"
                    onClick={() => {
                      dropzoneRef.open();
                    }}
                  >
                    <PhotoCamera />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <div>
              <Field
                name="email"
                component={TextFieldRedux}
                placeholder={intl.formatMessage({ id: 'app.admin.system.user.table_email', defaultMessage: "Email" })}
                label="Email"
                required
                validate={[required, email]}
                ref={this.saveRef}
                className={classes.field}
                autoComplete="off"
              />
            </div>
            <div>
              <Field
                name="password"
                type="password"
                component={TextFieldRedux}
                placeholder={intl.formatMessage({ id: 'app.admin.system.user.table_password', defaultMessage: "Password" })}
                label={intl.formatMessage({ id: 'app.admin.system.user.table_password', defaultMessage: "Password" })}
                ref={this.saveRef}
                className={classes.field}
              />
            </div>
            <div>
              <FormControl className={classes.field}>
                <InputLabel htmlFor="status"><FormattedMessage id="app.admin.system.user.edit_choose_type" defaultMessage="Choose Type" /></InputLabel>
                <Field
                  name="type"
                  component={SelectRedux}
                  placeholder={intl.formatMessage({ id: 'app.admin.system.user.edit_choose_type', defaultMessage: "Choose Type" })}
                  autoWidth={true}
                >
                  <MenuItem value={0}>Pupil</MenuItem>
                  <MenuItem value={1}>Client</MenuItem>
                </Field>
              </FormControl>
            </div>
            <div className={classes.fieldBasic}>
              <FormLabel component="label"><FormattedMessage id="app.admin.system.user.edit_choose_status" defaultMessage="Choose Status" /></FormLabel>
              <Field name="status" className={classes.inlineWrap} component={renderRadioGroup}>
                <FormControlLabel value={1} control={<Radio />} label={intl.formatMessage({ id: 'app.admin.system.user.edit_status_enable', defaultMessage: "Enable" })} />
                <FormControlLabel value={0} control={<Radio />} label={intl.formatMessage({ id: 'app.admin.system.user.edit_status_Disable', defaultMessage: "Disable" })} />
              </Field>
            </div>
            <MenuCheckGroup childRef={ref => (this.child = ref)} />
            <div className={classes.field}>
              <Field
                name="description"
                className={classes.field}
                component={TextFieldRedux}
                placeholder="Textarea"
                label={intl.formatMessage({ id: 'app.admin.system.user.edit_description', defaultMessage: "Description" })}
                multiline={true}
                rows={4}
              />
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

EditableUser.propTypes = {
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

const CrudEditableUserMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditableUser);

export default withStyles(styles)(injectIntl(CrudEditableUserMapped));


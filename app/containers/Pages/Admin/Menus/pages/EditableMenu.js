import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import { Field, reduxForm, change } from 'redux-form/immutable';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Ionicon from 'react-ionicons';
import InputAdornment from '@material-ui/core/InputAdornment';

import ImageSearch from '@material-ui/icons/ImageSearch';
import AccountTree from '@material-ui/icons/AccountTree';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddCircle from '@material-ui/icons/AddCircle';
import Save from '@material-ui/icons/Save';
import Clear from '@material-ui/icons/Clear';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';

import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import { Notification, NumberGroupButtons, IconDialog } from 'kilcote-components';
import MenuTreeChooser from './MenuTreeChooser';
import { CheckboxRedux, SelectRedux, TextFieldRedux, SwitchRedux } from 'kilcote-components/Forms/ReduxFormMUI';
import { initAction, clearAction } from 'kilcote-actions/ReduxFormActions';
import { getParentMenuPath } from 'kilcote-utils/stringUtils'
import * as Auths from 'kilcote-utils/auth';
import styles from '../styles/editmenu-jss';
// parent chooser dialog 
const ChooseParentMenuDialog = props => {
  const {
    classes,
    onClose,
    title,
    ...other
  } = props;

  function handleClose(value) {
    onClose(value);
  }

  return (
    <Dialog onClose={() => handleClose()} aria-labelledby="simple-dialog-title" classes={{ paper: classes.dialogPaper }} {...other} >
      <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
      <div>
        <MenuTreeChooser selectMenuHandle={(value) => handleClose(value)} />
      </div>
    </Dialog>
  );
};

ChooseParentMenuDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
const ChooseParentMenuDialogWrapped = withStyles(styles)(ChooseParentMenuDialog);

// image chooser dialog
const ChooseMenuIconDialog = props => {
  const {
    classes,
    onClose,
    title,
    ...other
  } = props;

  function handleClose(value) {
    onClose(value);
  }

  return (
    <Dialog onClose={() => handleClose()} aria-labelledby="simple-dialog-title" classes={{ paper: classes.dialogNoPaper }} {...other} >
      <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
      <div>
        <IconDialog selectMenuHandle={(value) => handleClose(value)} />
      </div>
    </Dialog>
  );
};

ChooseMenuIconDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
const ChooseMenuIconDialogWrapped = withStyles(styles)(ChooseMenuIconDialog);

//main dialog

const required = value => (value == null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    valueselected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
)

const branch = 'editMenuForm';

class EditableMenu extends Component {

  saveRef = ref => {
    this.ref = ref;
    return this.ref;
  };

  constructor(props) {
    super(props);
    this.state = {
      openDialogMenu: false,
      openDialogIcon: false
    };
  }

  componentDidMount() {
    const { childEditRef } = this.props;
    childEditRef(this);
    this.props.init();
  }

  componentWillUnmount() {
    const { childEditRef } = this.props;
    childEditRef(undefined);
  }

  initData(data) {
    this.props.init(data);
  }

  handleChangeOrderNum(value) {
    this.props.dispatch(change(branch, 'orderNum', value));
  }

  getIcon() {
    if (this.ref != null &&
      this.ref.props != null &&
      this.ref.props._reduxForm.values.get('icon') != null) {
      return this.ref.props._reduxForm.values.get('icon');
    }
    return "";
  }

  handleMenuDialogOpen = () => {
    this.setState({ openDialogMenu: true });
  };

  handleIconDialogOpen = () => {
    this.setState({ openDialogIcon: true });
  };

  handleMenuDialogClose = value => {
    this.setState({ openDialogMenu: false });
    if (value != null) {
      this.props.dispatch(change(branch, 'parentId', value.id));
      this.props.dispatch(change(branch, 'parentPath', getParentMenuPath(value)));
    }
  };

  handleIconDialogClose = value => {
    this.setState({ openDialogIcon: false });
    this.props.dispatch(change(branch, 'icon', value));
  };

  render() {
    const { classes, intl, authUser, reset, pristine, submitting, handleSubmit } = this.props
    const { openDialogMenu, openDialogIcon } = this.state;

    const orderNum = (this.props.editValues != null &&
      this.props.editValues.get('values') != null &&
      this.props.editValues.get('values').get('orderNum') != null &&
      Number.isNaN(this.props.editValues.get('values').get('orderNum')) === false)
      ? Number(this.props.editValues.get('values').get('orderNum')) : 0;

    const menuId = this.props.initialValues ? this.props.initialValues.get('id') : null;
    return (
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={10}>
            <div className={classes.divIconArea}>
              <Field
                name="parentId"
                component={TextFieldRedux}
                ref={this.saveRef}
                className={classes.txtHidden}
                type="hidden"
              />
              <Field
                name="parentPath"
                component={TextFieldRedux}
                label={intl.formatMessage({ id: 'app.admin.system.menu.parent', defaultMessage: "Parent Menu" })}
                fullWidth
                className={classes.txtIconArea}
                inputProps={{ readOnly: true }}
              />
              <Button
                className={classes.btnIconArea}
                variant="contained"
                color="primary"
                onClick={this.handleMenuDialogOpen}
              >
                <AccountTree />
              </Button>
            </div>
            <ChooseParentMenuDialogWrapped
              title={intl.formatMessage({ id: 'app.admin.system.menu.choose_parent', defaultMessage: "Choose Parent Menu" })}
              open={openDialogMenu}
              onClose={this.handleMenuDialogClose}
              scroll="paper"
              aria-labelledby="scroll-dialog-title"
              maxWidth={'md'}
            />
          </Grid>
          <Grid item xs={10}>
            <Field
              name="name"
              component={TextFieldRedux}
              label={intl.formatMessage({ id: 'app.admin.system.menu.name_default', defaultMessage: "Menu Name(Default)" })}
              required
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={10}>
            <Accordion >
              <AccordionSummary className={classes.accordionSummary} expandIcon={<ExpandMoreIcon />}>
                <div className={classes.divSummary}>Menu Names (Others)</div>
              </AccordionSummary>
              <AccordionDetails className={classes.accordionDetail}>
                <Field
                  name="name_en"
                  component={TextFieldRedux}
                  label={intl.formatMessage({ id: 'app.admin.system.menu.name_english', defaultMessage: "Menu Name(English)" })}
                  fullWidth
                  autoComplete="off"
                />
                <Field
                  name="name_de"
                  component={TextFieldRedux}
                  label={<FormattedMessage id="app.admin.system.menu.name_germany" defaultMessage="Menu Name(Germany)" />}
                  fullWidth
                  autoComplete="off"
                />
                <Field
                  name="name_cs"
                  component={TextFieldRedux}
                  label={intl.formatMessage({ id: 'app.admin.system.menu.name_czech', defaultMessage: "Menu Name(Czech)" })}
                  fullWidth
                  autoComplete="off"
                />
                <Field
                  name="name_pl"
                  component={TextFieldRedux}
                  label={<FormattedMessage id="app.admin.system.menu.name_polish" defaultMessage="Menu Name(Polish)" />}
                  fullWidth
                  autoComplete="off"
                />
                <Field
                  name="name_ru"
                  component={TextFieldRedux}
                  label={intl.formatMessage({ id: 'app.admin.system.menu.name_russian', defaultMessage: "Menu Name(Russian)" })}
                  fullWidth
                  autoComplete="off"
                />
                <Field
                  name="name_fr"
                  component={TextFieldRedux}
                  label={intl.formatMessage({ id: 'app.admin.system.menu.name_france', defaultMessage: "Menu Name(France)" })}
                  fullWidth
                  autoComplete="off"
                />
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={10}>
            <Field
              name="key"
              component={TextFieldRedux}
              label={intl.formatMessage({ id: 'app.admin.system.menu.key', defaultMessage: "Menu Key" })}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={10}>
            <FormLabel component="label"><FormattedMessage id="app.admin.system.menu.choose_type" defaultMessage="Choose Menu Type" /></FormLabel>
            <Field row required name="type" component={renderRadioGroup}>
              <FormControlLabel value="0" control={<Radio />} label={intl.formatMessage({ id: 'app.admin.system.menu.type_menu', defaultMessage: "Menu" })} />
              <FormControlLabel value="1" control={<Radio />} label={intl.formatMessage({ id: 'app.admin.system.menu.type_button', defaultMessage: "Button" })} />
            </Field>
          </Grid>
          <Grid item xs={10}>
            <div className={classes.divIconArea}>
              <Field
                name="icon"
                component={TextFieldRedux}
                label={intl.formatMessage({ id: 'app.admin.system.menu.icon', defaultMessage: "Menu Icon" })}
                size="small"
                className={classes.txtIconArea}
                autoComplete="off"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton className={classes.btnInnerTextArea}>
                        <Ionicon icon={this.getIcon()} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              >
              </Field>
              <Button
                className={classes.btnIconArea}
                variant="contained"
                color="primary"
                onClick={this.handleIconDialogOpen}
              >
                <ImageSearch />
              </Button>
            </div>
            <ChooseMenuIconDialogWrapped
              title={intl.formatMessage({ id: 'app.admin.system.menu.choose_icon', defaultMessage: "Choose Icon" })}
              open={openDialogIcon}
              onClose={this.handleIconDialogClose}
              aria-labelledby="scroll-dialog-title"
              maxWidth={'lg'}
            />
          </Grid>
          <Grid item xs={10}>
            <Field
              name="link"
              component={TextFieldRedux}
              label={intl.formatMessage({ id: 'app.admin.system.menu.link', defaultMessage: "Link" })}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={10}>
            <Field
              name="permission"
              component={TextFieldRedux}
              label={intl.formatMessage({ id: 'app.admin.system.menu.permission', defaultMessage: "Permission" })}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={10}>
            <FormLabel><FormattedMessage id="app.admin.system.menu.order" defaultMessage="Order" /></FormLabel>
            <NumberGroupButtons
              name="orderNum"
              label={intl.formatMessage({ id: 'app.admin.system.menu.order', defaultMessage: "Order" })}
              value={orderNum}
              onChange={(value) => this.handleChangeOrderNum(value)}
            />
          </Grid>

          <Grid item container item xs={10} direction="row" justify="flex-end" alignItems="flex-start">
            {(menuId != null && Auths.hasPermission(authUser, ['menu:update'])) && (
              <Button className={classes.button} color="primary" type="submit" variant="contained" size="small" disabled={submitting}>
                <Save className={classes.leftIcon} /><FormattedMessage id="app.button.update" defaultMessage="Update" />
              </Button>
            )}
            {(menuId == null && Auths.hasPermission(authUser, ['menu:add'])) && (
              <Button className={classes.button} color="primary" type="submit" variant="contained" size="small" disabled={submitting}>
                <AddCircle className={classes.leftIcon} /><FormattedMessage id="app.button.add" defaultMessage="Add" />
              </Button>
            )}
            {(Auths.hasAnyPermission(authUser, ['menu:add', 'menu:update'])) && (
              <Button className={classes.button} type="button" disabled={pristine || submitting} onClick={reset} >
                <Clear className={classes.leftIcon} /><FormattedMessage id="app.button.reset" defaultMessage="Reset" />
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    );
  }
}

EditableMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  init: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  force: state,
  authUser: state.getIn(['auth', 'authUser']),
  initialValues: state.getIn(['initval', 'formValues']),
  editValues: state.getIn(['form', branch])
});

const mapDispatchToProps = dispatch => ({
  init: bindActionCreators(initAction, dispatch),
  clear: () => dispatch(clearAction),
});

const ReduxFormMapped = reduxForm({
  form: branch,
  enableReinitialize: true,
})(EditableMenu);

const CrudMenuEditMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxFormMapped);

export default withStyles(styles)(injectIntl(CrudMenuEditMapped));


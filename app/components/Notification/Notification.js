import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import {injectIntl, intlShape, FormattedMessage} from 'react-intl';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';


const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = theme => ({
  close: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    padding: 0,
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
});

class Notification extends React.Component {
  
  handleClose = (event, reason) => {
    const { onClose } = this.props;
    if (reason === 'clickaway') {
      return;
    }
    if (onClose != null) {
      onClose('Close Notification');
    }
  };

  render() {
    const { 
      classes,
      className,
      intl,
      isOpen,
      message,
      messageIntl,
      onClose, 
      variant,
      vertical,
      horizontal,
      ...other
    } = this.props;

    const Icon = variantIcon[variant];
    
    const getMessage = () => {
      if (message != null && message.trim().length > 0) {
        return message;
      } else if(messageIntl != null && messageIntl.trim().length > 0) {
        return intl.formatMessage({id: messageIntl, defaultMessage: ""})
      } else {
        return '';
      }
    }

    return (
      <Snackbar
        anchorOrigin={{
          vertical: vertical,
          horizontal: horizontal,
        }}
        open={isOpen && ((message != null && message.trim().length > 0) || (messageIntl != null && messageIntl.trim().length > 0))}
        autoHideDuration={3000}
        onClose={() => this.handleClose()}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={message}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={() => this.handleClose()}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      >
        <SnackbarContent
          className={classNames(classes[variant], className)}
          aria-describedby="client-snackbar"
          message={(
            <span id="client-snackbar" className={classes.message}>
              <Icon className={classNames(classes.icon, classes.iconVariant)} />
              {getMessage()}
            </span>
          )}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={onClose}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
          {...other}
        />
      </Snackbar>
    );
  }
}

Notification.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  message: PropTypes.string,
  messageIntl: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  vertical: PropTypes.oneOf(['top', 'bottom']),
  horizontal: PropTypes.oneOf(['left', 'center', 'right']),
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
};

Notification.defaultProps = {
  variant: 'success',
  vertical: 'top',
  horizontal: 'center',
  isOpen: true
};

export default withStyles(styles)(injectIntl(Notification));

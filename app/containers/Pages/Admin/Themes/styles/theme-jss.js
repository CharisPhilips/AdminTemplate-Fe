import { lighten, darken, fade } from '@material-ui/core/styles/colorManipulator';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

const styles = theme => ({
  rootTable: {
    width: '100%',
    marginTop: theme.spacing(0),
    overflowX: 'auto',
  },
  spacer: {
    flex: '1 1 100%',
  },
  flex: {
    display: 'flex'
  },
  actions: {
    color: theme.palette.text.secondary,
    display: 'flex',
    '& > span > label': {
      margin: 'auto'
    }
  },
  toolbar: {
    backgroundColor: theme.palette.type === 'dark' ? darken(theme.palette.primary.light, 0.6) : theme.palette.primary.light,
    minHeight: 48,
  },
  title: {
    flex: '0 0 auto',
    '& h6': {
      fontSize: 16,
      color: theme.palette.type === 'dark' ? darken(theme.palette.primary.light, 0.2) : darken(theme.palette.primary.dark, 0.2),
    }
  },
  button: {
    marginLeft: `${theme.spacing(1)}px`,
  },
  iconSmall: {
    fontSize: 20,
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  medium: {
    '& tr': {
      height: 48,
      '& td, th': {
        padding: '4px 56px 4px 24px',
        fontSize: 14
      }
    }
  },
  anchor: {
    cursor: 'pointer'
  },
  inputUpload: {
    display: 'none',
  },
});

export default styles;

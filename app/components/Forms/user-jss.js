import { fade } from '@material-ui/core/styles/colorManipulator';
import cyan from '@material-ui/core/colors/cyan';
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';
import bg from 'kilcote-images/petal_grey_bg.svg';
import bgLight from 'kilcote-images/petal_bg.svg';
import { gradientBgLight } from 'containers/Templates/appStyles-jss';

const rootWraper = {
  display: 'flex',
  width: '100%',
  zIndex: 1,
  position: 'relative'
};

const wrapper = (theme, opacity) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  backgroundColor: fade(theme.palette.background.paper, opacity),
  backgroundRepeat: 'no-repeat',
  color: theme.palette.text.primary,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed'
});

const styles = theme => ({
  root: {
    ...rootWraper
  },
  rootFull: {
    ...rootWraper,
    height: '100%',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      overflow: 'hidden'
    },
  },
  field: {
    width: '100%',
    marginBottom: 20
  },
  paperWrap: {
    ...wrapper(theme, 1),
  },
  sideWrap: {
    ...wrapper(theme, 1),
    height: '100%',
    borderRadius: 0,
    [theme.breakpoints.up('md')]: {
      width: 480,
    },
    '& $topBar': {
      marginBottom: theme.spacing(4)
    }
  },

  petal: {
    backgroundImage: theme.palette.type === 'dark' ? `url(${bgLight})` : `url(${bg})`,
  },
  icon: {},
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    '& $icon': {
      marginRight: theme.spacing(1)
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      marginBottom: theme.spacing(3),
      '& a': {
        display: 'none'
      }
    }
  },
  outer: {},
  brand: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px 10px',
    position: 'relative',
    fontSize: 16,
    fontWeight: 500,
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&$outer': {
      color: theme.palette.common.white,
    },
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(2)
    },
    '& img': {
      width: 90,
      marginRight: 10,
    },
  },
  formWrap: {
    [theme.breakpoints.up('sm')]: {
      padding: '30px 100px'
    },
    [theme.breakpoints.up('md')]: {
      padding: '30px 150px'
    },
  },
  formControl: {
    width: '100%',
    marginBottom: theme.spacing(1)
  },
  userFormWrap: {
    width: '94%',
    [theme.breakpoints.up('md')]: {
      width: 720
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(3)
    },
  },

  title: {
    color: theme.palette.primary.main,
  },
  subtitle: {
    fontSize: 14
  },
  btnArea: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: `${theme.spacing(2)}px 0`,
    fontSize: 12,
    '& $label': {
      fontSize: 12,
      '& span': {
        fontSize: 12
      }
    },
    '& button': {
      margin: `0 ${theme.spacing(1)}px`
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      '& button': {
        width: '100%',
        margin: 5
      }
    },
  },
  noMargin: {
    margin: 0
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
  tab: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(1)}px`,
  },
  link: {
    fontSize: '0.875rem',
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  avatar: {
    width: 150,
    height: 150,
    [theme.breakpoints.up('lg')]: {
      marginRight: theme.spacing(3),
    },
    boxShadow: theme.glow.medium
  },
  optArea: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: `0 ${theme.spacing(0.5)}px`
  },
  txtHidden: {
    width: 0,
    height: 0,
    display: 'none'
  },
});

export default styles;

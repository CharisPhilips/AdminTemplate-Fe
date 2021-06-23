const styles = theme => ({
  rootCounterFull: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    [theme.breakpoints.up('lg')]: {
      marginLeft: 'auto',
      marginRight: 'auto',
      width:1024,
    },
  },
  counterIcon: {
    color: theme.palette.common.white,
    opacity: 0.7,
    fontSize: 84
  },
});

export default styles;
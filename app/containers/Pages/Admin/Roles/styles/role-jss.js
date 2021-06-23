const styles = theme => ({
  title: {
    display: 'block',
    margin: `${theme.spacing(3)}px 0`,
    color: theme.palette.common.white,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  heading: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  root: {
    width: '100%',
    flexGrow: 1,
    padding: 30
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
  buttonInit: {
    margin: theme.spacing(4),
    textAlign: 'center'
  },
  divider: {
    margin: theme.spacing(3, 0)
  },
  opt: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  buttonAction: {
    margin: theme.spacing(1),
    textAlign: 'center'
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
});

export default styles;

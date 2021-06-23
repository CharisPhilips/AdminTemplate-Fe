const styles = theme => ({
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
  avatarWrap: {
    width: 100,
    height: 100,
    margin: '10px auto 30px',
    position: 'relative'
  },
  hiddenDropzone: {
    display: 'none'
  },
  uploadAvatar: {
    width: '100%',
    height: '100%',
    background: theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[100],
  },
  buttonUpload: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -58%)'
    // transform: 'translate(-50%, -50%)'
  },
});

export default styles;
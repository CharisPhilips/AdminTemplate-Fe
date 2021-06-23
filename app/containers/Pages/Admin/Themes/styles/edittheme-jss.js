import { highlightElement } from "prismjs";

const styles = theme => ({
  flex: {
    flex: 1,
  },
  field: {
    width: '100%',
    marginBottom: 20,
  },
  divIconArea: {
    display: 'flex',
    marginRight: 16,
    marginTop: 0,
    alignItems: 'center',
  },
  txtIconArea: {
    width: '90%'
  },
  txtHidden: {
    width: 0,
    height: 0,
    display: 'none'
  },
  btnIconArea: {
    marginTop: 15,
    marginLeft: 10,
  },
  btnInnerTextArea: {
    width: '40px !important',
    height: '40px !important'
  },
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
  },
  dialogNoPaper: {
    minHeight: '80vh',
    minHeight: '80vh',
    overflow: 'hidden'
  },
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  divSaveButton: {
    display: 'flex',
    justifyContent: 'center',
  },
  group: {
    width: '10%',
    padding: theme.spacing(1),
  }
});

export default styles;

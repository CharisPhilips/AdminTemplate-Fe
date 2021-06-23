import { fade } from '@material-ui/core/styles/colorManipulator';
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
    width: '80%'
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
  accordionSummary: {
    paddingLeft: 5,
    marginTop: 16,
    color: fade(theme.palette.text.secondary, 0.2),
    border: '1px solid rgba(0,0,0,0.32)',
    'min-height': '50px !important',
    borderRadius: 8,
    '& .Mui-expanded': {
      margin: 0
    }
  },
  divSummary: {
    fontSize: 14,
  },
  accordionDetail: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
  }
  
});

export default styles;

import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import classNames from 'classnames';
import css from 'kilcote-styles/Table.scss';
import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '@material-ui/icons/ArrowDownward';
import EditIcon from '@material-ui/icons/BorderColor';

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
  },
  padding: {
    padding: theme.spacing(0, 1),
    height: 64
  }
});

class RowReadOnly extends React.Component {
  render() {
    const {
      anchor,
      classes,
      item,
      removeRow,
      editRow,
      downloadRow,
      branch
    } = this.props;

    const eventDel = () => {
      removeRow(item, branch);
    };
    const eventEdit = () => {
      editRow(item, branch);
    };
    const eventDownload = () => {
      downloadRow(item, branch);
    }

    const renderCell = dataArray => dataArray.map((itemCell, index) => {
      if (itemCell.name !== 'action' && !itemCell.hidden) {
        if ((itemCell.type === 'select' || itemCell.type === 'radio') && itemCell.rule != null) {
          return (
            <TableCell className={classes.padding} key={index.toString()}>
              {item.get(itemCell.name) != null ? itemCell.rule.get(item.get(itemCell.name).toString()) : ''}
            </TableCell>
          );
        } else {
          return (
            <TableCell className={classes.padding} key={index.toString()}>
              {item.get(itemCell.name) != null ? item.get(itemCell.name).toString() : ''}
            </TableCell>
          );
        }
      }
      return false;
    });
    return (
      <tr>
        {renderCell(anchor)}
        <TableCell className={classes.padding}>
          {(editRow != null) &&
            <IconButton
              onClick={() => eventEdit(this)}
              className={classNames((item.get('edited') ? css.hideAction : ''), classes.button)}
              aria-label="Edit"
            >
              <EditIcon />
            </IconButton>
          }
          {(removeRow != null) &&
            <IconButton
              onClick={() => eventDel(this)}
              className={classes.button}
              aria-label="Delete"
            >
              <DeleteIcon />
            </IconButton>
          }
          {(downloadRow != null && item.get('canDownload') == true) &&
            <IconButton
              onClick={() => eventDownload(this)}
              className={classes.button}
              aria-label="Download"
            >
              <DownloadIcon />
            </IconButton>
          }
        </TableCell>
      </tr>
    );
  }
}

RowReadOnly.propTypes = {
  anchor: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  removeRow: PropTypes.func,
  editRow: PropTypes.func,
  downloadRow: PropTypes.func,
  branch: PropTypes.string.isRequired,
};

export default withStyles(styles)(RowReadOnly);

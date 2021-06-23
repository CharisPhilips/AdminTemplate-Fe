import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import AddIcon from '@material-ui/icons/Add';
import BackIcon from '@material-ui/icons/ArrowBack';
import css from 'kilcote-styles/Table.scss';
import RowReadOnly from './RowReadOnly';
import styles from '../tableStyle-jss';

class MainTableForm extends React.Component {

  onChangePageHandle(event, page) {
    if (this.props.handleChangePage != null) {
      this.props.handleChangePage(page);
    }
  };

  onChangeRowsPerPageHandle(event) {
    if (this.props.handleChangeRowsPerPage != null) {
      this.props.handleChangeRowsPerPage(event.target.value);
    }
  };

  render() {
    const {
      title,
      classes,
      intl,
      items,
      removeRow,
      editRow,
      addNew,
      downloadRow,
      anchor,
      branch,
      width,
      rowsPerPage,
      totalCount,
      page
    } = this.props;

    var getItems = null;
    getItems = dataArray => dataArray.map((item, index) => (
      <RowReadOnly
        item={item}
        key={index}
        removeRow={removeRow != null ? () => removeRow(item, branch) : null}
        editRow={editRow != null ? () => editRow(item, branch) : null}
        downloadRow={downloadRow != null ? () => downloadRow(item, branch) : null}
        anchor={anchor}
        branch={branch}
      />
    ));

    const getHead = dataArray => dataArray.map((item, index) => {
      if (!item.hidden) {
        return (
          <TableCell padding="none" key={index.toString()} width={item.width}>{item.label}</TableCell>
        );
      }
      return false;
    });
    return (
      <div>
        <Toolbar className={classes.toolbar}>
          <div className={classes.title}>
            <Typography variant="h6">{title}</Typography>
          </div>
          {(this.props.backHome != null) && (
            <div className={classes.actions}>
              <Tooltip title={intl.formatMessage({ id: 'app.button.back', defaultMessage: "Back" })}>
                <Button variant="contained" onClick={this.props.backHome} color="primary" className={classes.button}>
                  <BackIcon className={classNames(isWidthUp('sm', width) && classes.leftIcon, classes.iconSmall)} />
                  <FormattedMessage id="app.button.back" defaultMessage="Back" />
                </Button>
              </Tooltip>
            </div>
          )}

          <div className={classes.spacer} />
          <div className={classes.actions}>
            {(addNew != null) &&
              <Tooltip title="Add Item">
                <Button variant="contained" onClick={() => addNew(anchor, branch)} color="primary" className={classes.button}>
                  <AddIcon className={classNames(isWidthUp('sm', width) && classes.leftIcon, classes.iconSmall)} />
                  {isWidthUp('sm', width) && intl.formatMessage({ id: 'app.button.add_new', defaultMessage: "Add New" })}
                </Button>
              </Tooltip>
            }
          </div>
        </Toolbar>
        <div className={classes.rootTable}>
          <Table className={classNames(css.tableCrud, classes.table, classes.stripped)}>
            <TableHead>
              <TableRow>
                {getHead(anchor)}
              </TableRow>
            </TableHead>
            <TableBody>
              {getItems(items)}
            </TableBody>
          </Table>
        </div>

        {(
          rowsPerPage != null && rowsPerPage > 0 && page != null) &&
          (<TablePagination
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            labelRowsPerPage={intl.formatMessage({ id: 'app.pagination.rowsperpage', defaultMessage: "Rows per page:" })}
            onChangePage={(event, page) => this.onChangePageHandle(event, page)}
            onChangeRowsPerPage={(event) => this.onChangeRowsPerPageHandle(event)}
          />)}
      </div>
    );
  }
}

MainTableForm.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.object.isRequired,
  anchor: PropTypes.array.isRequired,
  addNew: PropTypes.func,
  editRow: PropTypes.func,
  removeRow: PropTypes.func,
  branch: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  downloadRow: PropTypes.func,
  backHome: PropTypes.func,
  //pagination
  rowsPerPage: PropTypes.number,
  totalCount: PropTypes.number,
  page: PropTypes.number,
  handleChangePage: PropTypes.func,
  handleChangeRowsPerPage: PropTypes.func,
};

export default withWidth()(withStyles(styles)(injectIntl(MainTableForm)));

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import CloudUpload from '@material-ui/icons/CloudUpload';
import CloudDownload from '@material-ui/icons/CloudDownload';
import AddIcon from '@material-ui/icons/Add';
import DeleteForever from '@material-ui/icons/DeleteForever';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Checkbox from '@material-ui/core/Checkbox';
import EnhancedTableHead from 'kilcote-components/Tables/tableParts/TableHeader';
import styles from '../styles/theme-jss';
import * as Auths from 'kilcote-utils/auth';
import * as Webapis from 'kilcote-api/theme'

function createData(id, name, key) {
  counter += 1;
  return {
    id: id,
    name: name,
    key: key
  };
}

class TableTheme extends React.Component {

  _isMounted = false;

  constructor(props, context) {
    super(props, context);
    this.state = {
      order: 'asc',
      orderBy: 'key',
      selected: [],
      columnData: [
        {
          id: 'name',
          numeric: false,
          label: props.intl.formatMessage({ id: 'app.admin.system.theme.table_name', defaultMessage: "Theme Name" }),
          width: '100',
        }, {
          id: 'key',
          numeric: false,
          label: props.intl.formatMessage({ id: 'app.admin.system.theme.table_key', defaultMessage: "Theme Key" }),
          width: 'auto'
        }
      ],
      data: [],
      page: 0,
      rowsPerPage: 10,
      defaultPerPage: 10,
    };
  }

  componentDidMount() {
    const { childTableRef } = this.props;
    childTableRef(this);
    this._isMounted = true;
    this.fetchData();
  }

  fetchData() {
    Webapis.getTotalThemes().then(
      (response) => {
        if (this._isMounted) {
          this.setState({ data: response.data.theme });
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  componentWillUnmount() {
    const { childTableRef } = this.props;
    childTableRef(undefined);
    this._isMounted = false;
  }

  handleRequestSort = (event, property) => {
    const { orderBy, order, data } = this.state;
    const orderByConst = property;
    let orderLet = 'desc';

    if (orderBy === property && order === 'desc') {
      orderLet = 'asc';
    }
    const dataConst = orderLet === 'desc'
      ? data.sort((a, b) => (b[orderByConst] < a[orderByConst] ? -1 : 1))
      : data.sort((a, b) => (a[orderByConst] < b[orderByConst] ? -1 : 1));

    this.setState({ data: dataConst, order: orderLet, orderBy: orderByConst });
  };

  handleSelectAllClick = (event, checked) => {
    const { data } = this.state;
    if (checked) {
      this.setState({ selected: data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, data) => {
    this.props.gotoThemeDetail(data);
  };

  handleCheck = (id, event) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    this.setState({ selected: newSelected });
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1; // eslint-disable-line

  handleUserInput(value) {
    // Show all item first
    const { data, defaultPerPage } = this.state;
    if (value !== '') {
      this.setState({ rowsPerPage: data });
    } else {
      this.setState({ rowsPerPage: defaultPerPage });
    }
  }

  render() {
    const { classes, intl, authUser, addClick, deleteClick, downloadClick, uploadClick } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page, columnData } = this.state;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - (page * rowsPerPage));
    const renderCell = (dataArray, keyArray) => keyArray.map((itemCell, index) => (
      <TableCell align={itemCell.numeric ? 'right' : 'left'} key={index.toString()} className={classes.anchor} onClick={event => this.handleClick(event, dataArray)}>{dataArray[itemCell.id]}</TableCell>
    ));
    return (
      <div>
        <Grid container item xs={12} spacing={3} direction="row" justify="flex-end" alignItems="flex-start">
          <Grid item xs={12}>
            <Toolbar className={classes.toolbar}>
              <div className={classes.title}>
                <Typography variant="h6"><FormattedMessage id="app.admin.system.theme.title" defaultMessage="Theme Manage" /></Typography>
              </div>
              <div className={classes.spacer} />
              <div className={classes.actions}>
                <span>
                  <input
                    accept="/*"
                    className={classes.inputUpload}
                    id="fileCsv"
                    type="file"
                    onChange={uploadClick}
                  />
                  <label htmlFor="fileCsv">
                    <Button variant="contained" component="span" size="medium" color="primary" className={classes.button}>
                      <CloudUpload />
                    </Button>
                  </label>
                </span>
                <span>
                  <Button variant="contained" size="medium" color="primary" className={classes.button} onClick={() => downloadClick()} >
                    <CloudDownload />
                  </Button>
                </span>
                <span>
                  {(Auths.hasPermission(authUser, ['theme:add'])) &&
                    <Button variant="contained" size="medium" color="primary" className={classes.button} onClick={() => addClick()} >
                      <AddIcon />
                      {/* <AddIcon className={classes.leftIcon} />
                      <FormattedMessage id="app.button.add" defaultMessage="Add"/> */}
                    </Button>
                  }
                </span>
                <span>
                  {(Auths.hasPermission(authUser, ['theme:delete'])) &&
                    <Button disabled={selected.length <= 0} variant="contained" size="medium" color="secondary" className={classes.button} onClick={() => deleteClick(selected)}>
                      <DeleteForever />
                      {/* <DeleteForever className={classes.leftIcon} />
                      <FormattedMessage id="app.button.delete" defaultMessage="Delete"/> */}
                    </Button>
                  }
                </span>
              </div>
            </Toolbar>
            <div className={classes.rootTable}>
              <div className={classes.tableWrapper}>
                <Table>
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={this.handleSelectAllClick}
                    onRequestSort={this.handleRequestSort}
                    rowCount={data.length}
                    columnData={columnData}
                    checkcell={true}
                  />
                  <TableBody>
                    {data.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map(n => {
                      const isSelected = this.isSelected(n.id);
                      return (
                        <TableRow
                          role="checkbox"
                          aria-checked={isSelected}
                          tabIndex={-1}
                          key={n.id}
                          selected={isSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox checked={isSelected} onChange={(event) => this.handleCheck(n.id, event)} />
                          </TableCell>
                          {renderCell(n, columnData)}
                        </TableRow>
                      );
                    })}

                  </TableBody>
                </Table>
              </div>
              <TablePagination
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                  'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                  'aria-label': 'Next Page',
                }}
                labelRowsPerPage={intl.formatMessage({ id: 'app.pagination.rowsperpage', defaultMessage: "Rows per page:" })}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

TableTheme.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  gotoThemeDetail: PropTypes.func.isRequired,
  addClick: PropTypes.func.isRequired,
  deleteClick: PropTypes.func.isRequired,
  downloadClick: PropTypes.func.isRequired,
  uploadClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  force: state, // force state from reducer
  authUser: state.getIn(['auth', 'authUser']),
});

const mapDispatchToProps = dispatch => ({
});

const TableThemeMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableTheme);

export default withStyles(styles)(injectIntl(TableThemeMapped));

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Ionicon from 'react-ionicons';
import { Checkbox } from '@material-ui/core';

import { clone } from 'kilcote-utils/objUtils'
import { getParentMenuPath } from 'kilcote-utils/stringUtils'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(1),
    overflowX: 'auto',
  },
  table: {
  },
  hideRow: {
    display: 'none'
  },
  anchor: {
    cursor: 'pointer'
  },
  icon: {
    top: -2,
    position: 'relative',
    left: -5,
    '& svg': {
      fill: theme.palette.text.primary
    }
  }
});

let RenderRow = props => {
  const {
    classes,
    item,
    parent,
    toggleTree,
    clickLeaf,
    treeOpen,
    arrowMore,
    showCheck,
    checkMode,
    changeCheck,
    treeChecked,
    expandIcon,
    collapseIcon,
    leafIcon,
    parentLevel,
    branch
  } = props;

  var keyID = item.id;
  const itemLevel = parentLevel + 1;

  const renderIconMore = (iconName, child) => {
    if (iconName !== 'arrow') {
      return (
        <span className={classes.icon}>
          <Ionicon icon={iconName} onClick={() => toggleTree(item, branch)} />
        </span>
      );
    }
    return (
      <span className={classes.icon}>
        <Ionicon icon="ios-arrow-down" onClick={() => toggleTree(item, branch)} />
      </span>
    );
  };

  const renderIconLess = (iconName, child) => {
    if (iconName !== 'arrow') {
      return (
        <span className={classes.icon}>
          <Ionicon icon={iconName} onClick={() => toggleTree(item, branch)} />
        </span>
      );
    }
    return (
      <span className={classes.icon}>
        <Ionicon icon="ios-arrow-forward" onClick={() => toggleTree(item, branch)} />
      </span>
    );
  };

  const renderIconLeaf = (iconName, item) => {
    if (iconName !== 'arrow') {
      if (clickLeaf != null) {
        return (
          <span className={classes.icon}>
            <Ionicon icon={iconName} onClick={() => clickLeaf(item)} />
          </span>
        );
      } else {
        <span className={classes.icon}>
          <Ionicon icon={iconName} />
        </span>
      }
    } else {
      if (clickLeaf != null) {
        return (
          <span className={classes.icon}>
            <Ionicon icon="ios-arrow-down" onClick={() => clickLeaf(item)} />
          </span>
        );
      } else {
        return (
          <span className={classes.icon}>
            <Ionicon icon="ios-arrow-down" />
          </span>
        );
      }
    }
  };

  const renderCheckbox = (item) => {
    if (showCheck) {
      return (
        <Checkbox checked={treeChecked.indexOf(keyID) != -1} onChange={(event) => changeCheck(item, event.target.checked, checkMode, branch)} />
      );
    } else {
      return (
        <></>
      );
    }
  };

  const renderCell = (item, parentCell, colIndex, level) => {
    if (item.checked == null) {
      item.checked = false;
    }
    const paddingTop = showCheck ? 0 : 8;
    const paddingBottom = showCheck ? 0 : 5;
    if (colIndex == 0) {
      if (parentCell) {
        return (
          <TableCell
            style={{ paddingLeft: (level - 1) * 20, paddingTop: paddingTop, paddingBottom: paddingBottom }}
          >
            {arrowMore.indexOf(keyID) > -1 ? renderIconMore(collapseIcon, item.child) : renderIconLess(expandIcon, item.child)}
            {renderCheckbox(item)}
            {clickLeaf != null ? <span onClick={() => clickLeaf(item)}>{item.name}</span> : <span>{item.name}</span>}
          </TableCell>
        );
      }
      else {
        return (
          <TableCell style={{ paddingLeft: (level - 1) * 20, paddingTop: paddingTop, paddingBottom: paddingBottom }}>
            {renderIconLeaf(leafIcon, item)}
            {renderCheckbox(item)}
            {clickLeaf != null ? <span onClick={() => clickLeaf(item)}>{item.name}</span> : <span>{item.name}</span>}
          </TableCell>
        );
      }
    }
    else {
      return (
        <TableCell padding="default">{item.name}</TableCell>
      );
    }
  }

  const row = parent ? (
    <TableRow
      key={item.id}
      className={treeOpen.indexOf(keyID) < 0 && parentLevel > 1 ? classes.hideRow : classes.anchor}
    >
      {renderCell(item, true, 0, itemLevel)}
    </TableRow>
  ) : (
    <TableRow
      key={item.id}
      className={treeOpen.indexOf(keyID) < 0 && parentLevel > 1 ? classes.hideRow : classes.anchor}
    >
      {renderCell(item, false, 0, itemLevel)}
    </TableRow>
  );

  return [row];
};

RenderRow.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  parent: PropTypes.bool.isRequired,
  toggleTree: PropTypes.func.isRequired,
  clickLeaf: PropTypes.func,
  treeOpen: PropTypes.object.isRequired,
  arrowMore: PropTypes.object.isRequired,
  showCheck: PropTypes.bool,
  checkMode: PropTypes.bool,
  changeCheck: PropTypes.func,
  treeChecked: PropTypes.object,
  expandIcon: PropTypes.string.isRequired,
  collapseIcon: PropTypes.string.isRequired,
  leafIcon: PropTypes.string.isRequired,
  parentLevel: PropTypes.number,
  branch: PropTypes.string.isRequired,
};

let RenderRowNode = withStyles(styles)(RenderRow);

class TreeTable extends React.Component {
  render() {
    const {
      classes,
      expandIcon,
      collapseIcon,
      leafIcon,
      treeOpen,
      arrowMore,
      toggleTree,
      clickLeaf,
      showCheck,
      checkMode,
      treeChecked,
      changeCheck,
      branch
    } = this.props;
    const parentRow = true;

    const getData = (dataArray, parent, parentLevel) => {
      var result = [];
      const arrayLength = dataArray.length;
      for (let index = 0; index < arrayLength; index++) {
        var item = dataArray[index];

        item.parentPath = getParentMenuPath(item.parent);
        if (parent != null) {
          item.parent = clone(parent);
          item.parent.child = [];
        }

        if (parentLevel == null) {
          parentLevel = 0;
        }
        if (item.child != null && item.child.length > 0) {
          result.push(
            [
              <RenderRowNode
                key={(item.id).toString()}
                expandIcon={expandIcon}
                collapseIcon={collapseIcon}
                leafIcon={leafIcon}
                treeOpen={treeOpen}
                arrowMore={arrowMore}
                toggleTree={toggleTree}
                clickLeaf={clickLeaf}
                showCheck={showCheck}
                treeChecked={treeChecked}
                changeCheck={changeCheck}
                checkMode={checkMode}
                item={item}
                parentLevel={parentLevel + 1}
                parent={parentRow}
                branch={branch}
              />,
              getData(item.child, item, parentLevel + 1)
            ]
          );
        }
        else {
          result.push(
            <RenderRowNode
              key={(item.id).toString()}
              expandIcon={expandIcon}
              collapseIcon={collapseIcon}
              leafIcon={leafIcon}
              item={item}
              treeOpen={treeOpen}
              arrowMore={arrowMore}
              toggleTree={toggleTree}
              clickLeaf={clickLeaf}
              showCheck={showCheck}
              checkMode={checkMode}
              treeChecked={treeChecked}
              changeCheck={changeCheck}
              parentLevel={parentLevel + 1}
              branch={branch}
              parent={false}
            />
          );
        }
      }
      return result;
    }

    const getHead = dataArray => dataArray.map((item, index) => <TableCell padding="default" key={index.toString()}>{item.label}</TableCell>);

    return (
      <Table className={classes.table}>
        {(this.props.tableHead &&
          <TableHead>
            <TableRow>
              {getHead(this.props.tableHead)}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {getData(this.props.tableBody)}
        </TableBody>
      </Table>
    );
  }
}

TreeTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHead: PropTypes.array,
  tableBody: PropTypes.array.isRequired,
  treeOpen: PropTypes.object.isRequired,
  toggleTree: PropTypes.func.isRequired,
  arrowMore: PropTypes.object.isRequired,
  clickLeaf: PropTypes.func,
  showCheck: PropTypes.bool,
  checkMode: PropTypes.bool,
  treeChecked: PropTypes.object,
  changeCheck: PropTypes.func,
  branch: PropTypes.string.isRequired,
  expandIcon: PropTypes.string,
  collapseIcon: PropTypes.string,
  leafIcon: PropTypes.string
};

TreeTable.defaultProps = {
  showCheck: false,
  checkMode: false,
  leafIcon: 'ios-document-outline',
  expandIcon: 'arrow',
  collapseIcon: 'arrow'
};

export default withStyles(styles)(TreeTable);
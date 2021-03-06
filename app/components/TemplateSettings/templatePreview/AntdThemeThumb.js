import React from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './thumbPreview-jss';

const LeftSidebarThumb = props => {
  const { classes } = props;
  return (
    <Paper className={classes.thumb}>
      <div className={classes.appPreview}>
        <header>
          <ul className={classes.topNav}>
            {[0, 1, 2, 3].map(index => {
              if (index === 0) {
                return (
                  <li key={index.toString()} className={classes.active}>
                    <span />
                    <ul>
                      <li />
                      <li className={classes.active} />
                      <li />
                      <li />
                    </ul>
                  </li>
                );
              }
              return (
                <li key={index.toString()}><span /></li>
              );
            })}
          </ul>
        </header>
        <aside>
          <ul>
            {[0, 1, 2, 3, 4, 5].map(index => {
              if (index === 1) {
                return (
                  <li key={index.toString()} className={classes.active}>
                    <i />
                    <p />
                  </li>
                );
              }
              return (
                <li key={index.toString()}>
                  <i />
                  <p />
                </li>
              );
            })}
          </ul>
        </aside>
        <div className={classes.previewWrap}>
          <Paper className={classes.content}>
            <div className={classes.title} />
            <div className={classes.ctn1} />
            <div className={classes.ctn2} />
            <div className={classes.ctn2} />
            <div className={classes.ctn2} />
            <div className={classes.ctn2} />
          </Paper>
        </div>
      </div>
    </Paper>
  );
};

LeftSidebarThumb.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LeftSidebarThumb);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'kilcote-components';
import Grid from '@material-ui/core/Grid';
import * as constants from 'kilcote-utils/constants';

import { Button, Divider, FileInput } from '@blueprintjs/core';
import { DateInput, TimePicker, TimePrecision } from '@blueprintjs/datetime';

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-1',
        key: '0-0-1'
      },
      {
        title: 'Child Node2',
        value: '0-0-2',
        key: '0-0-2'
      }
    ]
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1'
  }
];

const styles = () => ({
  root: {
    flexGrow: 1,
  },
});

class testBlueprintPage extends Component {
  _isMounted = false;

  constructor(props, context) {
    super(props, context);
    this.state = {
      date: null,
      format: 'YYYY-MM-DD',
      highlightCurrentDay: false,
      reverseMonthAndYearMenus: false,
      shortcuts: false,
      showActionsBar: false,
      showTimeArrowButtons: false,
      timePrecision: undefined,
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  handleTextChange = (e) => {
    this.setState({ text: e.target.value });
  };

  handleButtonTextChange = (e) => {
    this.setState({ buttonText: e.target.value });
  };

  render() {
    const title = constants.BRAND_NAME + ' - Table';
    const description = constants.BRAND_DESC;
    const { text, buttonText } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock whiteBg icon="ios-person" title="Test Blueprint Page" desc="This page is to test blueprint.">
          <div className={classes.root}>
            <Grid container direction="row" spacing={2} container justify="flex-start">
              <Grid item sm={12}>
                <h3 level={4}>Go to main page:</h3>
                <Button rightIcon="arrow-right" intent="primary" text="Go to Blueprint page" onClick={() => window.open('https://blueprintjs.com/docs/#blueprint/getting-started')} />
              </Grid>
              <Grid item lg={6} md={12}>
                <h3 level={4}>Date:</h3>
                <FileInput text={text} buttonText={buttonText} />
              </Grid>
            </Grid>
          </div>
        </PapperBlock>
      </div>
    );
  }
}

testBlueprintPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  force: state, // force state from reducer
});

const mapDispatchToProps = dispatch => ({
});

const testBlueprintPageMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(testBlueprintPage);

export default withStyles(styles)(testBlueprintPageMapped);

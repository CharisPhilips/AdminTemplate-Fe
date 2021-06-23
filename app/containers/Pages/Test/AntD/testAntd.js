import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'kilcote-components';
import Grid from '@material-ui/core/Grid';
import * as constants from 'kilcote-utils/constants';
import { Typography, TreeSelect, DatePicker, TimePicker, Divider, Button } from 'antd';

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

class testAntdPage extends Component {
  _isMounted = false;

  constructor(props, context) {
    super(props, context);
    this.state = {
      valueMap: {}
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.loops(treeData);
  }

  onChange = value => {
    console.log('Change', this.getPath(value));
    this.setState({ value });
  };

  onSelect = value => {
    console.log('Select:', this.getPath(value));
  };

  getPath(value) {
    const path = [];
    let current = this.state.valueMap[value];
    while (current) {
      path.unshift(current.value);
      current = current.parent;
    }
    return path;
  }

  loops(list, parent) {
    return (list || []).map(({ children, value }) => {
      const node = (this.state.valueMap[value] = {
        parent,
        value
      });
      node.children = this.loops(children, node);
      return node;
    });
  }

  render() {
    const title = constants.BRAND_NAME + ' - Table';
    const description = constants.BRAND_DESC;
    const { classes } = this.props;
    const { Title } = Typography;
    const { value } = this.state;
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
        <PapperBlock whiteBg icon="ios-person" title="Test Antd theme Page" desc="This page is to test antd theme.">
          <div className={classes.root}>
            <Grid container direction="row" spacing={2} container justify="flex-start">
              <Grid item sm={12}>
                <Button type="primary" shape="round" size="default" onClick={() => window.open('https://ant.design/components/overview/')}>
                  Go to Ant homepage
                </Button>
              </Grid>
              <Divider orientation="left" plain />
              <Grid item lg={4} md={6} sm={12}>
                <Title level={4}>Drop tree select:</Title>
                <TreeSelect
                  style={{ width: 300 }}
                  value={value}
                  dropdownStyle={{ maxHeight: 300, overflow: 'auto' }}
                  treeData={treeData}
                  placeholder="Please select"
                  treeDefaultExpandAll
                  onChange={this.onChange}
                  onSelect={this.onSelect}
                />
              </Grid>
              <Grid item lg={4} md={6} sm={12}>
                <Title level={4}>Date:</Title>
                <DatePicker style={{ width: 300 }} />
              </Grid>
              <Grid item lg={4} md={6} sm={12}>
                <Title level={4}>Time:</Title>
                <TimePicker style={{ width: 300 }} />
              </Grid>
            </Grid>
          </div>
        </PapperBlock>
      </div>
    );
  }
}

testAntdPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  force: state, // force state from reducer
});

const mapDispatchToProps = dispatch => ({
});

const testAntdPageMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(testAntdPage);

export default withStyles(styles)(testAntdPageMapped);

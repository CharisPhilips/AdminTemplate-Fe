import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'kilcote-components';
import Grid from '@material-ui/core/Grid';
import * as constants from 'kilcote-utils/constants';

import {
  Button, Container, Row, Col, Navbar, Nav, NavDropdown, Form, FormControl
} from 'react-bootstrap';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
});

class testBootstrapPage extends Component {
  _isMounted = false;

  constructor(props, context) {
    super(props, context);
    this.state = {
      valueMap: {}
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  render() {
    const title = constants.BRAND_NAME + ' - Table';
    const description = constants.BRAND_DESC;
    const { classes } = this.props;
    // const { Title } = Typography;
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
        <PapperBlock whiteBg icon="ios-person" title="Test Bootstrap Page" desc="This page is to test bootstrap.">
          <div className={classes.root}>
            <Row className="justify-content-md-center">
              <Col xs={12} className="m-auto">
                <Button variant="primary" size="default" onClick={() => window.open('https://react-bootstrap.github.io/getting-started/introduction/')}>
                  Go to Bootstrap homepage
                </Button>
              </Col>
              <Col xs={12} className="flex-start">
                <Navbar bg="lighhttps://react-bootstrap.github.io/components/navbar/#homet" expand="lg">
                  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                      <Nav.Link href="#home">Home</Nav.Link>
                      <Nav.Link href="#link">Link</Nav.Link>
                      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                    <Form inline>
                      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                      <Button variant="outline-success">Search</Button>
                    </Form>
                  </Navbar.Collapse>
                </Navbar>
              </Col>
            </Row>
          </div>
        </PapperBlock>
      </div>
    );
  }
}

testBootstrapPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  force: state, // force state from reducer
});

const mapDispatchToProps = dispatch => ({
});

const testBootstrapPageMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(testBootstrapPage);

export default withStyles(styles)(testBootstrapPageMapped);

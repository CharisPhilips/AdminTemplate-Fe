import React from "react";
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import FormGroup from '@material-ui/core/FormGroup';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
const styles = theme => ({
  flex: {
    flex: 1,
  },
});

class NumberGroupButtons extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    }
  }

  componentDidMount() {
    const { value } = this.props;
  }
  
  handleIncrement = () => {
    const { value } = this.props;
    const calcVal = value + 1;
    this.props.onChange(Number(calcVal));
  };

  handleDecrement = () => {
    const { value } = this.props;
    if (value > 0) {
      const calcVal = value - 1;
      this.props.onChange(Number(calcVal));
    }
  };

  handleUpdate = (value) => {
    if (value != null && Number(value) > 0) {
      this.setState(state => ({ counter: Number(value) }));
      if (this.props.onChange != null) {
        this.props.onChange(Number(value));
      }
    }
  }

  render() {
    const { counter } = this.state;
    const { value } = this.props;
    
    return (
      <Grid container justify="flex-start" direction="row">
        <Button variant="contained" onClick={this.handleDecrement}>-</Button>
        <TextField value={value} onChange={(event) => this.handleUpdate(event.target.value)}></TextField>
        <Button variant="contained" onClick={this.handleIncrement}>+</Button>
      </Grid>
    );
  }
}

NumberGroupButtons.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.number.isRequired
};

export default withStyles(styles)(NumberGroupButtons);
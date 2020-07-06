import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
      width: '50%'
  },
});

class BarCodeReader extends Component {
    render() {
        const { classes } = this.props;

        return(
            <TextField onKeyDown={this.props.onBarCodeRead} className={classes.root} id="barcode" label="Scan Barcode" autoFocus/>
        )
    }
  }
  export default withStyles(styles)(BarCodeReader);
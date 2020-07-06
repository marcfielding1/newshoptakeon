import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = theme => ({
  inputs: {
      width: '80%'
  },
  container: {
      width: '100%',
      marginTop: '5px'
  },
  button: {
      marginRight: '10px'
  }
});

class ItemDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: null,
            description: null,
            price: null,
            image: null,
            isSpecial: null,

        }
    }

    async componentDidMount(){

        let itemData = await this.props.fetchData()
        console.log('ITEMDATA',itemData)
        this.setState((state) => {

            return {...state, ...itemData[0]};
        });
    }

    handleChange(e){

        this.setState({ [e.target.id]: e.target.value })
    }

    render() {
        const { classes } = this.props;
        console.log(this.state)

        return(
            <div className={classes.container}>
                <div className={classes.container}>
                    <img src={this.state.image} />
                </div>

                <TextField className={classes.inputs} value={this.state.name} id="name" onChange={this.handleChange.bind(this)} autoFocus/>
                <TextField className={classes.inputs} id="price" value={this.state.price} onChange={this.handleChange.bind(this)}/>
                <FormControlLabel className={classes.inputs} control={<Checkbox id="isSpecial" checked={this.state.isSpecial} onChange={this.handleChange.bind(this)} value="checkedSpecial" color="primary"/>} label="Special"/>
    
            <div className={classes.container}>
                <Button className={classes.button} onClick={() => this.props.saveItem(this.state, false)} variant="contained" color="primary">
                    Save & Move on
                </Button>
                <Button onClick={() => this.props.saveItem(this.state, true)} variant="contained" color="primary">
                    Save & Repeat
                </Button>
            </div>            
        </div>
            )
    }
  }
  export default withStyles(styles)(ItemDetails);

  /*
              <div className={classes.container}>
                <div className={classes.container}>
                    <img src={this.state.image} />
                </div>
                <TextField className={classes.inputs} value={this.state.name} id="name" autoFocus/>
                <TextField className={classes.inputs} value={this.state.description} id="description"/>
                <TextField className={classes.inputs} id="price" value={this.state.price}/>
                <div className={classes.container}>
                    <Button onClick={this.props.saveItem()} variant="contained" color="primary">
                    Save
                    </Button>
                </div>            
            </div>
            */
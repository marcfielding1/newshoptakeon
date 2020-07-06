import React, {Component} from 'react';
import './App.css';

import BarCodeReader from './components/barCodeReader'
import ItemDetails from './components/itemDetails'

const productData = require('./data/products.json')

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isScanning: true,
      isItemDetails: false,
      barCode: null,
    }
  }

  render(){

    if(this.state.isScanning === true){
      return (
        <div className="App">
          <header className="App-header">
            <BarCodeReader onBarCodeRead={this.onBarCodeRead.bind(this)}/>
          </header>
        </div>
      );
  
    } else if(this.state.isItemDetails === true){

      return (
        <div className="App">
          <header className="App-header">
            <ItemDetails saveItem={this.saveItem.bind(this)} details={this.state} fetchData={this.fetchData.bind(this)}/>
          </header>
        </div>
      );
    }
  }

  saveItem({name, price, image, description, isSpecial}, moveOn){
    

    const barcode = this.state.barCode

    const fileData = JSON.stringify({ name, barcode, price });
    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${barcode}.json`;
    link.href = url;
    link.click();
    this.setState((state) => {

      return {...state, isScanning: moveOn === true ? false : true };
    });  
    /*
    return new Promise(async (resolve, reject) => {

      const response = await fetch('http://localhost:30001/saveNewItem', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //mode: 'no-cors',com // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify({ EAN: barcode, name, price, image: (image === null ? 'N/A' : image), description, isSpecial}) // body data type must match "Content-Type" header
      });
      const results = await response;
      this.setState((state) => {

        return {...state, ...results.data, isScanning: moveOn === true ? false : true };
      });      
      resolve(results)
    }) */


  
  }

  fetchData(){

   
    console.log('FETCH', productData.filter((obj) => parseInt(obj.ean) === parseInt(this.state.barCode)))
    console.log("fetchData -> this.state.barcode", this.state.barCode)

    return productData.filter((obj) => obj.ean === this.state.barCode)
  }

  onBarCodeRead(e){

    if (e.key === 'Enter') {

      let value = e.target.value
      console.log("onBarCodeRead -> value", value)
      this.setState((state) => {

        return {...state, barCode: value, isScanning: false, isItemDetails: true};
      });
    }
  }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import MediaCard from './MediaCard';
import Toggles from './Toggles.js';
import ToAddressForm from './forms/ToAddressForm';
import FromAddressForm from './forms/FromAddressForm';
import Button from '@material-ui/core/Button';
import Package from './forms/Package';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      rates: ""
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.getRates = this.getRates.bind(this);
  }

  handleClick(e) {
    console.log("click", e);
    this.setState({ anchorEl: e.currentTarget });
  }

  handleTouchTap(e) {
    console.log("touchTap", e);
    this.setState({ anchorEl: null });
  }
  getRates() {
    let fromName = document.getElementById("from-name").value;
    let fromStreet1 = document.getElementById("from-street1").value;
    let fromStreet2 = document.getElementById("from-street2").value;
    let fromCity = document.getElementById("from-city").value;
    let fromState = document.getElementById("from-state").value;
    let fromCountry = document.getElementById("from-country").value;
    let fromZip = document.getElementById("from-zip").value;
    let toName = document.getElementById("to-name").value;
    let toStreet1 = document.getElementById("to-street1").value;
    let toStreet2 = document.getElementById("to-street2").value;
    let toCity = document.getElementById("to-city").value;
    let toState = document.getElementById("to-state").value;
    let toCountry = document.getElementById("to-country").value;
    let toZip = document.getElementById("to-zip").value;
    console.log(toName, toStreet1, toStreet2, toCity, toState, toCountry, toZip)
    this.setState({ rates: true })
  }


  render() {
    const { anchorEl } = this.state;
    return (
      <div class="App" >
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <AppBar
            title="Compare Shipping Retail Rates"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            href="#"
            onTouchTap={this.handleTouchTap}
            onClick={this.handleClick}
            class="AppBar"
          />
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleTouchTap}>&larr;</MenuItem><Divider />
            <MenuItem onClick={this.handleTouchTap}>Profile</MenuItem><Divider />
            <MenuItem onClick={this.handleTouchTap}>My account</MenuItem><Divider />
            <MenuItem onClick={this.handleTouchTap}>Logout</MenuItem>
          </Menu>

          {!this.state.rates && <div className="bodyWrap">
            <div>
              <Toggles class="toggles" />
            </div>
            <div>
              <h3>To Address</h3>
              <ToAddressForm />
            </div>
            <div>
              <h3>From Address</h3>
              <FromAddressForm />
            </div>
            <div>
              <h3>Package</h3>
              <Package />
            </div>

          </div>}
          {!this.state.rates && <Button color="primary" variant="outlined" onClick={this.getRates}>
            Submit
            </Button>}
          <break></break>
          <ul class="line">
            <Divider />
          </ul><break></break>
          <h3>Rates</h3>
          {this.state.rates &&
            <div className='cardWrap'>

              <MediaCard />
              <MediaCard />
              <MediaCard />
              <MediaCard />
            </div>
          }

        </MuiThemeProvider>

      </div >


    );
  }
}

export default App;

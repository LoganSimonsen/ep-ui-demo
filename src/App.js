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
import MediaCard from './MediaCard'
import Toggles from './Toggles.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
  }

  handleClick(e) {
    console.log("click", e);
    this.setState({ anchorEl: e.currentTarget });
  }

  handleTouchTap(e) {
    console.log("touchTap", e);
    this.setState({ anchorEl: null });
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
          <div className="bodyWrap">
            <Toggles class="toggles" />
            <MediaCard />
          </div>
        </MuiThemeProvider>

      </div>


    );
  }
}

export default App;

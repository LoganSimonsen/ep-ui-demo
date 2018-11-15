import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
// import MediaCard from './MediaCard';
import Toggles from './Toggles.js';
import ToAddressForm from './forms/ToAddressForm';
import FromAddressForm from './forms/FromAddressForm';
import LabelSize from './forms/LabelSize';
import LabelFormat from './forms/LabelFormat';
import Button from '@material-ui/core/Button';
import Package from './forms/Package';
import axios from "axios";
import CircularIndeterminate from './components/CircularIndeterminate';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Swal from 'sweetalert2'
import routes from "./routes";

// require('dotenv').config();

let carriers = [];

// const styles = {
//   card: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 140,
//   },
// };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      rates: "",
      isLoading: false,
      data: [],
      messages: []
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.getRates = this.getRates.bind(this);
    this.dotGet = this.dotGet.bind(this);
    this.stopLoading = this.stopLoading.bind(this);
    this.showDetails = this.showDetails.bind(this);
  }

  handleClick(e) {
    this.setState({ anchorEl: e.currentTarget });
  }

  handleTouchTap(e) {
    this.setState({ anchorEl: null });
  }
  getRates() {
    let setLength = 1;
    let setWidth = 1;
    let setHeight = 1;
    let setWeight = 1;
    let setPDP = 'null';
    this.setState({ isLoading: true })
    if (document.getElementById("length")) {
      let setLength = document.getElementById("length").value
    }
    if (document.getElementById("width")) {
      setWidth = document.getElementById("width").value
    }
    if (document.getElementById("height")) {
      setHeight = document.getElementById("height").value
    }
    if (document.getElementById("weight")) {
      setWeight = document.getElementById("weight").value
    }
    if (document.getElementById("PDP")) {
      setPDP = document.getElementById("PDP").value
    }
    let shipment = {
      labelSize: document.getElementById('labelSizeValue').value,
      labelFormat: document.getElementById('labelFormatValue').value,
      fromName: document.getElementById("from-name").value,
      fromStreet1: document.getElementById("from-street1").value,
      fromStreet2: document.getElementById("from-street2").value,
      fromCity: document.getElementById("from-city").value,
      fromState: document.getElementById("from-state").value,
      fromCountry: document.getElementById("from-country").value,
      fromZip: document.getElementById("from-zip").value,
      toName: document.getElementById("to-name").value,
      toStreet1: document.getElementById("to-street1").value,
      toStreet2: document.getElementById("to-street2").value,
      toCity: document.getElementById("to-city").value,
      toState: document.getElementById("to-state").value,
      toCountry: document.getElementById("to-country").value,
      toZip: document.getElementById("to-zip").value,
      USPS: document.getElementById("USPSToggle").checked,
      UPS: document.getElementById("UPSToggle").checked,
      length: parseInt(setLength),
      width: parseInt(setWidth),
      height: parseInt(setHeight),
      weight: parseInt(setWeight),
      predefinedPackage: setPDP,
    }
    setTimeout(this.dotGet({ shipment }), 1000);
    this.setState({ rates: true })
  }

  dotGet(shipment) {
    let that = this;
    axios.post(`http://localhost:3001/rates`, { shipment }).then(function (response) {
      let temp = response.data.messages;
      that.setState({ data: response.data.rates });
      that.setState({ messages: temp })
      console.log(that.state.messages);
      that.stopLoading();

    })
  }

  stopLoading() {
    this.setState({ isLoading: false })
  }

  showDetails(e, d) {
    e.preventDefault();
    Swal({
      html: `<h3>Rate Details</h3><table className="detailsTable"><tr><td><b>Shipment ID:</b> ${d.shipment_id}</td></tr>` +
        `<tr><td><b>Rate ID:</b> ${d.id}</td></tr>` +
        `<tr><td><b>Carrier:</b> ${d.carrier}</td></tr>` +
        `</table>`
    })
  }


  render() {
    const { anchorEl } = this.state;
    let results = this.state.data.map((d, i) => {
      return (<Card id="cardy">
        <CardActionArea className="mediaCard">
          <CardMedia
            // className={classes.media}
            image="http://allvectorlogo.com/img/2016/06/united-states-postal-service-usps-logo.png"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h1">
              {d.carrier}
            </Typography>
            <Typography component="p">
              ${d.rate}
            </Typography>
            <Typography component="span">
              {d.service}
            </Typography>
            {d.est_delivery_days && <Typography component="span">
              <break></break>
              Estimated Days for Delivery: {d.est_delivery_days}
            </Typography>}
            {d.delivery_days && d.delivery_date_guaranteed && <Typography component="span">
              <break></break>
              Guaranteed Delivery Days: {d.delivery_days}
            </Typography>}
          </CardContent>
        </CardActionArea>
        <CardActions>
          {/* <Button size="small" color="primary">
              Share
  </Button> */}
          <Button size="small" color="primary" onClick={e => this.showDetails(e, d)}>
            Details
  </Button>
        </CardActions>
      </Card>
      )
    })
    // let errors = this.state.messages.map((d, i) => {
    //   return (
    //     <div className='errors'>
    //       {d}
    //     </div>

    //   )
    // })
    return (
      <div className="App" >
        {window.location.hash === '#/' && <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <AppBar
            title="Compare Shipping Retail Rates"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            href="#"
            // onTouchTap={this.handleTouchTap}
            onClick={this.handleClick}
            className="AppBar"
          />
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleTouchTap}>&larr;</MenuItem><Divider />
            <MenuItem onClick={this.handleTouchTap}>Get Rates</MenuItem><Divider />
            <MenuItem onClick={this.handleTouchTap}>Purchase Rate</MenuItem><Divider />
            <MenuItem onClick={this.handleTouchTap}>Logout</MenuItem>
          </Menu>

          {!this.state.rates && <div className="bodyWrap">
            <div>
              <Toggles className="toggles" />
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
            <div className='optionsWrapper'>
              <h3>Options</h3>
              <LabelSize /><br></br>
              <LabelFormat />
            </div>
          </div>}<break></break>
          {!this.state.rates && <Button color="primary" variant="outlined" onClick={this.getRates}>
            Submit
            </Button>}
          <break></break>
          <ul className="line">
            <Divider />
          </ul><break></break>
          {this.state.isLoading && <CircularIndeterminate />}
          <break></break>
          {this.state.rates && <h3>Rates</h3>}

          {this.state.rates && !this.state.isLoading &&
            <div className='cardWrap'>

              {this.state.data && this.state.rates && !this.state.isLoading &&
                <div className="resultsWrapper">
                  {results}
                  <break></break>
                  {/* {errors} */}
                </div>
              }
            </div>
          }
        </MuiThemeProvider>}
        {routes}
      </div >


    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (App);

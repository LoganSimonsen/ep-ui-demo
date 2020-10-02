import React from "react";
import PropTypes from "prop-types";
// import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import HelpIcon from "@material-ui/icons/Help";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

const styles = (theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

class FromAddressForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      street1: "",
      street2: "",
      city: "",
      state: "",
      country: "",
      zip: "",
      phone: "",
      multiline: "Controlled",
      currency: "EUR",
      fromAddr: {},
    };
  }
  componentDidMount() {
    let that = this;
    axios
      .get("http://localhost:3001/lastFromAddress")
      .then(function (response) {
        that.setState({ fromAddr: response });
      })
      .then(function () {
        if (that.state.fromAddr.data) {
          that.setState({
            name: that.state.fromAddr.data.name,
            street1: that.state.fromAddr.data.street1,
            street2: that.state.fromAddr.data.street2,
            city: that.state.fromAddr.data.city,
            state: that.state.fromAddr.data.state,
            country: that.state.fromAddr.data.country,
            zip: that.state.fromAddr.data.zip,
            phone: that.state.fromAddr.data.phone,
          });
        }
      });
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  if(fromAddr) {
    this.setState({ name: fromAddr.name });
  }
  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          variant="outlined"
          id="from-name"
          label="Name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange("name")}
          margin="normal"
        />
        <TextField
          variant="outlined"
          id="from-street1"
          label="Street Line 1"
          className={classes.textField}
          value={this.state.street1}
          onChange={this.handleChange("street1")}
          margin="normal"
        />
        <br></br>
        <TextField
          variant="outlined"
          id="from-street2"
          label="Street Line 2"
          className={classes.textField}
          value={this.state.street2}
          onChange={this.handleChange("street2")}
          margin="normal"
        />
        <TextField
          variant="outlined"
          id="from-city"
          label="City"
          className={classes.textField}
          value={this.state.city}
          onChange={this.handleChange("city")}
          margin="normal"
        />
        <TextField
          variant="outlined"
          id="from-state"
          label="State"
          className={classes.textField}
          value={this.state.state}
          onChange={this.handleChange("state")}
          margin="normal"
        />
        <TextField
          variant="outlined"
          id="from-country"
          label="Country"
          className={classes.textField}
          // value={this.state.country}
          value="US" // currently only US is supported pending possible addition of international shipping
          onChange={this.handleChange("country")}
          margin="normal"
        />
        <TextField
          variant="outlined"
          required
          id="from-zip"
          label="Zip Code"
          value={this.state.zip}
          className={classes.textField}
          onChange={this.handleChange("zip")}
          margin="normal"
        />
        <div>
          <TextField
            variant="outlined"
            required
            id="from-phone"
            label="Phone Number"
            value={this.state.phone}
            className={classes.textField}
            onChange={this.handleChange("phone")}
            margin="normal"
          />
          <Tooltip title="Required by some Carriers" className="toolTip">
            <IconButton aria-label="Help">
              <HelpIcon />
            </IconButton>
          </Tooltip>
        </div>
      </form>
    );
  }
}

FromAddressForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FromAddressForm);

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
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

class ToAddressForm extends React.Component {
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
      toAddr: {},
    };
  }

  componentDidMount() {
    let that = this;
    axios
      .get("http://localhost:3001/lastToAddress")
      .then(function (response) {
        that.setState({ toAddr: response });
      })
      .then(function () {
        if (that.state.toAddr.data) {
          that.setState({
            name: that.state.toAddr.data.name,
            street1: that.state.toAddr.data.street1,
            street2: that.state.toAddr.data.street2,
            city: that.state.toAddr.data.city,
            state: that.state.toAddr.data.state,
            country: that.state.toAddr.data.country,
            zip: that.state.toAddr.data.zip,
            phone: that.state.toAddr.data.phone,
          });
        }
      });
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          variant="outlined"
          id="to-name"
          label="Name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange("name")}
          margin="normal"
        />
        <TextField
          variant="outlined"
          id="to-street1"
          label="Street Line 1"
          className={classes.textField}
          value={this.state.street1}
          onChange={this.handleChange("street1")}
          margin="normal"
        />
        <br></br>
        <TextField
          variant="outlined"
          id="to-street2"
          label="Street Line 2"
          className={classes.textField}
          value={this.state.street2}
          onChange={this.handleChange("street2")}
          margin="normal"
        />
        <TextField
          variant="outlined"
          id="to-city"
          label="City"
          className={classes.textField}
          value={this.state.city}
          onChange={this.handleChange("city")}
          margin="normal"
        />
        <TextField
          variant="outlined"
          id="to-state"
          label="State"
          className={classes.textField}
          value={this.state.state}
          onChange={this.handleChange("state")}
          margin="normal"
        />
        <TextField
          variant="outlined"
          id="to-country"
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
          id="to-zip"
          label="Zip Code"
          className={classes.textField}
          onChange={this.handleChange("zip")}
          margin="normal"
          value={this.state.zip}
        />
        <div>
          <TextField
            variant="outlined"
            id="to-phone"
            label="Phone Number"
            className={classes.textField}
            onChange={this.handleChange("phone")}
            margin="normal"
            value={this.state.phone}
          />
          <Tooltip title="Required by some Carriers">
            <IconButton aria-label="Help">
              <HelpIcon />
            </IconButton>
          </Tooltip>
        </div>
      </form>
    );
  }
}

ToAddressForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToAddressForm);

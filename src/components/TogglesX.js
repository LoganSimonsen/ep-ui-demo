import React from "react";
import Toggle from "material-ui/Toggle";
import Divider from '@material-ui/core/Divider';
import axios from "axios";

const styles = {
  block: {
    maxWidth: 250,
    maxHeight: "70vh",
    overflow: "scroll",
  },
  toggle: {
    marginBottom: 16,
    color: "black",
  },
  thumbOff: {
    backgroundColor: "#ffcccc",
  },
  trackOff: {
    backgroundColor: "#ff9d9d",
  },
  thumbSwitched: {
    backgroundColor: "red",
  },
  trackSwitched: {
    backgroundColor: "#ff9d9d",
  },
  labelStyle: {
    color: "red",
  },
};

class Toggles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alignment: "left",
      formats: ["bold"],
      Toggled: false,
      carrierAccounts: [],
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleFormat = this.handleFormat.bind(this);
  }
  handleFormat() {}

  componentDidMount() {
    let that = this;
    axios
      .get("http://localhost:3001/carrierAccounts")
      .then(function (response) {
        response.data.forEach((element) => (element.toggled = false));
        that.setState({ carrierAccounts: response });
        // console.log(that.state.carrierAccounts);
      });
  }

  handleToggle(e) {
    let id = e.target.id;
    let ca = this.state.carrierAccounts;
    for (var i = 0; i < ca.data.length; i++) {
      if (ca.data[i].id === id) {
        if (ca.data[i].toggled) {
          ca.data[i].toggled = false;
        } else {
          ca.data[i].toggled = true;
        }
        this.setState({ carrierAccounts: ca });
      }
    }
  }

  render() {
    console.log(this.state.carrierAccounts.data)
    return (
      <div style={styles.block}>
        <h3>Get Rates For:</h3>
        {this.state.carrierAccounts.data && (
          <div>
            {this.state.carrierAccounts.data.map((ca, index) => (
              <div style={{margin: '10px'}}>
              <Toggle
                id={ca.id}
                label={ca.readable + " | "+ ca.description}
                style={styles.toggle}
                labelStyle={styles.toggle}
                className="toggle"
                onToggle={(e) => this.handleToggle(e)}
                data-toggled={ca.toggled}
                toggled={ca.toggled}
              />
              
              <Divider  />
              </div>
            ))}
            
          </div>
        )}
      </div>
    );
  }
}

export default Toggles;

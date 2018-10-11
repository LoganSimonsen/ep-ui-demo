import React from 'react';
import Toggle from 'material-ui/Toggle';

const styles = {
  block: {
    maxWidth: 250,
  },
  toggle: {
    marginBottom: 16,
    color: 'black',
  },
  thumbOff: {
    backgroundColor: '#ffcccc',
  },
  trackOff: {
    backgroundColor: '#ff9d9d',
  },
  thumbSwitched: {
    backgroundColor: 'red',
  },
  trackSwitched: {
    backgroundColor: '#ff9d9d',
  },
  labelStyle: {
    color: 'red',
  },
};


class Toggles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alignment: 'left',
      formats: ['bold'],
      Toggled: true,
      Toggled2: true,
      Toggled3: true
    }
    this.handleToggle = this.handleToggle.bind(this);
    this.handleToggle2 = this.handleToggle2.bind(this);
    this.handleToggle3 = this.handleToggle3.bind(this);
    this.handleFormat = this.handleFormat.bind(this);
  }
  handleFormat() {

  }

  handleToggle(e) {
    if (this.state.Toggled) {
      this.setState({ Toggled: false })
    } else {
      this.setState({ Toggled: true })
    }
  }

  handleToggle2(e) {
    if (this.state.Toggled2) {
      this.setState({ Toggled2: false })
    } else {
      this.setState({ Toggled2: true })
    }
  }

  handleToggle3(e) {
    if (this.state.Toggled3) {
      this.setState({ Toggled3: false })
    } else {
      this.setState({ Toggled3: true })
    }
  }

  render() {
    return (
      <div style={styles.block} >
        <h3>Get Rates For:</h3>
        <Toggle
          id="USPSToggle"
          label="USPS"
          style={styles.toggle}
          labelStyle={styles.toggle}
          onToggle={this.handleToggle}
          dataIsToggled={this.state.Toggled}
          toggled={this.state.Toggled}
        />
        {/* <Toggle
          id="FedExToggle"
          label="FedEx"
          style={styles.toggle}
          labelStyle={styles.toggle}
          onToggle={this.handleToggle2}
          dataIsToggled={this.state.Toggled2}
          toggled={this.state.Toggled2}
        /> */}
        <Toggle
          id="UPSToggle"
          label="UPS"
          style={styles.toggle}
          labelStyle={styles.toggle}
          onToggle={this.handleToggle3}
          dataIsToggled={this.state.Toggled3}
          toggled={this.state.Toggled3}
        />
        {/* <Toggle
      label="Toggled by default"
      defaultToggled={true}
      style={styles.toggle}
      labelStyle={styles.toggle}
    />
    <Toggle
      label="Disabled"
      disabled={true}
      style={styles.toggle}
      labelStyle={styles.toggle}
    />
    <Toggle
      label="Label on the right"
      labelPosition="right"
      style={styles.toggle}
      labelStyle={styles.toggle}
    />
    <Toggle
      label="Styling"
      thumbStyle={styles.thumbOff}
      trackStyle={styles.trackOff}
      thumbSwitchedStyle={styles.thumbSwitched}
      trackSwitchedStyle={styles.trackSwitched}
      labelStyle={styles.labelStyle}
    /> */}
      </div>
    );
  }
};

export default Toggles;
import React, { Component } from "react";
import "./RateErrors.css";

class RateErrors extends React.Component {
  render() {
    let results = this.props.errors.map((d, i) => {
      return (
        <tr>
          <td>{d.carrier}</td>
          <td>{d.carrier_account_id}</td>
          <td>{d.message}</td>
        </tr>
      );
    });
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th colspan="3">Rating Errors</th>
            </tr>
            <tr>
              <th>Carrier</th>
              <th>Carrier Account ID</th>
              <th>Error Message</th>
            </tr>
            {results}
          </tbody>
        </table>
      </div>
    );
  }
}

export default RateErrors;

import React, { Component } from "react";
import "./Dashboard.css";
import Swal from "sweetalert2";
import axios from "axios";
import Button from "@material-ui/core/Button";

var d = new Date();
var date = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      filtered: [],
      newList: [],
      currentList: [],
      input: "",
      mode: "",
      shipmentDetails: "",
      page: 0,
    };
    this.filter = this.filter.bind(this);
    this.refresh = this.refresh.bind(this);
    this.shipmentDetails = this.shipmentDetails.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  filter(e) {
    e.preventDefault();
    // Declare variables
    var filter, table, tr, i, txtValue;
    filter = this.state.input.value.toUpperCase();
    table = document.getElementById("myUL");
    tr = table.getElementsByTagName("tr");
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 1; i < tr.length; i++) {
      txtValue = tr[i].innerText;
      if (txtValue.toUpperCase().includes(filter)) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
  refresh(e) {
    this.setState({ input: document.getElementById("myInput") });
    axios
      .get("http://localhost:3001/getShipments")
      .then((response) => {
        console.log(response.data);
        this.setState({ requestTime: response.headers.date });
        this.setState({ list: response.data });
        this.setState({ mode: response.data[0].mode });
        console.log(this.state.list);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
    d = new Date();
    date = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  }
  shipmentDetails(e) {
    e.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    let results = e.target.value;
    let jsonStuff = JSON.parse(e.target.value);
    console.log(jsonStuff);
    Swal.fire({
      title: "Full Shipment JSON",
      html: `<pre>${results}</pre>`,
      textAlign: "left",
      jsonStuff: results,
      showCancelButton: true,
      confirmButtonText: "Copy JSON",
      cancelButtonText: "Close",
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire("Copied!");
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = jsonStuff;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
      }
    });
  }

  changePage(val) {
    val = this.state.page + val;
    this.setState({ page: val });
    console.log(this.state.page);
  }

  render() {
    return (
      <div className="Dashboard">
        <div className="mode"> {this.state.mode} mode</div>
        <span className="time">Last Updated: {date}</span>

        <i
          className="fa fa-refresh"
          onClick={(event) => this.refresh(event)}
        ></i>
        <section className="section">
          <input
            type="text"
            id="myInput"
            onChange={(e) => this.filter(e)}
            placeholder="Search.."
          />
        </section>
        <div className="section">
          <table className="table" id="myUL">
            <tbody id="myUL">
              <tr className="tr">
                <th className="th">Created</th>
                <th className="th">Shipment ID</th>
                <th className="th">Tracking Code</th>
                <th className="th">Sender Name</th>
                <th className="th">Recipient Name</th>
                <th className="th">Reference</th>
                <th className="th">Label</th>
                <th className="th">Status</th>
              </tr>
              {this.state.list[this.state.page] &&
                this.state.list[this.state.page].map((item) => (
                  <tr key={item}>
                    <td className="td">{item.created_at} </td>
                    <td id={item.id} className="shipID td">
                      <button
                        id="info"
                        className="shipButton text-primary"
                        value={JSON.stringify(item, undefined, 2)}
                        onClick={(e) => this.shipmentDetails(e)}
                      >
                        {item.id}{" "}
                      </button>{" "}
                    </td>
                    <td className="td">
                      <a
                        href={item.tracker.public_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.tracking_code}{" "}
                      </a>
                    </td>
                    <td className="td">{item.from_address.name} </td>
                    <td className="td">{item.to_address.name} </td>
                    <td className="td">{item.reference} </td>
                    <td className="td">
                      <a
                        href={item.postage_label.label_url}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        Label
                      </a>
                    </td>
                    {item.status === "delivered" && (
                      <td className="statusDelivered td">{item.status}</td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="paginationWrap">
          {this.state.page > 0 && (
            <Button
              variant="contained"
              className="paginationButtons"
              onClick={this.changePage.bind(this, -1)}
            >
              Back
            </Button>
          )}
          {this.state.page < this.state.list.length && (
            <Button
              variant="contained"
              color="primary"
              className="paginationButtons"
              value={1}
              onClick={this.changePage.bind(this, 1)}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default Dashboard;

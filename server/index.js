require("dotenv").config();
require("babel-polyfill");
const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const bodyParser = require("body-parser");

const EasyPost = require("@easypost/api");

const apiKey = process.env.testkey; // easypost test environment!
const apiProdKey = process.env.prodkey; //production environment!!

const api = new EasyPost(apiKey);
const apiProd = new EasyPost(apiProdKey);

let carriers = [];
let carrierAccounts = [];
let last_from_addr = {};
let last_to_addr = {};

var searchDate = new Date();
searchDate.setDate(searchDate.getDate() - 15);

//======= Shipment Dashboard Logic Functionality =========

const today = new Date();
const startDay = new Date(today);
startDay.setDate(today.getDate() - 30);

let shipments = [];
let i = 0;
let beforeId = "";
let hasMore = true;

app.use(bodyParser.json());
app.use(cors());
// console.log that your server is up and running

function getAllShipments() {
  api.Shipment.all({
    page_size: 1000,
    before_id: beforeId,
    start_datetime: startDay, // should be less than 30 days.
  }).then((s) => {
    hasMore = s.has_more;
    shipments.push(s);
    beforeId = s[s.length - 1].id;
    if (hasMore) {
      getAllShipments();
    } else {
      console.log("done getting shipments");
    }
    stripOut();
  });
  stripOut();
}

// sigh, below is a hacky function I built to change `id's` in objects to `alias` because the EasyPost Node client library does
// this weird thing with Ojbects that contain an `id` where it will only pass that id over HTTP requests rather than including
// the entire object. Perhaps I will find a way to bypass that in my local version tbd
function stripOut() {
  for (i = 0; i < shipments.length; i++) {
    for (k = 0; k < shipments[i].length; k++) {
      shipments[i][k].to_address.alias = shipments[i][k].to_address.id;
      delete shipments[i][k].to_address.id;
      shipments[i][k].from_address.alias = shipments[i][k].from_address.id;
      delete shipments[i][k].from_address.id;
      shipments[i][k].parcel.alias = shipments[i][k].parcel.id;
      delete shipments[i][k].parcel.id;
      shipments[i][k].tracker.alias = shipments[i][k].tracker.id;
      delete shipments[i][k].tracker.id;
    }
  }
}

getAllShipments();

app.get("/getShipments", (req, res) => {
  res.send(shipments);
});

//====== End of Shipment Dashboard Functionality ===========

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get("/lastFromAddress", (req, res) => {
  res.send(last_from_addr);
});

app.get("/lastToAddress", (req, res) => {
  res.send(last_to_addr);
});

//the server gets your carrier accounts on startup and saves to a variable so that we don't have to make additional API calls if we want this information again.
app.get("/carrierAccounts", (req, res) => {
  res.send(carrierAccounts);
});

//go get some rates from EasyPost
app.post("/rates", (req, res) => {
  let ship = req.body.shipment;
  ship = ship.shipment;
  carriers = ship.carrier_accounts;

  const parcel = new api.Parcel({
    length: ship.length,
    width: ship.width,
    height: ship.height,
    predefined_package: ship.predefinedPackage,
    weight: ship.weight,
  });

  const toAddress = new api.Address({
    name: ship.toName,
    street1: ship.toStreet1,
    street2: ship.toStreet2,
    city: ship.toCity,
    state: ship.toState,
    country: ship.toCountry,
    zip: ship.toZip,
    // verify: 'delivery' // would be used to verify addresses using EasyPost Address validation, not on current road map
    // phone: "" // some carriers require phone number, planning to implement this
  });

  const fromAddress = new api.Address({
    name: ship.fromName,
    street1: ship.fromStreet1,
    street2: ship.fromStreet2,
    city: ship.fromCity,
    state: ship.fromState,
    country: ship.fromCountry,
    zip: ship.fromZip,
    // email: '', // email address is a pretty standard thing to want to include, planning to implement this soon
    // phone: ""
  });

  // console.log(ship); // for troubleshooting purposes
  const shipment = new api.Shipment({
    to_address: toAddress,
    from_address: fromAddress,
    parcel: parcel,
    carrier_accounts: carriers,
    // customs_info: customsInfo, // for international shipments, not on current MVP
    // is_return: true, // for creating return labels, not on current MVP
    options: {
      label_size: ship.labelSize,
      label_format: ship.labelFormat,
    },
  });
  const result = shipment
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch(console.log);
});

//find some recent shipment address data to pre-populate our address form
api.Shipment.all({
  page_size: 2,
  start_datetime: searchDate,
})
  .then((response) => {
    last_from_addr = response[0].from_address;
    last_to_addr = response[0].to_address;
  })
  .catch(console.log);

//retrieve all carriers accounts for the purpose of mapping on the front end
apiProd.CarrierAccount.all()
  .then((response) => {
    carrierAccounts = response;
  })
  .catch(console.log);

app.listen(port, () => console.log(`listening on port ${port}!`));

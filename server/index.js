require('dotenv').config();
require('babel-polyfill');
const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const bodyParser = require('body-parser');

const EasyPost = require('@easypost/api');

const apiKey = process.env.testkey; // easypost test environment!
// const apiKey = process.env.prodkey; //production environment!!

const api = new EasyPost(apiKey);
let carriers = [];

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post("/rates", (req, res) => {
    let ship = req.body.shipment;
    ship = ship.shipment;
    carriers = [];
    if (ship.USPS) {
        carriers.push(process.env.USPSAccount)
    };
    if (ship.UPS) {
        carriers.push(process.env.UPSAccount)
    };
    const parcel = new api.Parcel({
        length: ship.length,
        width: ship.width,
        height: ship.height,
        // predefined_package: "Letter", // oh yes, still need to build out backend functionality for predefined parcels
        weight: ship.width,
    })

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
            label_format: ship.labelFormat
        }
    })
    const result = shipment.save().then((result) => { res.send(result) }).catch(console.log);


});


app.listen(port, () => console.log(`listening on port ${port}!`))

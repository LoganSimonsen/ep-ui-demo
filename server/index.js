require('dotenv').config();
require('babel-polyfill');
const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const bodyParser = require('body-parser');

const EasyPost = require('@easypost/api');

const apiKey = process.env.testkey; //test!
// const apiKey = process.env.prodkey; //prod!!

const api = new EasyPost(apiKey);

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post("/rates", (req, res) => {
    // console.log(req.body);
    // res.send(req.body.shipment.shipment.toName);
    let ship = req.body.shipment;
    ship = ship.shipment;

    const parcel = new api.Parcel({
        length: ship.length,
        width: ship.width,
        height: ship.height,
        // predefined_package: "Letter",
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
        // verify: 'delivery'
        // phone: "469-123-4567"
    });

    const fromAddress = new api.Address({
        name: ship.fromName,
        street1: ship.fromStreet1,
        street2: ship.fromStreet2,
        city: ship.fromCity,
        state: ship.fromState,
        country: ship.fromCountry,
        zip: ship.fromZip,
        // email: 'logan.simonsen@easypost.com',
        // phone: "469-123-4567"
    });
    console.log(toAddress, fromAddress, parcel);
    const shipment = new api.Shipment({
        to_address: toAddress,
        from_address: fromAddress,
        parcel: parcel,
        // carrier_accounts: ["ca_c895919c23164f9eb125173714c2ba69"],
        // customs_info: customsInfo,
        // is_return: true,
        // options: {
        //   ups_return_service: "electronic",

        //   bill_third_party_account: "F12345"
        // "alcohol": "1",
        // "print_custom_2_code": "PO",
        //   "label_format": "PDF",
        //   label_size: "4x4"
        // "receiver_liquor_license": "false",
        // "label_date": "2018-09-17T00:00:00.000-0500",
        // "delivery_confirmation": "ADULT_SIGNATURE",
        // "print_custom_1": "custom1code",
        // "print_custom_code_1": "PO",
        // "print_custom_2": "custom2text",
        // "print_custom_3": "custom3text",
        // "invoice_number": "INVOICE12345"
        // "print_custom_3_code": "DP"
        // payment: { type: "COLLECT" }
        // }
    })
    const result = shipment.save().then((result) => { res.send(result) }).catch(console.log);


});

// app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`listening on port ${port}!`))

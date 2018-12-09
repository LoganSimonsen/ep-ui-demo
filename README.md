This is a React App with Material-ui forms designed to collect data needed for getting shipping rates. It uses express server and utilizes the easypost API service to get real time shipping rates for supported carriers (USPS and UPS etc). 


## Running the app:

```
fork and clone the repository
npm install
npm start
```

** Next Update: build out functionality for carrier toggles. Need to pass in carrier account ID's to limit rates to only those the user wishes to see. Will need to use enviromental variables to obscur carrier ID's from users.

In order to use this application you will need an EasyPost Test or Production API key. Register at easypost.com

You will also need to establish carrier accounts and register them on the easypost dashboard at which point you should be given carrier account id's. EasyPost has integrations with multiple shipping carriers, so it is possible to add more carriers and modify the code to support them appropriately.

## Running the Node Server:
From the main folder
```
node server
```

## .env file template:
  ```
  testkey=(your easypost test API key)
  prodkey=(your easypost production key)
  USPSAccount=(your USPS carrier account id)
  UPSAccount=(your UPS carrier account id)
  ```
  Remember with .env files no spaces or semi-colons are needed, each variable is on a new line.
  
  ## Getting Started With EasyPost
  
* Create a Free EasyPost Account: https://www.easypost.com/signup
* USPS Rate Chart: https://www.easypost.com/usps-rate-chart
* Getting Started with EasyPost: https://www.easypost.com/docs/api
* Link to client libraries: https://github.com/easypost

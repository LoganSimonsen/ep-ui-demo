This is a React App with Material-ui forms designed to collect data needed for getting shipping rates. It uses express server and utilizes the easypost API service to get real time shipping rates for supported carriers (USPS and UPS etc). 

** Next Update: build out functionality for carrier toggles. Need to pass in carrier account ID's to limit rates to only those the user wishes to see. Will need to use enviromental variables to obscur carrier ID's from users.

In order to use this application you will need an EasyPost Test or Production API key. Register at easypost.com

You will also need to establish carrier accounts and register them on the easypost dashboard at which point you should be given carrier account id's. EasyPost has integrations with multiple shipping carriers, so it is possible to add more carriers and modify the code to support them appropriately.

.env file template:

  testkey=(your easypost test API key)
  prodkey=(your easypost production key)
  USPSAccount=(your USPS carrier account id)
  UPSAccount=(your UPS carrier account id)

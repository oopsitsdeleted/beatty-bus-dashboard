# Beatty bus dashboard

![image of the dashboard](https://raw.githubusercontent.com/oopsitsdeleted/beatty-bus-dashboard/refs/heads/assets/Screenshot%202026-01-19%20113104.png)
## Demo
A demo is available at https://beattybus.lawnserver.com/

## Prerequisites

 1. LTA DataMall API key, just fill up the [form](https://datamall.lta.gov.sg/content/datamall/en/request-for-api.html) and they will send you an email with the key
 2. Node.JS installed on your system. This is required for the backend

## Setup
Clone the repo into your system

    git clone https://github.com/oopsitsdeleted/beatty-bus-dashboard.git

cd into the directory

    cd beatty-bus-dashboard
Edit the server.js file with any text editor, find the account key const and replace 'YOUR API KEY HERE' with your api key

    const  ACCOUNT_KEY  =  'YOUR API KEY HERE';

Install the required modules 

    npm install express cors
Execute server.js

    node server.js
The dashboard is now accessible in your browser. 

If you are accessing it locally:

    http://localhost:5000
If you are accessing it from another device that is on the same network as your server

    http://192.168.0.XX:5000

I recommended to scale up the site to make read by using Ctrl +
## Tips
If you are running the server on a Linux machine, you can make it into a systemctl service. This ensures that the server is always running even after a reboot

Make a service file `/etc/systemd/system/busdashboard.service`

use this template in said file (edit according to your own setup)

    [Unit]
    Description=Beatty bus dashboard Node.js Server
    After=network.target
    
    [Service]
    # The user and group that will run the service
    User= your user # edit this
    Group= your group # this one also
    
    WorkingDirectory=/dir/to/bus/dashboard # edit this
    
    ExecStart=/usr/bin/node /dir/to/busdashboard/to/server.js # also this one
    
    Restart=always
    RestartSec=5
    
    StandardOutput=syslog
    StandardError=syslog
    SyslogIdentifier=beattybus




###### Contains information from the Bus Arrival (v3) and Bus Routes datasets which is made available under the terms of the Singapore Open Data Licence version 1.0 https://data.gov.sg/open-data-licence


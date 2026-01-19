# Beatty bus dashboard

![enter image description here](https://private-user-images.githubusercontent.com/64972493/537372782-2dc5079e-1da8-4aac-add5-923d3beb09ba.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Njg3OTM3NzgsIm5iZiI6MTc2ODc5MzQ3OCwicGF0aCI6Ii82NDk3MjQ5My81MzczNzI3ODItMmRjNTA3OWUtMWRhOC00YWFjLWFkZDUtOTIzZDNiZWIwOWJhLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNjAxMTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjYwMTE5VDAzMzExOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTM1NjcyZDNlYzA0ZDIxZWZkZThhOGE5YzhjNmNhZmZhOWM0ZDdjYThiMjBkNWQ2ZTUwMGY3MWY2ZGIxYjEzOTkmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.Uv95jw2fkU0quApjZSAV6e-t2qQgTj8a5TfX1gzNpcs)
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

    node install express cors
Execute server.js

    node server.js
The dashboard is now accessible in your browser. 

If you are accessing it locally:

    http://localhost:5000
If you are accessing it from another device that is on the same network as your server

    http://192.168.0.XX:5000
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
    
    # The directory where your app lives
    WorkingDirectory=/dir/to/bus/dashboard # edit this
    
    ExecStart=/usr/bin/node /dir/to/busdashboard/to/server.js # also this one
    
    Restart=always
    RestartSec=5
    
    StandardOutput=syslog
    StandardError=syslog
    SyslogIdentifier=beattybus




###### Contains information from the Bus Arrival (v3) and Bus Routes datasets which is made available under the terms of the Singapore Open Data Licence version 1.0 https://data.gov.sg/open-data-licence


# Stepful Scheduler

This app contains both a server and a client implementation for the Stepful Scheduler.

# Getting Started

# Prerequisites
Before you start, make sure you have Node.js installed on your system. You can download and install Node.js from the official Node.js website.

# Running the server
Navigate to the `/server` directory and run `npm install`

To start the server, run `node index.js` or `nodemon index.js` to enable watch mode. 

The server should be enabled on port 5001.

# Running the client 
Navigate to `/client`

Run `npm install`

Run `npm run dev` to start the server on port 3000.

# API & Database

The API code can be found in the `/server` folder in `index.js`.

The `database.sql` file in the `/server` folder will create a database when executed in a Postgres environment.

The `seed.db` file in `/server` will create some users in the database.
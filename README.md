UTSC Hub is a web app for UTSC students to connect and buy/sell items.


## Development

### Requirements

- NodeJS (16.17.0 LTS)

### Setup

Clone the project with Git.

If developing for the server, run `npm install` in the `server` directory. 

If developing for the client, run `npm install` in the `client` directory.

### Running web client server locally

Switch to the `client` directory. Run `npm start` to start the web client server. The local server can be connected to by visiting `localhost:3000` in your browser.

### Running backend API server locally

Switch to the `server` directory. Run `npm run server` to start the backend API server. Requests to the backend server are sent to `http://localhost:8000`. Ex: `http://localhost:8000/api/items`

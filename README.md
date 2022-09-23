UTSC Hub is a web app for UTSC students to connect and buy/sell items.


## Development



### Requirements

- NodeJS (16.17.0 LTS)

### Setup

Clone the project with Git.

If developing for the server, run `npm install` in the `server` directory. 

If developing for the client, run `yarn` in the `client` directory.


### Running web client server locally

Switch to the `client` directory. Run `yarn start` to start the web client server. The local server can be connected to by visiting `localhost:3000` in your browser.

### Running backend API server locally

Switch to the `server` directory. Run `npm run server` to start the backend API server. Requests to the backend server are sent to `http://localhost:8000`. Ex: `http://localhost:8000/api/items`

How it should look like after running `npm run server`:

![image](https://user-images.githubusercontent.com/69706702/192059643-aab9938c-783b-497e-b19f-4291653a4cec.png)

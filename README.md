
# Single page applications using React.js and the OpenCms JSON API

## About

**Demo 1**. Demonstrates basic content access with the [folder handler]() and the [content handler]() of the JSON API.\
**Demo 2**. Demonstrates how to access and display dynamic content lists using the [list handler]() of the JSON API.\
**Demo 3**. Demonstrates content formatting provided by the [page handler]() of the JSON API.\

## Preparations

Install [Docker](https://docs.docker.com/get-docker/).\
Install [Docker Compose](https://docs.docker.com/compose/install/).\
Install [Node.js](https://nodejs.org/en/download/).\

## How to use

### `docker-compose up -d`

Builds and runs a pre-configured OpenCms demo backend.\
Open [http://localhost/mercury-json/](http://localhost) to view it in the browser.\
Open [http://localhost/workplace/](http://localhost) and login as user Admin.\

### `npm install`

Installs the React.js app.\
You need to run this once only.

### `npm start`

Runs the React.js app in development mode.\
Open [http://localhost:3000](http://localhost:3001) to view it in the browser.

## Further Reading

All demos make use of contents provided bystandard template of OpenCms called [Mercury]().\
More information about the JSON API is available in the [OpenCms JSON API documentation]().

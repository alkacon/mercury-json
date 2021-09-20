

# Single page applications using React.js and the OpenCms JSON API

## About

Demo 1 showcases basic content access with the [JSON folder handler]() and the [JSON content handler]().

Demo 2 showcases how to access and display dynamic content lists using the [JSON list handler]().

Demo 3 showcases content formatting provided by the [page handler]() of the JSON API.

## Preparations

Install [Docker](https://docs.docker.com/get-docker/).

Install [Docker Compose](https://docs.docker.com/compose/install/).

Install [Node.js](https://nodejs.org/en/download/).

## How to use

### `docker-compose up -d`

Builds and runs a pre-configured OpenCms demo backend.

Open [http://localhost/mercury-json/](http://localhost) to view it in the browser.

Open [http://localhost/workplace/](http://localhost) to login as user Admin.

### `cd demo1 && npm install`

Installs a React.js app.

You need to run this once per demo application only.

### `cd demo1 && npm start`

Runs a React.js app in development mode.

Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

## Further Reading

All demos make use of contents provided by the standard template of OpenCms called [Mercury]().

More information about the JSON API is available in the [OpenCms JSON API documentation]().

More information about the OpenCms demo backend is available in the [GitHub repository]().

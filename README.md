

# Demo React.js applications using the OpenCms JSON API

## About

Demo 1 showcases basic content access with the [JSON folder handler](https://documentation.opencms.org/opencms-documentation/more-opencms-features/headless-json-api/#the-folder-handler) and the [JSON content handler](https://documentation.opencms.org/opencms-documentation/more-opencms-features/headless-json-api/#the-content-handler).

Demo 2 showcases how to access and display dynamic content lists using the [JSON list handler](https://documentation.opencms.org/opencms-documentation/more-opencms-features/headless-json-api/#the-list-handler).

Demo 3 showcases content formatting provided by the [JSON page handler](https://documentation.opencms.org/opencms-documentation/more-opencms-features/headless-json-api/#the-page-handler).

## Preparations

Install [Docker](https://docs.docker.com/get-docker/).

Install [Docker Compose](https://docs.docker.com/compose/install/).

Install [Node.js](https://nodejs.org/en/download/).

## How to use

### `docker-compose up -d`

Builds and runs a pre-configured OpenCms demo backend.

Run `docker-compose logs -f` to see the installation progress. Installation will take a while at the first time.

Open [http://localhost/mercury-json/](http://localhost) to view it in the browser.

Open [http://localhost/workplace/](http://localhost) to login as user Admin.

### `cd demo1 && npm install`

Installs a React.js app.

Run `cd demo2 && npm install` and `cd demo3 && npm install` accordingly.

You need to run this once per demo application only.

### `cd demo1 && npm start`

Runs a React.js app in development mode.

Run `cd demo2 && npm start` and `cd demo3 && npm start` accordingly.

Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

`demo2` and `demo3` run on ports `3002` and `3003` accordingly.

## Further Reading

All demos make use of contents provided by the standard template of OpenCms called [Mercury](https://github.com/alkacon/mercury-template).

More information about the JSON API is available in the [OpenCms JSON API documentation](https://documentation.opencms.org/opencms-documentation/more-opencms-features/headless-json-api/).

More information about the OpenCms demo backend is available in the [GitHub repository](https://github.com/alkacon/opencms-docker).

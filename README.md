# Isomorphic React App

##### Important, this is work in progress

Example app for react app with server side rendering and routing

To run, simply `npm install` and `npm run`

Apps and routes are created in `/apps/[appName]`

`routes.js` is mandatory. The server will parse it and attach routes to the express app

`client.js` runs when the bundle arrives to the browser

All apps get their own bundled served as `/dist/[appName].bundle.js`

Any code shared between apps are served by `/dist/commons.js`

Of course hot module reload and all that fancy things are enabled

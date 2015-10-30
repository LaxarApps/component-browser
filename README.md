# component-browser

> browse docs or changelogs of hierarchically organized components

*Work-in-progress:* This is an unfinished project.


## Installation

```console
> git clone https://github.com/LaxarApps/component-browser
> cd component-browser
> cat '[]' > var/proxies.json
> npm install
> npm start
```

Access the application at [localhost:8008](http://localhost:8008).

To change the component listing, for now you will need to modify (the example data)[application/example/laxar-components.json].

Now you can add Proxy-configuration for [grunt-connect-proxy](https://github.com/drewzboto/grunt-connect-proxy) to the file [var/proxies.json](var/proxies.json).
At minimum, you will need to tell it where to find the JSON components map, for example:

```json
[
   {
      "context": "/component-map",
      "host": "my-components-service",
      "port": 80,
      "rewrite": { "^/component-map": "/api/component-map.json" }
   }
]
```

This file is also processed by the client-side applications to rewrite URLs, so that you can reference cross-origin resources from your component listing.


## Start

```console
> npm run optimize
> npm start
```

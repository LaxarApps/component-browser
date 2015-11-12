# component-browser

> browse docs or changelogs of hierarchically organized components


## Installation

```console
> git clone https://github.com/LaxarApps/component-browser
> cd component-browser
> mkdir var && cat '[]' > var/proxies.json
> npm install
```


Then you can add proxy-configuration for [grunt-connect-proxy](https://github.com/drewzboto/grunt-connect-proxy) to the file [var/proxies.json](var/proxies.json).
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

This file is also processed by the client-side applications to *rewrite* component URLs.
This allows you to reference cross-origin resources from within your component listing.

**Note:** Make sure to `npm run optimize` whenever you have changed the proxy-configuration.


## Start

```console
> npm start
```

Now you may access the application at [localhost:8008](http://localhost:8008/).

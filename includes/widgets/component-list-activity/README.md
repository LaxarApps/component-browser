# component-list-activity

> Provides a grouped list of software components, with references to their documentation and changelogs


## Features

### 1. Fetch a list of software components (*components*)

*R1.1* The activity MUST allow to configure a URL from which to fetch an artifact listing in JSON format.

*R1.2* The activity MUST allow to configure a resource topic under which to publish the artifact listing upon receipt.

*R1.3* When instantiated, the activity MUST try to fetch the configured artifacts listing using HTTP GET.

*R1.4* If an artifact listing was received, the activity MUST publish it under the configured resource using a `didReplace` event.
If proxy rules were configured, URLs MUST be rewritten prior to publishing the resource (see 2.).
 
*R1.5* If the artifact listing could not be received (e.g. due to an HTTP 4xx or 5xx response), or failed to parse as JSON, the activity MUST publish a `didEncounterError` event.


### 2. Rewrite URLs based on configuration (*rewrite*)

*R2.1* The activity MUST allow for configuration of a list of proxy rules (as a string identifier).

*R2.2* If a list of proxy rules was configured, the activity MUST read the corresponding rules from the application configuration, using the configuration path `widgets.component-list-activity.proxies.{rules}`.

*R2.3* The following rule-set format must be supported (JavaScript):

```javascript
[
   { context: '/some-path', https: true, host: 'example.com', port: 8080 },
   // ...
]
```

This is a subset of the [grunt-connect-proxy](https://github.com/drewzboto/grunt-connect-proxy) configuration.
If missing, the port MUST default to `80`.

*R2.4* If proxy rules were configured, the activity MUST rewrite the following fields before publishing the resource:

- `origins.*.groups.*.components.*.url-*`

*R2.5* To rewrite a field, each rule must be examined in turn.
If the field starts with a `${schema}${host}${port}` sequence matching the current rule, the activity MUST replace this prefix with `${context}/`.  

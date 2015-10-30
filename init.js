/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license
 */
require( [
   'laxar',
   'laxar-react-adapter',
   'laxar-application-dependencies',
   'json!laxar-application/var/flows/main/resources.json',
   'json!laxar-application/var/proxies.json'
], function( ax, axReactAdapter, applicationDependencies, resources, proxies ) {
   'use strict';

   // prepare file listings for efficient asset loading
   // listing contents are determined by the Gruntfile.js
   window.laxar.fileListings = {
      application: resources,
      bower_components: resources,
      includes: resources
   };

   window.laxar.widgets = window.laxar.widgets || {};
   window.laxar.widgets[ 'component-list-activity' ] = { proxies: { 'default': proxies } };

   ax.bootstrap( applicationDependencies, [ axReactAdapter ] );
} );

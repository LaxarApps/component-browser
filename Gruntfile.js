/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license
 */
/*global module,__dirname,__filename */
module.exports = function( grunt ) {
   'use strict';

   var serverPort = 8008;
   var testPort = 1000 + serverPort;
   var liveReloadPort = 30000 + serverPort;

   grunt.initConfig( {
      pkg: grunt.file.readJSON( 'package.json' ),

      'laxar-configure': {
         options: {
            flows: [
               { target: 'main', src: 'application/flow/flow.json' }
            ],
            ports: {
               develop: serverPort,
               test: testPort,
               livereload: liveReloadPort
            },
            userTasks: {
               'build-flow': [ 'laxar-compass-flow' ]
            }
         }
      },
      'connect': {
         'laxar-develop': {
            options: {
               middleware: function( connect, options, defaultMiddleware ) {
                  var proxy =
                     require( 'grunt-connect-proxy/lib/utils' ).proxyRequest;
                  return [ proxy ].concat( defaultMiddleware );
               }
            },
            'proxies': [
               {
                  // http://localhost:8008/gh/LaxarJS/laxar/master/CHANGELOG.md
                  // -> https://raw.githubusercontent.com:443/LaxarJS/laxar/master/CHANGELOG.md
                  context: '/gh',
                  host: 'raw.githubusercontent.com',
                  headers: {
                     host: 'raw.githubusercontent.com'
                  },
                  hostRewrite: 'localhost',
                  // port: 443,
                  changeOrigin: true,
                  rewrite: { '^/gh': '' },
                  https: true,
                  secure: true,
                  xforward: false
               },
               {
                  context: '/components',
                  rewrite: { '^/components': 'application/example/laxar-components.json' },
                  host: 'localhost',
                  port: 80,
                  https: false,
                  xforward: true
               }
            ]
         }
      },
      'laxar-compass': {
         options: {
            compass: './tools/bin/compass'
         }
      },
      babel: {
         options: {
            sourceMap: true,
            modules: 'amd'
         },
         widgets: {
            files: [{
               expand: true,
               cwd: 'includes/widgets/',
               src: [ '*/*.jsx' ],
               dest: 'includes/widgets/',
               ext: '.js'
            }]
         }
      },
      watch: {
         jsx: {
            files: [ 'includes/widgets/*/*.jsx' ],
            tasks: [ 'babel:widgets' ]
         }
      }

   } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   grunt.loadNpmTasks( 'grunt-laxar' );
   grunt.loadNpmTasks( 'grunt-laxar-compass' );
   grunt.loadNpmTasks( 'grunt-connect-proxy' );
   grunt.loadNpmTasks( 'grunt-babel' );

   // basic aliases
   grunt.registerTask( 'test', [ 'laxar-test' ] );
   grunt.registerTask( 'build', [ 'babel', 'laxar-build' ] );
   grunt.registerTask( 'dist', [ 'laxar-dist' ] );
   grunt.registerTask( 'develop', [
      'babel', 'configureProxies:laxar-develop', 'laxar-develop'
   ] );
   grunt.registerTask( 'info', [ 'laxar-info' ] );

   // additional (possibly) more intuitive aliases
   grunt.registerTask( 'optimize', [ 'laxar-dist' ] );
   grunt.registerTask( 'start', [ 'develop' ] );

   grunt.registerTask( 'default', [ 'build', 'test' ] );
};

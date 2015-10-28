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
            }
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
   grunt.loadNpmTasks( 'grunt-babel' );

   // basic aliases
   grunt.registerTask( 'test', [ 'laxar-test' ] );
   grunt.registerTask( 'build', [ 'babel', 'laxar-build' ] );
   grunt.registerTask( 'dist', [ 'laxar-dist' ] );
   grunt.registerTask( 'develop', [ 'babel', 'laxar-develop' ] );
   grunt.registerTask( 'info', [ 'laxar-info' ] );

   // additional (possibly) more intuitive aliases
   grunt.registerTask( 'optimize', [ 'laxar-dist' ] );
   grunt.registerTask( 'start', [ 'babel', 'laxar-develop' ] );
   grunt.registerTask( 'start-no-watch', [ 'laxar-develop-no-watch' ] );

   grunt.registerTask( 'default', [ 'build', 'test' ] );
};

/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license
 */
define( [], function() {
   'use strict';

   return {
      name: 'component-browser-widget',
      injections: [ 'axContext' ],
      create: function( context ) {

         /* :) */

         return {
            renderTo: function( element ) {
               // `element` is the instantiated template of the widget, already attached to the page DOM
            }
         };
      }
   };
} );

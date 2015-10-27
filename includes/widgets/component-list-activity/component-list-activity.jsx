/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license
 */
export default {
   name: 'component-list-activity',
   injections: [ 'axEventBus', 'axFeatures' ],
   create: function( eventBus, features ) {
      const { url, resource } = features.components;
      Promise.all( [
         fetch( url ).then( response => response.text() ).then( JSON.parse ),
         new Promise( resolve => { eventBus.subscribe( 'beginLifecycleRequest', resolve ); } )
      ] ).then( ([ data ]) => {
         eventBus.publish( `didReplace.${resource}`, { resource, data } );
      } );
   }
};

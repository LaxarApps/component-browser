import React from 'react';

/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license
 */
export default {
   name: 'component-browser-widget',
   injections: [ 'axEventBus', 'axFeatures', 'axReactRender' ],
   create: function( eventBus, features, reactRender ) {
      let origins = [];

      const { resource } = features.components;
      eventBus.subscribe( `didReplace.${resource}`, ({ data }) => {
         origins = data.origins;
         render();
      } );

      function render() {
         const componentsDom = ( components ) =>
            <ul className='component-browser-components'>
               { components.map( component =>
                  <li key={component.name} title={component.description}>
                     { component.name }
                  </li>
               ) }
            </ul>;

         const groupsDom = ( groups ) =>
            <ul className='component-browser-groups'>
               { groups.map( group =>
                  <li key={group.name} title={group.description}>
                     { group.name }
                     { componentsDom( group.components ) }
                  </li>
               ) }
            </ul>;

         const originsDom = () =>
            <ul className='component-browser-origins'>
               { origins.map( origin =>
                  <li key={origin.name} title={origin.description}>
                     { origin.name }
                     { groupsDom( origin.groups ) }
                  </li>
               ) }
            </ul>;


         reactRender( originsDom() );
      }

      return {
         onDomAvailable: render
      };
   }
};

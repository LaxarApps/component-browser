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
                  <li key={component.name}>
                     <a href={ component[ 'url-readme' ] } title={ component.description }>{ component.name }</a>
                  </li>
               ) }
            </ul>;

         const groupsDom = ( groups ) =>
            <ul className='component-browser-groups'>
               { groups.map( group =>
                  <li key={group.name} title={group.description}>
                     <h4>{ group.name }</h4>
                     { componentsDom( group.components ) }
                  </li>
               ) }
            </ul>;

         const originsDom = () =>
            <div className='component-browser-origin-container'>{ origins.map( origin =>
               <ul className='component-browser-origins'>
                     <li key={origin.name} title={origin.description}>
                        <h3>{ origin.name }</h3>
                        { groupsDom( origin.groups ) }
                     </li>
               </ul>
            ) }</div>

         reactRender( originsDom() );
      }

      return {
         onDomAvailable: render
      };
   }
};

import React from 'react';

/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license
 */
export default {
   name: 'component-browser-widget',
   injections: [ 'axEventBus', 'axFeatures', 'axReactRender' ],
   create: function( eventBus, features, reactRender ) {

      const { components: { resource }, details } = features;
      let origins = [];

      eventBus.subscribe( `didReplace.${resource}`, ({ data }) => {
         origins = data.origins;
         render();
      } );

      return {
         onDomAvailable: render
      };

      //////////////////////////////////////////////////////////////////////////

      function render() {
         const componentsDom = ( components ) =>
            <ul className='component-browser-components'>
               { components.map( component =>
                  <li key={component.name}>
                     <a href={ component[ 'url-readme' ] }
                        title={ component.description }
                        onClick={ event => showDetails( event, component ) }>
                     { component.name }
                     </a>
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
            <div className='component-browser-origin-container'>{
               origins.map( origin =>
                  <ul key={origin.name} className='component-browser-origins'>
                     <li title={origin.description}>
                        <h3>{ origin.name }</h3>
                        { groupsDom( origin.groups ) }
                     </li>
                  </ul>
               )
            }</div>;

         reactRender( originsDom() );
      }

      //////////////////////////////////////////////////////////////////////////

      function showDetails( event, component ) {
        if( event.ctrlKey ) {
          return;
        }
        const { resource, action, relation } = details;
        const data = {
          _links: { markdown: { href: component[ 'url-' + relation ] } }
        };

        event.preventDefault();
        eventBus.publish( `didReplace.${resource}`, { resource, data } )
          .then( () => eventBus.publish( `takeActionRequest.${action}`, { action } ) );
      }

   }
};

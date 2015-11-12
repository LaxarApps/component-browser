const name = 'component-list-activity';
/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license
 */
export default {
   name,
   injections: [ 'axEventBus', 'axFeatures', 'axConfiguration' ],
   create: function( eventBus, features, configuration ) {
      const { url, resource } = features.components;
      Promise.all( [
         fetch( url ).then( response => response.text() ).then( JSON.parse ).then( rewrite ),
         new Promise( resolve => { eventBus.subscribe( 'beginLifecycleRequest', resolve ); } )
      ] ).then( ([ data ]) => {
         eventBus.publish( `didReplace.${resource}`, { resource, data } );
      } );

      function rewrite( componentMap ) {
         const ruleKey = `widgets.${name}.proxies.${features.rewrite.rules}`;
         const rules = configuration.get( ruleKey, [] );

         componentMap.origins.forEach( origin => {
            origin.groups.forEach( group => {
               group.components.forEach( component => {
                  Object.keys( component ).forEach( key => {
                     if( key.indexOf( 'url-' ) === 0 ) {
                        component[ key ] = rules.reduce( applyRule, component[ key ] );
                     }
                  } );
               } );
            } );
         } );

         function applyRule( url, rule ) {
            const { protocol, hostname, port, pathname, search, fragment } = parseUrl( url );
            if( protocol !== (rule.https ? 'https:' : 'http:') ) {
               return url;
            }
            if( hostname !== rule.host ) {
               return url;
            }
            if( (port || (protocol === 'https:' ? 443 : 80)) !==
                (rule.port || (rule.https ? 443 : 80)) ) {
               return url;
            }
            const path = reverseRewrite( rule.reverseRewrite || {}, pathname );
            return `${ path }${ search || '' }${ fragment || '' }`;
         }

         return componentMap;
      }
   }
};

function reverseRewrite( rules, path ) {
   return Object.keys( rules )
      .reduce( ( path, pattern ) => {
         return path.replace( new RegExp( pattern ), rules[ pattern ] );
      }, path );
}

function parseUrl( url ) {
   const a = document.createElement( 'a' );
   a.href = url;
   return a;
}

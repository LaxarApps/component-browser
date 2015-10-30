define(['exports', 'module', 'react'], function (exports, module, _react) {
   'use strict';

   function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

   var _React = _interopRequireDefault(_react);

   /**
    * Copyright 2015 aixigo AG
    * Released under the MIT license
    */
   module.exports = {
      name: 'component-browser-widget',
      injections: ['axEventBus', 'axFeatures', 'axReactRender'],
      create: function create(eventBus, features, reactRender) {
         var resource = features.components.resource;
         var details = features.details;

         var origins = [];

         eventBus.subscribe('didReplace.' + resource, function (_ref) {
            var data = _ref.data;

            origins = data.origins;
            render();
         });

         return {
            onDomAvailable: render
         };

         //////////////////////////////////////////////////////////////////////////

         function render() {
            var componentsDom = function componentsDom(components) {
               return _React['default'].createElement(
                  'ul',
                  { className: 'component-browser-components' },
                  components.map(function (component) {
                     return _React['default'].createElement(
                        'li',
                        { key: component.name },
                        _React['default'].createElement(
                           'a',
                           { href: component['url-readme'],
                              title: component.description,
                              onClick: function (event) {
                                 return showDetails(event, component);
                              } },
                           component.name
                        )
                     );
                  })
               );
            };

            var groupsDom = function groupsDom(groups) {
               return _React['default'].createElement(
                  'ul',
                  { className: 'component-browser-groups' },
                  groups.map(function (group) {
                     return _React['default'].createElement(
                        'li',
                        { key: group.name, title: group.description },
                        _React['default'].createElement(
                           'h4',
                           null,
                           group.name
                        ),
                        componentsDom(group.components)
                     );
                  })
               );
            };

            var originsDom = function originsDom() {
               return _React['default'].createElement(
                  'div',
                  { className: 'component-browser-origin-container' },
                  origins.map(function (origin) {
                     return _React['default'].createElement(
                        'ul',
                        { key: origin.name, className: 'component-browser-origins' },
                        _React['default'].createElement(
                           'li',
                           { title: origin.description },
                           _React['default'].createElement(
                              'h3',
                              null,
                              origin.name
                           ),
                           groupsDom(origin.groups)
                        )
                     );
                  })
               );
            };

            reactRender(originsDom());
         }

         //////////////////////////////////////////////////////////////////////////

         function showDetails(event, component) {
            if (event.ctrlKey) {
               return;
            }
            var resource = details.resource;
            var action = details.action;
            var relation = details.relation;

            var data = {
               _links: { markdown: { href: component['url-' + relation] } }
            };

            event.preventDefault();
            eventBus.publish('didReplace.' + resource, { resource: resource, data: data }).then(function () {
               return eventBus.publish('takeActionRequest.' + action, { action: action });
            });
         }
      }
   };
});
//# sourceMappingURL=component-browser-widget.js.map

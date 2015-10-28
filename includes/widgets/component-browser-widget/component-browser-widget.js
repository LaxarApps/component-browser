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
         var origins = [];

         var resource = features.components.resource;

         eventBus.subscribe('didReplace.' + resource, function (_ref) {
            var data = _ref.data;

            origins = data.origins;
            render();
         });

         function render() {
            var componentsDom = function componentsDom(components) {
               return _React['default'].createElement(
                  'ul',
                  { className: 'component-browser-components' },
                  components.map(function (component) {
                     return _React['default'].createElement(
                        'li',
                        { key: component.name, title: component.description },
                        component.name
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
                        group.name,
                        componentsDom(group.components)
                     );
                  })
               );
            };

            var originsDom = function originsDom() {
               return _React['default'].createElement(
                  'ul',
                  { className: 'component-browser-origins' },
                  origins.map(function (origin) {
                     return _React['default'].createElement(
                        'li',
                        { key: origin.name, title: origin.description },
                        origin.name,
                        groupsDom(origin.groups)
                     );
                  })
               );
            };

            reactRender(originsDom());
         }

         return {
            onDomAvailable: render
         };
      }
   };
});
//# sourceMappingURL=component-browser-widget.js.map

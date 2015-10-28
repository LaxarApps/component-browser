define(['exports', 'module'], function (exports, module) {
   /**
    * Copyright 2015 aixigo AG
    * Released under the MIT license
    */
   'use strict';

   var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

   module.exports = {
      name: 'component-list-activity',
      injections: ['axEventBus', 'axFeatures'],
      create: function create(eventBus, features) {
         var _features$components = features.components;
         var url = _features$components.url;
         var resource = _features$components.resource;

         Promise.all([fetch(url).then(function (response) {
            return response.text();
         }).then(JSON.parse), new Promise(function (resolve) {
            eventBus.subscribe('beginLifecycleRequest', resolve);
         })]).then(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 1);

            var data = _ref2[0];

            eventBus.publish('didReplace.' + resource, { resource: resource, data: data });
         });
      }
   };
});
//# sourceMappingURL=component-list-activity.js.map

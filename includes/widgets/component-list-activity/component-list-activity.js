define(['exports', 'module'], function (exports, module) {
   'use strict';

   var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

   var name = 'component-list-activity';
   /**
    * Copyright 2015 aixigo AG
    * Released under the MIT license
    */
   module.exports = {
      name: name,
      injections: ['axEventBus', 'axFeatures', 'axConfiguration'],
      create: function create(eventBus, features, configuration) {
         var _features$components = features.components;
         var url = _features$components.url;
         var resource = _features$components.resource;

         Promise.all([fetch(url).then(function (response) {
            return response.text();
         }).then(JSON.parse).then(rewrite), new Promise(function (resolve) {
            eventBus.subscribe('beginLifecycleRequest', resolve);
         })]).then(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 1);

            var data = _ref2[0];

            eventBus.publish('didReplace.' + resource, { resource: resource, data: data });
         });

         function rewrite(componentMap) {
            var ruleKey = 'widgets.' + name + '.proxies.' + features.rewrite.rules;
            var rules = configuration.get(ruleKey, []);

            componentMap.origins.forEach(function (origin) {
               origin.groups.forEach(function (group) {
                  group.components.forEach(function (component) {
                     Object.keys(component).forEach(function (key) {
                        if (key.indexOf('url-') === 0) {
                           component[key] = rules.reduce(applyRule, component[key]);
                        }
                     });
                  });
               });
            });

            function applyRule(url, rule) {
               var _parseUrl = parseUrl(url);

               var protocol = _parseUrl.protocol;
               var hostname = _parseUrl.hostname;
               var port = _parseUrl.port;
               var pathname = _parseUrl.pathname;
               var search = _parseUrl.search;
               var fragment = _parseUrl.fragment;

               if (protocol !== (rule.https ? 'https:' : 'http:')) {
                  return url;
               }
               if (hostname !== rule.host) {
                  return url;
               }
               if ((port || (protocol === 'https:' ? 443 : 80)) !== (rule.port || (rule.https ? 443 : 80))) {
                  return url;
               }
               var path = reverseRewrite(rule.reverseRewrite || {}, pathname);
               return '' + path + (search || '') + (fragment || '');
            }

            return componentMap;
         }
      }
   };

   function reverseRewrite(rules, path) {
      return Object.keys(rules).reduce(function (path, pattern) {
         console.log('path', path, pattern, rules[pattern]); // :TODO: Delete
         return path.replace(new RegExp(pattern), rules[pattern]);
      }, path);
   }

   function parseUrl(url) {
      var a = document.createElement('a');
      a.href = url;
      return a;
   }
});
//# sourceMappingURL=component-list-activity.js.map

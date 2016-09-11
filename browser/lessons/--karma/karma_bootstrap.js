/** lessons unit tests bootstrap for karma
 *
 * NOTE : karma serves everything from a base/ path
 *
 * NOTE : by karma-mocha plugin, mocha is already loaded, and from node_modules !
 *        Do NOT load another mocha !
 *
 * NOTE : since we use an async loader, we must make karma wait before starting tests execution
 *
 * NOTE : phantomJS has a SERIOUS bug in which it doesn't load <script> in correct order !
 *
 * Wrapping all that :
 */

(function() {
  'use strict';

  function debug() {
    /* eslint-disable no-console */
    console.log.apply(console, arguments);
  }
  debug('* loading lessons tests in karma...');

  // intercept karma start in order to wait for our asynchronously loaded tests to be ready
  var originalKarmaStart = window.__karma__.start;
  window.__karma__.start = function() {
    debug('* original __karma__.start intercepted !', arguments);
    var savedArgs = arguments;

    // restore XXX restoring breaks things ?!?
    //window.__karma__.start = original_karma_start;

    // expose a way to call it later with the same params
    window.__delayedKarmaStart = function () {
      debug('* calling original __karma__.start with :', savedArgs);
      return originalKarmaStart.apply(window.__karma__, savedArgs)
    };
  };

  function loadScript(src) {
    debug('* loading script "' + src + '"...');
    var se = document.createElement('script');
    se.src = src;

    /* google analytics style
    var m = document.getElementsByTagName('script')[0];
    m.parentNode.insertBefore(se, m);
     */

    // standard style
    document.getElementsByTagName('body').item(0).appendChild(se);
  }

  var POLLING_INTERVAL_MS = 100;
  function pollFor(testFn, cb) {
    var pollCount = 0;

    function check() {
      pollCount++;
      //debug('  Waiting...', wait_count);
      var isReady = testFn();
      if (isReady) {
        debug('* Wait succeeded !');
        cb();
      }
      else if (pollCount > 10) {
        debug('* Wait timed out, attempting to go forward anyway...');
        cb();
      }
      else
        setTimeout(check, POLLING_INTERVAL_MS);
    }
    setTimeout(check, POLLING_INTERVAL_MS);
  }

  // trick systemJS in order to be able to dynamically change the config
  var systemJSConfig;
  window.System = {
    config: function(config) {
      systemJSConfig = config;
      // We intercepted the config, remove our hack
      delete window.System;
    }
  };

  // start loading additional scripts, enforcing order with waits
  loadScript('base/jspm_packages/system-polyfills.js');
  loadScript('base/config.js');
  pollFor(function() {
    return !!systemJSConfig;
  }, function () {
    debug('* systemJS config intercepted !');

    // change the config
    systemJSConfig.baseURL = 'base';

    loadScript('base/jspm_packages/system.js');

    pollFor(function() {
      return !!window.System;
    }, function () {
      debug('* systemJS loaded !');
      window.System.config(systemJSConfig);

      // expose jspm AMD loading
      window.define = System.amdDefine;
      window.require = window.requirejs = System.amdRequire;

      // start common test bootstrapping
      System.import('browser/lessons/lesson_tests_bootstrap.js')
      .then(function() {
        debug('* test bootstrap loaded ! nearly ready...');
      });
    });
  });
})();

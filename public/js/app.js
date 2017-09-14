(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("js/general/MousePosition.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// https://plainjs.com/javascript/events/getting-the-current-mouse-position-16/
function handlerMousePosition(e) {
    e = e || window.event;

    var pageX = e.pageX;
    var pageY = e.pageY;

    // IE 8
    if (pageX === undefined) {
        pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return { pageX: pageX, pageY: pageY };
}

exports.handlerMousePosition = handlerMousePosition;

});

require.register("js/general/Throttle.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// throttle
// https://remysharp.com/2010/07/21/throttling-function-calls
function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last, deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date(),
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

exports.throttle = throttle;

});

require.register("js/general/Window.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
                            value: true
});
// Get Window Width
var getWindowWidth = function getWindowWidth() {
                            return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
};

// Get Window Height
var getWindowHeight = function getWindowHeight() {
                            return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
};

// Get Element Width
var getElementWidth = function getElementWidth(el) {
                            return el.clientWidth;
};

// Get Element Height
var getElementHeight = function getElementHeight(el) {
                            return el.clientHeight;
};

exports.getWindowWidth = getWindowWidth;
exports.getWindowHeight = getWindowHeight;
exports.getElementWidth = getElementWidth;
exports.getElementHeight = getElementHeight;

});

require.register("js/initialize.js", function(exports, require, module) {
'use strict';

var _Window = require('./general/Window.js');

var _Throttle = require('./general/Throttle.js');

var _smoothstate = require('smoothstate');

var _smoothstate2 = _interopRequireDefault(_smoothstate);

var _fullpage = require('fullpage.js');

var _fullpage2 = _interopRequireDefault(_fullpage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Elements
var $body = document.getElementsByTagName("body")[0];
var $main = document.getElementById("main");
var $header = document.getElementById("header");
var $footer = document.getElementById("footer");
var $mainWraper = document.getElementsByClassName("flex--main")[0];

// General Variables
var windowSize = { w: (0, _Window.getWindowWidth)(), h: (0, _Window.getWindowHeight)() };
var mainSize = { w: (0, _Window.getElementWidth)($main), h: (0, _Window.getElementHeight)($main) };
var headerSize = { w: (0, _Window.getElementWidth)($header), h: (0, _Window.getElementHeight)($header) };
var footerSize = { w: (0, _Window.getElementWidth)($footer), h: (0, _Window.getElementHeight)($footer) };

//
document.addEventListener('DOMContentLoaded', function () {
  console.log('initialized');

  // Initialize Variables
  var $$body = $('body');
  windowSize = { w: (0, _Window.getWindowWidth)(), h: (0, _Window.getWindowHeight)() };
  mainSize = { w: (0, _Window.getElementWidth)($main), h: (0, _Window.getElementHeight)($main) };
  headerSize = { w: (0, _Window.getElementWidth)($header), h: (0, _Window.getElementHeight)($header) };
  footerSize = { w: (0, _Window.getElementWidth)($footer), h: (0, _Window.getElementHeight)($footer) };

  // Loading
  setLoadingIndicatorPositionAndSize();

  // Initialize Settings
  setBackgroungHeight();

  // Load Plugins
  firePageVerticalSlider();

  // Event Listeners
  $('a[href="#demo"]').on('click', function (e) {
    e.preventDefault();

    if ($$body.hasClass('is-openLb')) {
      $$body.removeClass('is-openLb');
    } else {
      $$body.addClass('is-openLb');
    }
  });
});

//
window.addEventListener('resize', (0, _Throttle.throttle)(function (event) {
  windowSize.w = (0, _Window.getWindowWidth)();
  windowSize.h = (0, _Window.getWindowHeight)();
  setBackgroungHeight();
}, 100));

/*
 *
 */
var setBackgroungHeight = function setBackgroungHeight() {
  var currentH = mainSize.h;

  if (currentH < windowSize.h) {
    var extraSize = windowSize.h - currentH;
    $main.setAttribute("style", "height: " + (extraSize + mainSize.h) + "px");
    setLoadingIndicatorPositionAndSize();
  }
};

var setLoadingIndicatorPositionAndSize = function setLoadingIndicatorPositionAndSize() {
  var $svgIndicator = $('.loading-indicator');

  if ($svgIndicator.length) {
    var indicator = $svgIndicator[0].getBoundingClientRect();

    var $iinsideLndicator = $('.inside-loading');

    $iinsideLndicator.css({
      width: indicator.width,
      height: indicator.height,
      top: indicator.top,
      left: indicator.left
    });
  }
};

var firePageVerticalSlider = function firePageVerticalSlider() {
  // https://github.com/alvarotrigo/fullPage.js
  $('#fullpage').fullpage({
    // scrollingSpeed: 1000,
    verticalCentered: false
    // fixedElements: '#header'
  });
};

// Handle Loading
$(function () {
  'use strict';

  // var

  var $$body = $('body');

  // init
  var smoothState = $('.main').smoothState({
    prefetch: false,
    cacheLength: 2,
    onStart: {
      duration: 1000,
      render: function render($container) {
        $$body.addClass('is-exiting');
        $$body.addClass('is-showing-inside-loading');
        smoothState.restartCSSAnimations();
      }
    },
    onReady: {
      duration: 0,
      render: function render($container, $newContent) {
        $$body.removeClass('is-exiting');
        $$body.removeClass('is-showing-inside-loading');
        // $$body.addClass('pace-done');
        $body.className = $($newContent[0]).attr('data-body');
        $container.html($newContent);
        firePageVerticalSlider();
      }
    }
  }).data('smoothState');

  // evnts
  window.svgClickHandle = function (path) {
    smoothState.load(path);
    // console.log(path);
  };
});

});

require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window.jQuery = require("jquery");
window["$"] = require("jquery");
window.smoothstate = require("smoothstate");


});})();require('___globals___');

require('js/initialize');
//# sourceMappingURL=app.js.map
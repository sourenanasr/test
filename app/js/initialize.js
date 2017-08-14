'use strict';

import { getWindowWidth, getWindowHeight,
         getElementWidth, getElementHeight } from './general/Window.js';
import { throttle} from './general/Throttle.js';
import smoothstate from 'smoothstate';

// Elements
const $body       = document.getElementsByTagName("body")[0];
const $main       = document.getElementById("main");
const $header     = document.getElementById("header");
const $footer     = document.getElementById("footer");
const $mainWraper = document.getElementsByClassName("flex--main")[0];

// General Variables
var windowSize = { w: getWindowWidth(),         h: getWindowHeight() }
var mainSize   = { w: getElementWidth($main),   h: getElementHeight($main) };
var headerSize = { w: getElementWidth($header), h: getElementHeight($header) };
var footerSize = { w: getElementWidth($footer), h: getElementHeight($footer) };

//
document.addEventListener('DOMContentLoaded', () => {
  console.log('initialized');

  // Initialize Variables
  windowSize = { w: getWindowWidth(),         h: getWindowHeight() }
  mainSize   = { w: getElementWidth($main),   h: getElementHeight($main) };
  headerSize = { w: getElementWidth($header), h: getElementHeight($header) };
  footerSize = { w: getElementWidth($footer), h: getElementHeight($footer) };

  // Loading
  setLoadingIndicatorPositionAndSize();

  // Initialize Settings
  setBackgroungHeight();
});

//
window.addEventListener('resize', throttle(function(event) {
  windowSize.w = getWindowWidth();
  windowSize.h = getWindowHeight();
  setBackgroungHeight();
}, 100));


/*
 *
 */
function setBackgroungHeight() {
  var currentH = mainSize.h + headerSize.h + footerSize.h;

  if (currentH < windowSize.h) {
    var extraSize = windowSize.h - currentH;
    $main.setAttribute("style", "height: " + (extraSize + mainSize.h) + "px");
    setLoadingIndicatorPositionAndSize();
  }
}

function setLoadingIndicatorPositionAndSize() {
  var $svgIndicator = $('.loading-indicator');

  if ($svgIndicator.length) {
    var indicator     = $svgIndicator[0].getBoundingClientRect();

    var $iinsideLndicator = $('.inside-loading');

    $iinsideLndicator.css({
      width:  indicator.width,
      height: indicator.height,
      top:    indicator.top,
      left:   indicator.left
    });
  }
}

// Handle Loading
$(() => {
  'use strict';

  // var
  const $$body = $('body');

  // init
  const smoothState = $('.main').smoothState({
    prefetch: false,
    cacheLength: 2,
    onStart: {
      duration: 1000,
      render: function ($container) {
        $$body.addClass('is-exiting');
        $$body.addClass('is-showing-inside-loading');
        smoothState.restartCSSAnimations();
      }
    },
    onReady: {
      duration: 0,
      render: function ($container, $newContent) {
        $$body.removeClass('is-exiting');
        $$body.removeClass('is-showing-inside-loading');
        $body.className = $($newContent[0]).attr('data-body');
        $container.html($newContent);
      }
    }
  }).data('smoothState');

  // evnts
  window.svgClickHandle = function(path) {
    smoothState.load(path);
    // console.log(path);
  }
});

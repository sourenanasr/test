'use strict';

import { getWindowWidth, getWindowHeight,
         getElementWidth, getElementHeight } from './general/Window.js';
import { throttle} from './general/Throttle.js';
import smoothstate from 'smoothstate';
import fullpage from 'fullpage.js';

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
  const $$body = $('body');
  windowSize = { w: getWindowWidth(),         h: getWindowHeight() }
  mainSize   = { w: getElementWidth($main),   h: getElementHeight($main) };
  headerSize = { w: getElementWidth($header), h: getElementHeight($header) };
  footerSize = { w: getElementWidth($footer), h: getElementHeight($footer) };

  // Loading
  setLoadingIndicatorPositionAndSize();

  // Initialize Settings
  setBackgroungHeight();

  // Load Plugins
  firePageVerticalSlider();

  // Event Listeners
  $('a[href="#demo"]').on('click', e => {
    e.preventDefault();

    if ($$body.hasClass('is-openLb')) {
      $$body.removeClass('is-openLb');
    } else {
      $$body.addClass('is-openLb');
    }
  });
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
const setBackgroungHeight = () => {
  var currentH = mainSize.h;

  if (currentH < windowSize.h) {
    var extraSize = windowSize.h - currentH;
    $main.setAttribute("style", "height: " + (extraSize + mainSize.h) + "px");
    setLoadingIndicatorPositionAndSize();
  }
}

const setLoadingIndicatorPositionAndSize = () => {
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

const firePageVerticalSlider = () => {
  // https://github.com/alvarotrigo/fullPage.js
  $('#fullpage').fullpage({
    // scrollingSpeed: 1000,
    verticalCentered: false,
    // fixedElements: '#header'
  });
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
        // $$body.addClass('pace-done');
        $body.className = $($newContent[0]).attr('data-body');
        $container.html($newContent);
        firePageVerticalSlider();
      }
    }
  }).data('smoothState');

  // evnts
  window.svgClickHandle = function(path) {
    smoothState.load(path);
    // console.log(path);
  }
});

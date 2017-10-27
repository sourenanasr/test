'use strict';

import { getWindowWidth, getWindowHeight,
         getElementWidth, getElementHeight } from './general/Window.js';
import { throttle} from './general/Throttle.js';
import { Browser } from "./general/Browser";

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

  bindRequestDemoHandler($$body);

  bindDrawerHandler();

  attachBrowserClass();
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
  if (!$main.classList.contains('bigframe')) {
    var extraSize = windowSize.h - mainSize.h;
    $main.classList.add('flex--theme');
    $main.classList.remove('bigframe');
    $main.setAttribute("style", "height: " + (extraSize + mainSize.h) + "px");
    setLoadingIndicatorPositionAndSize();
    setLoadingIndicatorPositionAndSize(true);
  } else {
    $main.classList.remove('flex--theme');
    $main.classList.add('bigframe');
  }
}

const setLoadingIndicatorPositionAndSize = (firstLoading) => {
  if (firstLoading) {
    var $svgIndicator = $('.blink-animation');
  } else {
    var $svgIndicator = $('.loading-indicator');
  }

  if ($svgIndicator.length) {
    var indicator     = $svgIndicator[0].getBoundingClientRect();

    if (firstLoading) {
      var $iinsideLndicator = $('.ripple');
    } else {
      var $iinsideLndicator = $('.inside-loading');
    }

    $iinsideLndicator.css({
      width:  parseInt(indicator.width),
      height: parseInt(indicator.width),
      top:    parseInt(indicator.top),
      left:   parseInt(indicator.left)
    });
  }
}

const firePageVerticalSlider = () => {
  // https://github.com/alvarotrigo/fullPage.js
  $('#fullpage').fullpage({
    // scrollingSpeed: 1000,
    verticalCentered: false,
    menu: '#full-page-menu'
    // fixedElements: '#header'
  });
}


// Handle Loading
$(() => {
  'use strict';

  // var
  const $$body = $('body');

  // init
  const smoothState = $('.home .main').smoothState({
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
        $body.className = $($newContent[0]).attr('data-body') || 'home  pace-done';
        $container.html($newContent);
        firePageVerticalSlider();
        attachBrowserClass();
      }
    }
  }).data('smoothState');

  // evnts
  window.svgClickHandle = function(path) {
    smoothState.load(path);
    // console.log(path);
  }
});

function bindRequestDemoHandler($$body) {
    // Event Listeners
    $('a[href="#demo"]').on('click', e => {
        e.preventDefault();
        if ($$body.hasClass('is-openLb')) {
            $$body.removeClass('is-openLb');
        }
        else {
            $$body.addClass('is-openLb');
        }
    });

    $("#frmRequestDemo").submit(function(e){
      var form = this;
      $('input[type="submit"]').attr("disabled",true).val("Sending... (please wait)");
      var data = $(form).serialize();
      $.post('email', data).always(function (result) {
        $(form).hide();
        if (result.successful) {
          successMessage();
        } else {
          dangerMessage();
        }
      });

      function successMessage() {
        $('#message').removeClass('display-none')
        .addClass('success')
        .text('Your request was sent successfully.');
      }
      function dangerMessage() {
        $('#message').removeClass('display-none')
        .addClass('danger')
        .text('There was a problem in sending your request, please try again later.');
      }
      e.preventDefault();
    })
}

function bindDrawerHandler() {
  $('.burgur').click(function(){
    $(this).toggleClass('active');
    $('.drawer').toggleClass('active');
  });
}

function attachBrowserClass() {
  var browserClass = Browser.getBrowserClass();
  $('body').addClass(browserClass);
}

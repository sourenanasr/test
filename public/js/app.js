!function(){"use strict";var e="undefined"==typeof global?self:global;if("function"!=typeof e.require){var t={},n={},i={},o={}.hasOwnProperty,r=/^\.\.?(\/|$)/,l=function(e,t){for(var n,i=[],o=(r.test(t)?e+"/"+t:t).split("/"),l=0,d=o.length;l<d;l++)n=o[l],".."===n?i.pop():"."!==n&&""!==n&&i.push(n);return i.join("/")},d=function(e){return e.split("/").slice(0,-1).join("/")},u=function(t){return function(n){var i=l(d(t),n);return e.require(i,t)}},a=function(e,t){var i=w&&w.createHot(e),o={id:e,exports:{},hot:i};return n[e]=o,t(o.exports,u(e),o),o.exports},s=function(e){return i[e]?s(i[e]):e},c=function(e,t){return s(l(d(e),t))},h=function(e,i){null==i&&(i="/");var r=s(e);if(o.call(n,r))return n[r].exports;if(o.call(t,r))return a(r,t[r]);throw new Error("Cannot find module '"+e+"' from '"+i+"'")};h.alias=function(e,t){i[t]=e};var g=/\.[^.\/]+$/,f=/\/index(\.[^\/]+)?$/,m=function(e){if(g.test(e)){var t=e.replace(g,"");o.call(i,t)&&i[t].replace(g,"")!==t+"/index"||(i[t]=e)}if(f.test(e)){var n=e.replace(f,"");o.call(i,n)||(i[n]=e)}};h.register=h.define=function(e,i){if(e&&"object"==typeof e)for(var r in e)o.call(e,r)&&h.register(r,e[r]);else t[e]=i,delete n[e],m(e)},h.list=function(){var e=[];for(var n in t)o.call(t,n)&&e.push(n);return e};var w=e._hmr&&new e._hmr(c,h,t,n);h._cache=n,h.hmr=w&&w.wrap,h.brunch=!0,e.require=h}}(),function(){"undefined"==typeof window?this:window;require.register("js/general/MousePosition.js",function(e,t,n){"use strict";function i(e){e=e||window.event;var t=e.pageX,n=e.pageY;return void 0===t&&(t=e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,n=e.clientY+document.body.scrollTop+document.documentElement.scrollTop),{pageX:t,pageY:n}}Object.defineProperty(e,"__esModule",{value:!0}),e.handlerMousePosition=i}),require.register("js/general/Throttle.js",function(e,t,n){"use strict";function i(e,t,n){t||(t=250);var i,o;return function(){var r=n||this,l=+new Date,d=arguments;i&&l<i+t?(clearTimeout(o),o=setTimeout(function(){i=l,e.apply(r,d)},t)):(i=l,e.apply(r,d))}}Object.defineProperty(e,"__esModule",{value:!0}),e.throttle=i}),require.register("js/general/Window.js",function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){return window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth},o=function(){return window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight},r=function(e){return e.clientWidth},l=function(e){return e.clientHeight};e.getWindowWidth=i,e.getWindowHeight=o,e.getElementWidth=r,e.getElementHeight=l}),require.register("js/initialize.js",function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function o(){var e=f.h+m.h+w.h;if(e<g.h){var t=g.h-e;s.setAttribute("style","height: "+(t+f.h)+"px"),r()}}function r(){var e=$(".loading-indicator");if(e.length){var t=e[0].getBoundingClientRect(),n=$(".inside-loading");n.css({width:t.width,height:t.height,top:t.top,left:t.left})}}var l=t("./general/Window.js"),d=t("./general/Throttle.js"),u=t("smoothstate"),a=(i(u),document.getElementsByTagName("body")[0]),s=document.getElementById("main"),c=document.getElementById("header"),h=document.getElementById("footer"),g=(document.getElementsByClassName("flex--main")[0],{w:(0,l.getWindowWidth)(),h:(0,l.getWindowHeight)()}),f={w:(0,l.getElementWidth)(s),h:(0,l.getElementHeight)(s)},m={w:(0,l.getElementWidth)(c),h:(0,l.getElementHeight)(c)},w={w:(0,l.getElementWidth)(h),h:(0,l.getElementHeight)(h)};document.addEventListener("DOMContentLoaded",function(){console.log("initialized"),g={w:(0,l.getWindowWidth)(),h:(0,l.getWindowHeight)()},f={w:(0,l.getElementWidth)(s),h:(0,l.getElementHeight)(s)},m={w:(0,l.getElementWidth)(c),h:(0,l.getElementHeight)(c)},w={w:(0,l.getElementWidth)(h),h:(0,l.getElementHeight)(h)},r(),o()}),window.addEventListener("resize",(0,d.throttle)(function(e){g.w=(0,l.getWindowWidth)(),g.h=(0,l.getWindowHeight)(),o()},100)),$(function(){var e=$("body"),t=$(".main").smoothState({prefetch:!1,cacheLength:2,onStart:{duration:1e3,render:function(n){e.addClass("is-exiting"),e.addClass("is-showing-inside-loading"),t.restartCSSAnimations()}},onReady:{duration:0,render:function(t,n){e.removeClass("is-exiting"),e.removeClass("is-showing-inside-loading"),a.className=$(n[0]).attr("data-body"),t.html(n)}}}).data("smoothState");window.svgClickHandle=function(e){t.load(e)}})}),require.register("___globals___",function(e,t,n){window.jQuery=t("jquery"),window.$=t("jquery"),window.smoothstate=t("smoothstate")})}(),require("___globals___"),require("js/initialize");
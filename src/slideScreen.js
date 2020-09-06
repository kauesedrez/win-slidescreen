import { W } from "../../winnetoujs/src/winnetou.js";

/**@type {any} */
var GLOBAL_TELAS = [];
/**@type {any} */
var GLOBAL_SS_OUT = "";

/**
 * Method that adds the business rule in the slideScreen constructo to receive the screens correctly.
 * @param  {string} slideScreen_Constructo
 * @param  {string} document_container_element
 */
export function make(
  slideScreen_Constructo,
  document_container_element
) {
  //
  GLOBAL_SS_OUT = W.select(document_container_element).getWidth();

  // console.log("\n\n\nwidth #app: ", GLOBAL_SS_OUT, container);

  const totalDeTelas = document.getElementById(slideScreen_Constructo)
    .childElementCount;

  const larguraSlideScreen = totalDeTelas * GLOBAL_SS_OUT;

  W.select(".screen").css("width", GLOBAL_SS_OUT);
  W.select("#" + slideScreen_Constructo).css(
    "width",
    larguraSlideScreen
  );

  for (let i = 0; i < totalDeTelas; i++) {
    //
    GLOBAL_TELAS[
      document.getElementById(slideScreen_Constructo).children[i].id
    ] = i;
    //
  }
}
/**
 * Method responsible for changing the screens.
 * Use with Winnetou.navigate() to get the option to return with the physical back button
 * @param  {any} to_screen screen id
 * @param  {string} efeito (null|animate|direct) **default "animate"**
 */
export function scroll(to_screen, efeito = "animate") {
  const windowSize = GLOBAL_SS_OUT;

  if (typeof to_screen == "string") {
    to_screen = GLOBAL_TELAS[to_screen];
  }

  if (efeito === "animate") {
    tween(
      sel("app").scrollLeft,
      to_screen * windowSize,
      500,
      easings["easeOutCubic"]
    );
  }

  if (efeito == "direct") {
    sel("app").scrollLeft = to_screen * windowSize;
  }
}

var sel = function (id) {
  return document.getElementById(id);
};

var w = sel("app");

var tween = function (start, end, duration, easing) {
  var delta = end - start;
  var startTime;
  if (window.performance && window.performance.now) {
    startTime = performance.now();
  } else if (Date.now) {
    startTime = Date.now();
  } else {
    startTime = new Date().getTime();
  }
  var tweenLoop = function (time) {
    var t = !time ? 0 : time - startTime;
    var factor = easing(null, t, 0, 1, duration);
    try {
      w.scrollLeft = start + delta * factor;
    } catch (e) {
      console.log("err" + e);
    }
    if (t < duration && w.scrollLeft != end)
      requestAnimationFrame(tweenLoop);
  };
  tweenLoop();
};

(function () {
  var lastTime = 0;
  var vendors = ["ms", "moz", "webkit", "o"];
  for (
    var x = 0;
    x < vendors.length && !window.requestAnimationFrame;
    ++x
  ) {
    window.requestAnimationFrame =
      window[vendors[x] + "RequestAnimationFrame"];
    window.cancelAnimationFrame =
      window[vendors[x] + "CancelAnimationFrame"] ||
      window[vendors[x] + "CancelRequestAnimationFrame"];
  }
  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
})();

var easings = {
  easeOutCubic: function (x, t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  },
};

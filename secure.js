/* secure.js – Nazeem Fahman portfolio
   Deterrents against casual copying. Load BEFORE script.js.
   Note: nothing in a browser can fully stop a determined person, but this
   blocks right-click, text copying, image dragging and common shortcuts. */
(function () {
  "use strict";

  var CONFIG = {
    blockRightClick: true,
    blockCopy: true,          // copy / cut / select-all / drag
    blockShortcuts: true,     // F12, Ctrl+U/S/P/C/X/A, Ctrl+Shift+I/J/C
    blockPrint: true,
    watermark: "© Nazeem Fahman. All rights reserved.",  // placed on clipboard if copy slips through
    allowInInputs: true       // keep forms usable
  };

  var root = document.documentElement;
  root.classList.add("protect");

  function inField(t) {
    return CONFIG.allowInInputs && t && /^(INPUT|TEXTAREA)$/.test(t.tagName);
  }

  function toast(msg) {
    var el = document.getElementById("sec-toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "sec-toast";
      el.setAttribute("role", "status");
      el.style.cssText = "position:fixed;left:50%;bottom:calc(28px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);" +
        "z-index:200;background:#f2efe9;color:#000;padding:10px 18px;border-radius:99px;font:500 14px 'Bricolage Grotesque',Arial,sans-serif;" +
        "opacity:0;transition:opacity .25s;pointer-events:none";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.style.opacity = "1";
    clearTimeout(el._t);
    el._t = setTimeout(function () { el.style.opacity = "0"; }, 1600);
  }

  function stop(e, msg) {
    e.preventDefault();
    e.stopPropagation();
    if (msg) toast(msg);
    return false;
  }

  /* right-click */
  if (CONFIG.blockRightClick) {
    document.addEventListener("contextmenu", function (e) {
      if (inField(e.target)) return;
      stop(e, "This work is protected.");
    }, true);
  }

  /* copy, cut, select, drag */
  if (CONFIG.blockCopy) {
    ["copy", "cut"].forEach(function (ev) {
      document.addEventListener(ev, function (e) {
        if (inField(e.target)) return;
        if (e.clipboardData) e.clipboardData.setData("text/plain", CONFIG.watermark);
        stop(e, "Copying is disabled.");
      }, true);
    });
    ["selectstart", "dragstart"].forEach(function (ev) {
      document.addEventListener(ev, function (e) {
        if (inField(e.target)) return;
        stop(e);
      }, true);
    });
  }

  /* keyboard shortcuts */
  if (CONFIG.blockShortcuts) {
    document.addEventListener("keydown", function (e) {
      var k = (e.key || "").toLowerCase();
      var mod = e.ctrlKey || e.metaKey;

      if (k === "f12") return stop(e, "Dev tools are disabled.");
      if (mod && e.shiftKey && ["i", "j", "c", "k"].indexOf(k) > -1) return stop(e, "Dev tools are disabled.");
      if (mod && e.altKey && ["i", "j", "u"].indexOf(k) > -1) return stop(e, "Dev tools are disabled.");
      if (mod && k === "u") return stop(e, "View source is disabled.");
      if (mod && k === "s") return stop(e, "Saving is disabled.");
      if (inField(e.target)) return;
      if (mod && ["c", "x", "a"].indexOf(k) > -1) return stop(e, "Copying is disabled.");
      if (CONFIG.blockPrint && mod && k === "p") return stop(e, "Printing is disabled.");
    }, true);
  }

  /* hide page when printing */
  if (CONFIG.blockPrint) {
    var s = document.createElement("style");
    s.textContent = "@media print{html{display:none!important}}";
    document.head.appendChild(s);
  }

  /* images/videos: no drag, no context menu, no download button */
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("img").forEach(function (i) { i.draggable = false; });
    document.querySelectorAll("video").forEach(function (v) {
      v.setAttribute("controlsList", "nodownload noremoteplayback");
      v.disablePictureInPicture = true;
    });
  });
})();

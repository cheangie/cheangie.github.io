/* =============================================================================
   FUN PAGE (fun.html)
   - "Right now" board (playing/reading/watching/listening) + side blurb
   - creative-works gallery (opens the shared modal)
   Depends on: data.js, ui.js
   ========================================================================== */
(function () {
  "use strict";

  var UI = window.UI;
  var DATA = UI.data;
  var esc = UI.escapeHtml;

  document.addEventListener("DOMContentLoaded", function () {
    UI.initShell("fun");
    buildNowBlurb();
    buildNow();
    buildCreative();
  });

  function buildNowBlurb() {
    var b = DATA.nowBlurb;
    if (!b) return;
    var items = (b.items || []).map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("");
    fill("[data-now-blurb]",
      (b.lead ? '<p class="now-blurb__lead">' + esc(b.lead) + "</p>" : "") +
      (items ? '<ul class="now-blurb__list">' + items + "</ul>" : "") +
      (b.outro ? '<p class="now-blurb__outro">' + esc(b.outro) + "</p>" : ""));
  }

  function buildNow() {
    fill("[data-now]", (DATA.now || []).map(function (n) {
      return '<div class="now-card">' +
        '<span class="now-card__icon">' + UI.iconMarkup(n.icon || "🎮") + "</span>" +
        '<div class="now-card__label">' + esc(n.label) + "</div>" +
        '<div class="now-card__value">' + esc(n.value) + "</div>" +
        "</div>";
    }).join(""));
  }

  function buildCreative() {
    var grid = document.querySelector("[data-creative]");
    if (!grid) return;
    (DATA.creative || []).forEach(function (item) {
      // reuse the app-card component; category shows in the hover bubble
      var card = UI.renderAppCard(item, function () { UI.openDetail(item); });
      grid.appendChild(card);
    });
  }

  function fill(sel, html) { var el = document.querySelector(sel); if (el) el.innerHTML = html; }
})();

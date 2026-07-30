/* =============================================================================
   PROJECTS PAGE (projects.html)
   - full grid of every project (3DS "bottom screen" writ large)
   - filter bar to show projects by type (Backend/Frontend/Fullstack/ML/UI)
   Depends on: data.js, ui.js
   ========================================================================== */
(function () {
  "use strict";

  var UI = window.UI;
  var DATA = UI.data;
  var TYPE_ORDER = ["Backend", "Frontend", "Fullstack", "ML", "UI"];

  document.addEventListener("DOMContentLoaded", function () {
    UI.initShell("projects");

    var grid = document.querySelector("[data-projects]");
    var list = DATA.projects || [];
    var cards = [];
    if (grid) {
      list.forEach(function (app) {
        var card = UI.renderAppCard(app, function () { UI.openDetail(app); });
        cards.push(card);
        grid.appendChild(card);
      });
    }

    var countEl = document.querySelector("[data-count]");
    function updateCount(n) {
      if (countEl) countEl.textContent = n + (n === 1 ? " app" : " apps");
    }
    updateCount(list.length);

    buildFilter(cards, updateCount);
  });

  function buildFilter(cards, updateCount) {
    var host = document.querySelector("[data-filter]");
    if (!host) return;

    // which types actually appear, in canonical order
    var present = TYPE_ORDER.filter(function (t) {
      return cards.some(function (c) { return c.dataset.type === t; });
    });
    if (!present.length) return; // no typed projects → no filter bar
    var options = ["All"].concat(present);

    options.forEach(function (opt, i) {
      var b = document.createElement("button");
      b.className = "filter-btn";
      b.type = "button";
      b.textContent = opt;
      b.dataset.filter = opt;
      b.setAttribute("aria-pressed", String(i === 0)); // "All" active by default
      b.addEventListener("click", function () { applyFilter(opt); });
      host.appendChild(b);
    });

    function applyFilter(sel) {
      UI.Sound.select();
      var visible = 0;
      cards.forEach(function (c) {
        var show = sel === "All" || c.dataset.type === sel;
        c.style.display = show ? "" : "none";
        if (show) visible++;
      });
      host.querySelectorAll(".filter-btn").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.dataset.filter === sel));
      });
      updateCount(visible);
    }
  }
})();

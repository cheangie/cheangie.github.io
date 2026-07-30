/* =============================================================================
   HOME PAGE (index.html)
   - hero (avatar tile, name, title, tagline)
   - short about blurb + link to About page
   - projects "screen": horizontal shelf of ALL projects + "View all" link
   Depends on: data.js, ui.js
   ========================================================================== */
(function () {
  "use strict";

  var UI = window.UI;
  var DATA = UI.data;

  document.addEventListener("DOMContentLoaded", function () {
    UI.initShell("home");
    hydrateHero();
    setText("[data-blurb]", (DATA.profile || {}).blurb);
    buildProjects();
  });

  function hydrateHero() {
    var p = DATA.profile || {};
    setText("[data-name]", p.name);
    setText("[data-title]", p.title);
    setText("[data-tagline]", p.tagline);
    setAvatar(document.querySelector("[data-avatar]"), p.avatar, p.name);
  }

  function buildProjects() {
    var shelf = document.querySelector("[data-projects]");
    if (!shelf) return;
    (DATA.projects || []).forEach(function (app) {
      shelf.appendChild(UI.renderAppCard(app, function () { UI.openDetail(app); }));
    });
  }

  /* helpers */
  function isImage(v) { return typeof v === "string" && (/[\/.]/.test(v) && /\.(png|jpe?g|gif|webp|svg)$/i.test(v)); }
  function setAvatar(el, avatar, alt) {
    if (!el) return;
    if (isImage(avatar)) {
      el.innerHTML = "";
      var img = document.createElement("img");
      img.src = avatar; img.alt = alt || "avatar"; img.className = "avatar-img";
      el.appendChild(img);
    } else if (avatar) {
      el.textContent = avatar;
    }
  }
  function setText(sel, val) {
    var el = document.querySelector(sel);
    if (el && val != null) el.textContent = val;
  }
})();

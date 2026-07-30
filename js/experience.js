/* =============================================================================
   EXPERIENCE PAGE (experience.html)
   - reverse-chronological timeline of roles (Logan-style)
   Depends on: data.js, ui.js
   ========================================================================== */
(function () {
  "use strict";

  var UI = window.UI;
  var DATA = UI.data;
  var esc = UI.escapeHtml;

  document.addEventListener("DOMContentLoaded", function () {
    UI.initShell("experience");
    var host = document.querySelector("[data-experience]");
    if (!host) return;
    (DATA.experience || []).forEach(function (x) {
      host.appendChild(buildEntry(x));
    });
  });

  function isImage(v) { return typeof v === "string" && /\.(png|jpe?g|gif|webp|svg)$/i.test(v); }

  function buildEntry(x) {
    var el = document.createElement("article");
    el.className = "xp";

    var logo = isImage(x.logo)
      ? '<img class="xp__logo" src="' + esc(x.logo) + '" alt="' + esc(x.company) + ' logo" />'
      : '<span class="xp__logo xp__logo--emoji" aria-hidden="true">' + esc(x.logo || "🏢") + "</span>";

    var company = x.companyUrl && x.companyUrl !== "#"
      ? '<a href="' + esc(x.companyUrl) + '" target="_blank" rel="noopener">' + esc(x.company) + "</a>"
      : esc(x.company);

    var bullets = (x.bullets || []).map(function (b) {
      return "<li>" + esc(b) + "</li>";
    }).join("");

    var tech = (x.tech || []).map(function (t) {
      return '<span class="tag">' + esc(t) + "</span>";
    }).join("");

    var keyProjects = "";
    if (x.keyProjects && x.keyProjects.length) {
      var items = x.keyProjects.map(function (k) {
        return "<li>" +
          "<strong>" + esc(k.title) + "</strong>" +
          (k.detail ? " — " + esc(k.detail) : "") +
          (k.link
            ? ' <a class="xp__key-link" href="' + esc(k.link) +
              '" target="_blank" rel="noopener">View →</a>'
            : "") +
          "</li>";
      }).join("");
      keyProjects =
        '<details class="xp__key">' +
          "<summary>Key projects</summary>" +
          "<ul>" + items + "</ul>" +
        "</details>";
    }

    el.innerHTML =
      '<div class="xp__rail">' + logo + '<span class="xp__line"></span></div>' +
      '<div class="xp__body">' +
        '<div class="xp__head">' +
          '<h2 class="xp__role">' + esc(x.role) + "</h2>" +
          '<span class="xp__dates">' + esc(x.start || "") +
            (x.end ? " – " + esc(x.end) : "") + "</span>" +
        "</div>" +
        '<div class="xp__meta">' + company +
          (x.location ? ' <span class="xp__loc">• ' + esc(x.location) + "</span>" : "") +
        "</div>" +
        (bullets ? "<ul class=\"xp__bullets\">" + bullets + "</ul>" : "") +
        (tech ? '<div class="xp__tech">' + tech + "</div>" : "") +
        keyProjects +
      "</div>";

    return el;
  }
})();

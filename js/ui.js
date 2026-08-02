/* =============================================================================
   SHARED UI — shell (navbar + footer), components, and interactions used by
   every page. Depends on window.PORTFOLIO (data.js) loaded first.
   Everything is attached to window.UI.
   ========================================================================== */
(function () {
  "use strict";

  var DATA = window.PORTFOLIO || { projects: [], links: [], profile: {} };

  /* Nav definition (home marker + tabs) */
  var NAV_TABS = [
    { key: "projects", label: "Projects", href: "projects.html" },
    { key: "experience", label: "Experience", href: "experience.html" },
    { key: "about", label: "About", href: "about.html" },
    { key: "fun", label: "Fun", href: "fun.html" },
  ];

  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* Icon helpers — an icon value can be:
     - an emoji / text string (rendered as-is),
     - a path to an svg/img (rendered as <img class="icon-img">),
     - a dual object { light, dark } for logos that differ by theme (e.g. a black
       logo for light mode, white for dark). Dual imgs carry data-icon-light/dark
       and their src is swapped by applyTheme() on theme change. */
  function isIconPath(v) {
    return typeof v === "string" && /\.(svg|png|jpe?g|gif|webp)$/i.test(v);
  }
  function resolveDual(v) {
    if (v && typeof v === "object" && (v.light || v.dark)) {
      return { light: v.light || v.dark, dark: v.dark || v.light };
    }
    return null;
  }
  function iconMarkup(v) {
    var dual = resolveDual(v);
    if (dual) {
      var src = currentTheme() === "dark" ? dual.dark : dual.light;
      return '<img class="icon-img" src="' + escapeHtml(src) +
        '" data-icon-light="' + escapeHtml(dual.light) +
        '" data-icon-dark="' + escapeHtml(dual.dark) +
        '" alt="" aria-hidden="true" />';
    }
    if (isIconPath(v)) {
      return '<img class="icon-img" src="' + escapeHtml(v) + '" alt="" aria-hidden="true" />';
    }
    return escapeHtml(v || "");
  }
  function makeIcon(v) {
    var dual = resolveDual(v);
    if (dual) {
      var di = document.createElement("img");
      di.className = "icon-img";
      di.setAttribute("data-icon-light", dual.light);
      di.setAttribute("data-icon-dark", dual.dark);
      di.src = currentTheme() === "dark" ? dual.dark : dual.light;
      di.alt = "";
      di.setAttribute("aria-hidden", "true");
      return di;
    }
    if (isIconPath(v)) {
      var img = document.createElement("img");
      img.className = "icon-img";
      img.src = v;
      img.alt = "";
      img.setAttribute("aria-hidden", "true");
      return img;
    }
    var span = document.createElement("span");
    span.textContent = v || "";
    return span;
  }

  /* --------------------------------------------------------------------------
     SOUND ENGINE — tiny WebAudio blips. Muted by default (autoplay-safe:
     the AudioContext is only created after a user gesture). State persists.
  -------------------------------------------------------------------------- */
  var Sound = {
    ctx: null,
    enabled: localStorage.getItem("pf-sound") === "on", // default OFF
    _ensureCtx: function () {
      if (!this.ctx) {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (AC) this.ctx = new AC();
      }
      if (this.ctx && this.ctx.state === "suspended") this.ctx.resume();
    },
    _blip: function (freq, dur) {
      if (!this.enabled) return;
      this._ensureCtx();
      if (!this.ctx) return;
      var t = this.ctx.currentTime;
      var osc = this.ctx.createOscillator();
      var gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.12, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(gain).connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + dur);
    },
    hover: function () { this._blip(660, 0.05); },
    select: function () { this._blip(880, 0.09); },
    back: function () { this._blip(440, 0.12); },
    setEnabled: function (on) {
      this.enabled = on;
      localStorage.setItem("pf-sound", on ? "on" : "off");
      if (on) { this._ensureCtx(); this.select(); }
    },
  };

  /* --------------------------------------------------------------------------
     CLOCK — live time + date into the status bar.
  -------------------------------------------------------------------------- */
  function initClock() {
    var clockEls = document.querySelectorAll("[data-clock]");
    var dateEls = document.querySelectorAll("[data-date]");
    function tick() {
      var now = new Date();
      var hh = now.getHours();
      var mm = String(now.getMinutes()).padStart(2, "0");
      var ampm = hh >= 12 ? "PM" : "AM";
      var h12 = hh % 12 || 12;
      var timeStr = h12 + ":" + mm + " " + ampm;
      var dateStr = now.toLocaleDateString(undefined, {
        weekday: "short", month: "short", day: "numeric",
      });
      clockEls.forEach(function (el) { el.textContent = timeStr; });
      dateEls.forEach(function (el) { el.textContent = dateStr; });
    }
    tick();
    setInterval(tick, 1000 * 15);
  }

  /* --------------------------------------------------------------------------
     THEME TOGGLE — light / dark only. Persists to localStorage.
  -------------------------------------------------------------------------- */
  var THEMES = ["light", "dark"];

  function normalizeTheme(name) {
    return name === "dark" ? "dark" : "light"; // migrate old teal/coral -> light
  }
  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }
  function applyTheme(name) {
    document.documentElement.setAttribute("data-theme", name);
    localStorage.setItem("pf-theme", name);
    // swap any dual (light/dark) logos to the matching variant
    document.querySelectorAll("img[data-icon-light]").forEach(function (img) {
      var next = name === "dark" ? img.getAttribute("data-icon-dark") : img.getAttribute("data-icon-light");
      if (next && img.getAttribute("src") !== next) img.src = next;
    });
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      var next = name === "dark" ? "light" : "dark";
      btn.innerHTML = name === "dark"
        ? '<span aria-hidden="true">' + iconMarkup("ui/navbar/darkmode_icon.svg") + '</span><span class="theme-toggle__label">Dark</span>'
        : '<span aria-hidden="true">' + iconMarkup("ui/navbar/lightmode_icon.svg") + '</span><span class="theme-toggle__label">Light</span>';
      btn.setAttribute("aria-label", "Switch to " + next + " mode");
    });
  }
  function initTheme() {
    var current = normalizeTheme(localStorage.getItem("pf-theme"));
    applyTheme(current);
    document.querySelectorAll("[data-theme-switch]").forEach(function (host) {
      host.innerHTML = "";
      var b = document.createElement("button");
      b.className = "theme-toggle";
      b.type = "button";
      b.setAttribute("data-theme-toggle", "");
      b.addEventListener("click", function () {
        applyTheme(currentTheme() === "dark" ? "light" : "dark");
        Sound.select();
      });
      host.appendChild(b);
    });
    applyTheme(current);
  }

  function initSoundToggle() {
    var btns = document.querySelectorAll("[data-sound-toggle]");
    function paint() {
      btns.forEach(function (b) {
        b.innerHTML = Sound.enabled ? iconMarkup("ui/navbar/soundon_icon.svg") : iconMarkup("ui/navbar/soundmute_icon.svg");
        b.setAttribute("aria-pressed", String(Sound.enabled));
        b.setAttribute("aria-label", Sound.enabled ? "Mute sounds" : "Enable sounds");
      });
    }
    btns.forEach(function (b) {
      b.addEventListener("click", function () { Sound.setEnabled(!Sound.enabled); paint(); });
    });
    paint();
  }

  /* --------------------------------------------------------------------------
     NAVBAR + FOOTER (shared shell)
  -------------------------------------------------------------------------- */
  function renderNav(activeKey) {
    var host = document.querySelector("[data-nav]");
    if (!host) return;
    var tabs = NAV_TABS.map(function (t) {
      var cur = t.key === activeKey ? ' aria-current="page"' : "";
      return '<a class="nav__tab" href="' + t.href + '"' + cur + ">" + escapeHtml(t.label) + "</a>";
    }).join("");
    var onHome = activeKey === "home";
    var homeCur = onHome ? ' aria-current="page"' : "";
    // blue home icon when you're already on the home page, plain one otherwise
    var homeIcon = onHome ? "ui/navbar/home_icon_blue.svg" : "ui/navbar/home_icon.svg";
    host.innerHTML =
      '<nav class="nav">' +
        '<div class="nav__zone nav__zone--left">' +
          '<a class="nav__home" href="index.html" aria-label="Home"' + homeCur + '>' +
            '<span class="nav__home-icon">' + iconMarkup(homeIcon) + "</span>" +
          "</a>" +
          '<div class="nav__tabs">' + tabs + "</div>" +
        "</div>" +
        '<div class="nav__zone nav__zone--center">' +
          '<span class="statusbar__clock" data-clock>–:–</span>' +
          '<span class="statusbar__date" data-date></span>' +
        "</div>" +
        '<div class="nav__zone nav__zone--right">' +
          '<span data-theme-switch></span>' +
          '<button class="statusbar__btn" type="button" data-sound-toggle>' + iconMarkup("ui/navbar/soundmute_icon.svg") + "</button>" +
        "</div>" +
      "</nav>";
  }

  function renderFooter() {
    var host = document.querySelector("[data-footer]");
    if (!host) return;
    var links = (DATA.links || []).map(function (l) {
      var ext = l.url && l.url.charAt(0) !== "#" && l.url.indexOf("mailto:") !== 0;
      return '<a class="btn btn--ghost" href="' + escapeHtml(l.url || "#") + '"' +
        (ext ? ' target="_blank" rel="noopener"' : "") + ">" +
        (l.icon ? iconMarkup(l.icon) + " " : "") + escapeHtml(l.label) + "</a>";
    }).join("");
    host.innerHTML =
      '<div class="footer__links">' + links + "</div>" +
      '<p class="footer__note">© ' + escapeHtml((DATA.profile && DATA.profile.name) || "") + "</p>";
  }

  /* --------------------------------------------------------------------------
     HOVER SPEECH BUBBLE — one shared element appended to <body>, positioned
     above the hovered card (avoids overflow clipping inside the shelf).
  -------------------------------------------------------------------------- */
  var bubbleEl = null;
  function ensureBubble() {
    if (!bubbleEl) {
      bubbleEl = document.createElement("div");
      bubbleEl.className = "hover-bubble";
      bubbleEl.setAttribute("role", "tooltip");
      document.body.appendChild(bubbleEl);
    }
    return bubbleEl;
  }
  function bubbleTags(app) {
    var t = app.tags || (app.category ? [app.category] : []);
    return t.map(function (x) {
      return '<span class="hover-bubble__tag">' + escapeHtml(x) + "</span>";
    }).join("");
  }
  // 2-letter acronym for a project type (shown as a circle in the hover popup)
  var TYPE_ACRONYM = { Fullstack: "FS", Frontend: "FE", Backend: "BE", ML: "ML", UI: "UI" };
  function typeAcronym(t) {
    if (!t) return "";
    return TYPE_ACRONYM[t] || t.slice(0, 2).toUpperCase();
  }
  function showBubble(card, app) {
    var blurb = app.blurb || app.description || "";
    var tags = bubbleTags(app);
    var acr = typeAcronym(app.type);
    if (!blurb && !tags && !acr) return;
    var b = ensureBubble();
    b.classList.toggle("has-type", !!acr);
    b.innerHTML =
      (acr ? '<span class="hover-bubble__type" title="' + escapeHtml(app.type) + '">' + escapeHtml(acr) + "</span>" : "") +
      '<div class="hover-bubble__title">' + escapeHtml(app.title || app.label) + "</div>" +
      (blurb ? '<div class="hover-bubble__blurb">' + escapeHtml(blurb) + "</div>" : "") +
      (tags ? '<div class="hover-bubble__tags">' + tags + "</div>" : "");
    b.classList.add("is-visible");
    positionBubble(card);
  }
  function positionBubble(card) {
    if (!bubbleEl) return;
    var r = card.getBoundingClientRect();
    var bb = bubbleEl.getBoundingClientRect();
    var top = r.top - bb.height - 12 + window.scrollY;
    var left = r.left + r.width / 2 - bb.width / 2 + window.scrollX;
    var maxLeft = window.scrollX + document.documentElement.clientWidth - bb.width - 8;
    left = Math.max(window.scrollX + 8, Math.min(left, maxLeft));
    if (top < window.scrollY + 4) top = r.bottom + 12 + window.scrollY; // flip below if no room
    bubbleEl.style.top = top + "px";
    bubbleEl.style.left = left + "px";
  }
  function hideBubble() { if (bubbleEl) bubbleEl.classList.remove("is-visible"); }
  window.addEventListener("scroll", hideBubble, { passive: true });

  /* --------------------------------------------------------------------------
     APP CARD — glossy icon tile with 3DS corner-bracket reticle + hover bubble.
     Works for both projects and creative items. onSelect(app) fires on click.
  -------------------------------------------------------------------------- */
  function renderAppCard(app, onSelect) {
    var card = document.createElement("button");
    card.className = "app-card";
    card.type = "button";
    card.dataset.id = app.id || "";
    if (app.type) card.dataset.type = app.type;
    card.setAttribute("aria-label", app.label || app.title || "");

    var tile = document.createElement("span");
    tile.className = "app-card__tile";

    var glyph = makeIcon(app.icon || "❓");
    glyph.classList.add("app-card__glyph");
    tile.appendChild(glyph);

    // 3DS corner-bracket reticle overlay (shown on hover/focus via CSS)
    var reticle = document.createElement("span");
    reticle.className = "app-card__reticle";
    reticle.setAttribute("aria-hidden", "true");
    reticle.innerHTML = "<i></i><i></i><i></i><i></i>";
    tile.appendChild(reticle);

    var label = document.createElement("span");
    label.className = "app-card__label";
    label.textContent = app.label || app.title || "";

    card.appendChild(tile);
    card.appendChild(label);

    card.addEventListener("mouseenter", function () { Sound.hover(); showBubble(card, app); });
    card.addEventListener("mouseleave", hideBubble);
    card.addEventListener("focus", function () { showBubble(card, app); });
    card.addEventListener("blur", hideBubble);
    card.addEventListener("click", function () {
      hideBubble();
      Sound.select();
      if (typeof onSelect === "function") onSelect(app);
    });

    return card;
  }

  /* --------------------------------------------------------------------------
     DETAIL MODAL — one shared modal, populated per-item.
  -------------------------------------------------------------------------- */
  var modalEl = null;
  var lastFocused = null;

  function buildModal() {
    var overlay = document.createElement("div");
    overlay.className = "modal";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-hidden", "true");
    overlay.setAttribute("aria-labelledby", "modal-title");
    overlay.innerHTML =
      '<div class="modal__card">' +
        '<button class="modal__close" type="button" aria-label="Close">✕</button>' +
        '<div class="modal__head">' +
          '<div class="modal__icon" data-icon></div>' +
          "<div>" +
            '<div class="modal__type" data-type></div>' +
            '<h2 class="modal__title" id="modal-title" data-title></h2>' +
          "</div>" +
        "</div>" +
        '<p class="modal__desc" data-desc></p>' +
        '<div class="modal__images" data-images></div>' +
        '<div class="modal__tags" data-tags></div>' +
        '<div class="modal__links" data-links></div>' +
      "</div>";
    overlay.addEventListener("click", function (e) { if (e.target === overlay) closeDetail(); });
    overlay.querySelector(".modal__close").addEventListener("click", closeDetail);
    document.body.appendChild(overlay);
    return overlay;
  }

  function openDetail(app) {
    if (!modalEl) modalEl = buildModal();
    lastFocused = document.activeElement;

    modalEl.querySelector("[data-icon]").innerHTML = iconMarkup(app.icon || "❓");
    modalEl.querySelector("[data-type]").textContent = app.type || app.category || "Project";
    modalEl.querySelector("[data-title]").textContent = app.title || app.label;
    modalEl.querySelector("[data-desc]").textContent = app.description || "";

    var imgWrap = modalEl.querySelector("[data-images]");
    imgWrap.innerHTML = "";
    (app.images || []).forEach(function (im) {
      var src = typeof im === "string" ? im : (im && im.src);
      if (!src) return;
      var fig = document.createElement("figure");
      fig.className = "modal__figure";
      var img = document.createElement("img");
      img.src = src;
      img.alt = (im && im.caption) ? im.caption : ((app.title || app.label) + " image");
      img.loading = "lazy";
      fig.appendChild(img);
      if (im && im.caption) {
        var cap = document.createElement("figcaption");
        var text = escapeHtml(im.caption);
        if (im.link && im.linkText) {
          var lt = escapeHtml(im.linkText);
          text = text.replace(lt,
            '<a href="' + escapeHtml(im.link) + '" target="_blank" rel="noopener">' + lt + "</a>");
        }
        cap.innerHTML = text;
        fig.appendChild(cap);
      }
      imgWrap.appendChild(fig);
    });

    var tagWrap = modalEl.querySelector("[data-tags]");
    tagWrap.innerHTML = "";
    (app.tags || []).forEach(function (t) {
      var s = document.createElement("span");
      s.className = "tag";
      s.textContent = t;
      tagWrap.appendChild(s);
    });

    var linkWrap = modalEl.querySelector("[data-links]");
    linkWrap.innerHTML = "";
    var links = app.links || (app.link ? [{ label: "Open", url: app.link, icon: "🔗" }] : []);
    links.forEach(function (l) {
      var a = document.createElement("a");
      a.className = "btn";
      a.href = l.url || "#";
      a.innerHTML = (l.icon ? iconMarkup(l.icon) + " " : "") + escapeHtml(l.label);
      if (l.url && l.url.charAt(0) !== "#" && l.url.indexOf("mailto:") !== 0) {
        a.target = "_blank"; a.rel = "noopener";
      }
      linkWrap.appendChild(a);
    });

    modalEl.setAttribute("aria-hidden", "false");
    modalEl.classList.add("is-open");
    modalEl.querySelector(".modal__close").focus();
    document.addEventListener("keydown", onKeydown);
  }

  function closeDetail() {
    if (!modalEl) return;
    Sound.back();
    modalEl.classList.remove("is-open");
    modalEl.setAttribute("aria-hidden", "true");
    document.removeEventListener("keydown", onKeydown);
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }
  function onKeydown(e) { if (e.key === "Escape") closeDetail(); }
  function isModalOpen() { return modalEl && modalEl.classList.contains("is-open"); }

  /* --------------------------------------------------------------------------
     SHELL INIT — render nav + footer, then wire theme/sound/clock. Call once
     per page: UI.initShell("home" | "projects" | "experience" | "about" | "fun").
  -------------------------------------------------------------------------- */
  function initShell(activeKey) {
    renderNav(activeKey);
    renderFooter();
    initTheme();
    initSoundToggle();
    initClock();
  }

  window.UI = {
    data: DATA,
    Sound: Sound,
    escapeHtml: escapeHtml,
    iconMarkup: iconMarkup,
    makeIcon: makeIcon,
    isIconPath: isIconPath,
    renderAppCard: renderAppCard,
    openDetail: openDetail,
    closeDetail: closeDetail,
    isModalOpen: isModalOpen,
    initShell: initShell,
  };
})();

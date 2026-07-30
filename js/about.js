/* =============================================================================
   ABOUT PAGE (about.html)
   - expressive column: avatar, bio, fun facts
   - practical column: education, tech stack, contact links
   Depends on: data.js, ui.js
   ========================================================================== */
(function () {
  "use strict";

  var UI = window.UI;
  var DATA = UI.data;
  var esc = UI.escapeHtml;

  document.addEventListener("DOMContentLoaded", function () {
    UI.initShell("about");
    var p = DATA.profile || {};

    setText("[data-name]", p.name);
    setText("[data-title]", p.title);
    var locEl = document.querySelector("[data-location]");
    if (locEl) {
      locEl.innerHTML = p.location
        ? UI.iconMarkup("ui/about/pin_icon.svg") + " " + esc(p.location)
        : "";
    }
    setAvatar(document.querySelector("[data-avatar]"), p.avatar, p.name);

    // bio paragraphs
    var bio = document.querySelector("[data-bio]");
    if (bio) {
      (p.about || []).forEach(function (para) {
        var el = document.createElement("p");
        el.textContent = para;
        bio.appendChild(el);
      });
    }

    // fun facts
    fill("[data-funfacts]", (p.funFacts || []).map(function (f) {
      return "<li>" + esc(f) + "</li>";
    }).join(""));

    // education
    fill("[data-education]", (p.education || []).map(function (e) {
      return '<div class="edu">' +
        '<div class="edu__school">' + esc(e.school) + "</div>" +
        (e.detail ? '<div class="edu__detail">' + esc(e.detail) + "</div>" : "") +
        (e.dates ? '<div class="edu__dates">' + esc(e.dates) + "</div>" : "") +
        "</div>";
    }).join(""));

    // tech stack chips
    fill("[data-stack]", (p.stack || []).map(function (t) {
      return '<span class="tag">' + esc(t) + "</span>";
    }).join(""));

    buildContact();
    wireForm();
  });

  /* -- Get in touch: email + socials from DATA.links -- */
  function buildContact() {
    var links = DATA.links || [];
    var email = links.filter(function (l) { return (l.url || "").indexOf("mailto:") === 0; })[0];
    var socials = links.filter(function (l) { return (l.url || "").indexOf("mailto:") !== 0; });

    var emailEl = document.querySelector("[data-contact-email]");
    if (emailEl) {
      if (email) {
        emailEl.href = email.url;
        emailEl.innerHTML = UI.iconMarkup(email.icon || "✉️") + " " +
          esc(email.url.replace("mailto:", ""));
      } else {
        emailEl.style.display = "none";
      }
    }

    fill("[data-contact-socials]", socials.map(function (l) {
      var ext = l.url && l.url.charAt(0) !== "#";
      return '<a class="btn btn--ghost" href="' + esc(l.url || "#") + '"' +
        (ext ? ' target="_blank" rel="noopener"' : "") + ">" +
        (l.icon ? UI.iconMarkup(l.icon) + " " : "") + esc(l.label) + "</a>";
    }).join(""));
  }

  /* -- Formspree contact form (progressive enhancement) -- */
  function wireForm() {
    var form = document.querySelector("[data-contact-form]");
    if (!form) return;
    var statusEl = form.querySelector("[data-contact-status]");
    var submitBtn = form.querySelector("[data-contact-submit]");
    var endpoint = (DATA.contact && DATA.contact.formEndpoint) || "";
    var configured = endpoint && endpoint.indexOf("YOUR_FORM_ID") === -1;

    // keep the no-JS fallback working
    form.setAttribute("action", endpoint || "#");
    form.setAttribute("method", "POST");

    function setStatus(msg, kind) {
      if (!statusEl) return;
      statusEl.textContent = msg;
      statusEl.className = "contact__status" + (kind ? " is-" + kind : "");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (!configured) {
        setStatus("This form isn't connected yet — add your Formspree endpoint in data.js. Meanwhile, email me directly! 💌", "error");
        return;
      }
      UI.Sound.select();
      submitBtn.disabled = true;
      setStatus("Sending…", "");
      fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      }).then(function (res) {
        if (res.ok) {
          form.reset();
          setStatus("Thanks! Your message is on its way. 🎉", "ok");
        } else {
          setStatus("Hmm, something went wrong. Try again or email me directly.", "error");
        }
      }).catch(function () {
        setStatus("Network error — please try again or email me directly.", "error");
      }).then(function () { submitBtn.disabled = false; });
    });
  }

  /* helpers */
  function isImage(v) { return typeof v === "string" && /\.(png|jpe?g|gif|webp|svg)$/i.test(v); }
  function setAvatar(el, avatar, alt) {
    if (!el) return;
    if (isImage(avatar)) {
      el.innerHTML = "";
      var img = document.createElement("img");
      img.src = avatar; img.alt = alt || "avatar"; img.className = "avatar-img";
      el.appendChild(img);
    } else if (avatar) { el.textContent = avatar; }
  }
  function setText(sel, val) { var el = document.querySelector(sel); if (el) el.textContent = val || ""; }
  function fill(sel, html) { var el = document.querySelector(sel); if (el) el.innerHTML = html; }
})();

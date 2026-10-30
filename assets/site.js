// Plain static behaviour: mobile menu, consent checkbox, email-draft forms.
(function () {
  var header = document.querySelector("header");
  var btn = header && header.querySelector("button[aria-label='Open menu']");
  if (btn) {
    var links = header.querySelectorAll("nav[aria-label='Main'] a");
    var ctas = header.querySelectorAll("div.xl\\:flex > a");
    var panel = document.createElement("div");
    panel.className = "border-t bg-background px-5 pb-6 xl:hidden";
    panel.hidden = true;
    var nav = document.createElement("nav");
    nav.className = "flex flex-col py-3";
    nav.setAttribute("aria-label", "Mobile");
    links.forEach(function (a) { var c = a.cloneNode(true); c.className = "py-3 font-medium"; nav.appendChild(c); });
    var box = document.createElement("div");
    box.className = "flex flex-col gap-2";
    ctas.forEach(function (a) { box.appendChild(a.cloneNode(true)); });
    panel.appendChild(nav); panel.appendChild(box); header.appendChild(panel);
    var icons = btn.querySelectorAll("svg");
    btn.addEventListener("click", function () {
      var open = panel.hidden;
      panel.hidden = !open;
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      icons[0].classList.toggle("hidden", !open);
      icons[1].classList.toggle("hidden", open);
    });
  }
  document.querySelectorAll("button[role='checkbox']").forEach(function (cb) {
    cb.addEventListener("click", function () {
      var on = cb.getAttribute("aria-checked") !== "true";
      cb.setAttribute("aria-checked", String(on));
      cb.setAttribute("data-state", on ? "checked" : "unchecked");
      cb.textContent = on ? "\u2713" : "";
    });
  });
  function labelFor(el) {
    var l = el.id && document.querySelector("label[for='" + el.id + "']");
    return l ? l.textContent.replace(/\s*\(optional\)\s*/i, "").replace(/\*/g, "").trim() : el.name;
  }
  /*document.querySelectorAll("form").forEach(function (form) {
    var fields = form.querySelectorAll("input[name], select[name], textarea[name]");
    fields.forEach(function (el) {
      var l = el.id && document.querySelector("label[for='" + el.id + "']");
      if (l && !/optional/i.test(l.textContent) && el.type !== "hidden") el.required = true;
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var consent = form.querySelector("button[role='checkbox']");
      if (consent && consent.getAttribute("aria-checked") !== "true") {
        alert("Please check the consent box before continuing.");
        consent.focus();
        return;
      }
      var partner = !!form.querySelector("[name='businessName']");
      var subject = partner ? "Trewda partnership inquiry" : "Trewda website message";
      var body = [];
      fields.forEach(function (el) { if (el.value) body.push(labelFor(el) + ": " + el.value); });
      window.location.href = "mailto:support@trewda.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body.join("\n\n"));
    });
  });*/
})();

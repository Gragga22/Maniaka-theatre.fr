/* Compagnie Maniaka Théâtre — petits comportements du site */
(function () {
  "use strict";

  // ----- En-tête : fond plein après défilement -----
  var header = document.querySelector(".site-header");
  function onScroll() { header.classList.toggle("is-solid", window.scrollY > 40); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // ----- Menu mobile -----
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      header.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", open);
      toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        header.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ----- Menu : rubrique en cours surlignée -----
  var links = document.querySelectorAll(".nav a");
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(function (a) {
      var s = document.querySelector(a.getAttribute("href"));
      if (s) spy.observe(s);
    });
  }

  // ----- Agenda : masque les dates passées -----
  var today = new Date(); today.setHours(0, 0, 0, 0);
  var dates = document.querySelectorAll(".date[data-date]");
  var remaining = 0;
  var events = [];
  dates.forEach(function (li) {
    var d = new Date(li.getAttribute("data-date") + "T23:59:59");
    if (d < today) { li.remove(); return; }
    remaining++;
    var place = li.querySelector(".date-place strong");
    var city = li.querySelector(".date-place span");
    events.push({
      "@type": "TheaterEvent",
      "name": "Tant pis pour King Kong !",
      "startDate": li.getAttribute("data-date"),
      "eventStatus": "https://schema.org/EventScheduled",
      "location": { "@type": "Place", "name": place ? place.textContent : "", "address": city ? city.textContent : "" },
      "performer": { "@type": "Person", "name": "Audrey Boudon" },
      "organizer": { "@type": "TheaterGroup", "name": "Compagnie Maniaka Théâtre", "url": "https://www.maniaka-theatre.fr/" }
    });
  });
  var empty = document.querySelector(".dates-empty");
  if (empty && remaining === 0) empty.hidden = false;
  if (events.length) {
    var ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": events });
    document.head.appendChild(ld);
  }

  // ----- Bande-annonce : YouTube chargé seulement au clic -----
  document.querySelectorAll(".video[data-youtube]").forEach(function (box) {
    var btn = box.querySelector("button");
    btn.addEventListener("click", function () {
      var id = box.getAttribute("data-youtube");
      var iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
      iframe.title = "Bande-annonce de Tant pis pour King Kong !";
      iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      iframe.allowFullscreen = true;
      box.innerHTML = "";
      box.appendChild(iframe);
    });
  });

  // ----- Galerie : agrandissement des photos -----
  var lb = document.querySelector(".lightbox");
  var items = Array.prototype.slice.call(document.querySelectorAll(".gallery figure"));
  if (lb && items.length && typeof lb.showModal === "function") {
    var lbImg = document.createElement("img");
    lb.insertBefore(lbImg, lb.firstChild);
    var lbTxt = lb.querySelector("p");
    var current = 0;
    function show(i) {
      current = (i + items.length) % items.length;
      var img = items[current].querySelector("img");
      var cap = items[current].querySelector("figcaption");
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbTxt.textContent = img.alt + (cap ? " — " + cap.textContent : "");
    }
    items.forEach(function (fig, i) {
      fig.querySelector("button").addEventListener("click", function () { show(i); lb.showModal(); });
    });
    lb.querySelector(".lb-close").addEventListener("click", function () { lb.close(); });
    lb.querySelector(".lb-prev").addEventListener("click", function () { show(current - 1); });
    lb.querySelector(".lb-next").addEventListener("click", function () { show(current + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) lb.close(); });
    lb.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
  }

  // ----- Apparition douce au défilement -----
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // ----- Année du pied de page -----
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();

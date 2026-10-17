/* Compagnie Maniaka Théâtre — fond sonore
   Bandes son originales créées par Solo Gomez pour Tant pis pour King Kong !
   - Un des deux morceaux est choisi au hasard, puis ils s'enchaînent.
   - Les navigateurs interdisent le son avant que le visiteur ait cliqué ou touché la page :
     la musique démarre donc au premier clic, toucher ou touche du clavier.
   - Le bouton en bas à droite coupe ou remet le son ; le choix est mémorisé.
   - La musique se met en pause quand la bande-annonce est lancée ou quand l'onglet est caché. */
(function () {
  "use strict";

  var base = new URL("../sons/", document.currentScript.src).href;
  var tracks = [base + "gospel.mp3", base + "solo.mp3"];
  var VOLUME = 0.35;
  var KEY = "maniaka-son";

  function pref() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  var index = Math.floor(Math.random() * tracks.length);
  var audio = new Audio(tracks[index]);
  audio.preload = "none";
  audio.volume = 0;
  var wanted = pref() !== "off";   // le visiteur veut-il du son ?
  var started = false;

  // ----- bouton -----
  var css = document.createElement("style");
  css.textContent =
    ".son-btn{position:fixed;right:14px;bottom:14px;z-index:95;display:flex;align-items:center;gap:.5rem;" +
    "background:#f4f0e6;color:#13251a;border:1px solid rgba(0,0,0,.18);border-radius:99px;" +
    "padding:.55rem .95rem .5rem .75rem;font:600 .74rem/1 'Josefin Sans',sans-serif;letter-spacing:.1em;text-transform:uppercase;" +
    "cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.35);transition:background .2s}" +
    ".son-btn:hover{background:#ec5b6e;color:#fff}" +
    ".son-btn svg{width:20px;height:20px;flex:none}" +
    ".son-btn .eq{display:flex;align-items:flex-end;gap:2px;height:14px}" +
    ".son-btn .eq i{width:3px;background:#3b7a2a;height:30%;animation:son-eq 1s ease-in-out infinite}" +
    ".son-btn .eq i:nth-child(2){animation-delay:.25s}.son-btn .eq i:nth-child(3){animation-delay:.5s}" +
    ".son-btn.off .eq{display:none}.son-btn:not(.off) .mute{display:none}" +
    "@keyframes son-eq{50%{height:100%}}" +
    "@media (prefers-reduced-motion:reduce){.son-btn .eq i{animation:none;height:70%}}" +
    "@media (max-width:560px){.son-btn .lbl{display:none}.son-btn{padding:.6rem}}";
  document.head.appendChild(css);

  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "son-btn";
  btn.innerHTML =
    '<span class="eq" aria-hidden="true"><i></i><i></i><i></i></span>' +
    '<svg class="mute" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M11 5L6 9H3v6h3l5 4V5z"/><path d="M22 9l-6 6M16 9l6 6"/></svg>' +
    '<span class="lbl"></span>';
  document.body.appendChild(btn);

  function render() {
    var playing = wanted && started && !audio.paused;
    btn.classList.toggle("off", !playing);
    btn.querySelector(".lbl").textContent = playing ? "Couper le son" : "Écouter";
    btn.setAttribute("aria-label", playing ? "Couper la musique" : "Écouter la musique");
    btn.setAttribute("aria-pressed", playing ? "true" : "false");
    btn.title = "Musique originale du spectacle : Solo Gomez";
  }

  // ----- fondus -----
  var fadeTimer;
  function fadeTo(target, done) {
    clearInterval(fadeTimer);
    fadeTimer = setInterval(function () {
      var v = audio.volume + (target > audio.volume ? 0.02 : -0.03);
      if ((target > audio.volume && v >= target) || (target <= audio.volume && v <= target)) {
        audio.volume = Math.max(0, Math.min(1, target)); clearInterval(fadeTimer); if (done) done(); return;
      }
      audio.volume = Math.max(0, Math.min(1, v));
    }, 60);
  }

  function play() {
    started = true;
    var p = audio.play();
    if (p && p.then) p.then(function () { fadeTo(VOLUME); render(); }).catch(function () {
      // refusé par le navigateur : on réessaiera au prochain geste du visiteur
      started = false; arm(); render();
    });
    else { fadeTo(VOLUME); render(); }
  }
  function pause() { fadeTo(0, function () { audio.pause(); render(); }); }

  // un morceau terminé : on passe à l'autre
  audio.addEventListener("ended", function () {
    index = (index + 1) % tracks.length;
    audio.src = tracks[index];
    if (wanted) audio.play().catch(function () {});
  });
  audio.addEventListener("play", render);
  audio.addEventListener("pause", render);

  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    var playing = started && !audio.paused;
    if (playing) { wanted = false; save("off"); pause(); }
    else { wanted = true; save("on"); play(); }
  });

  // premier geste du visiteur : on lance la musique (s'il ne l'a pas coupée lors d'une visite précédente)
  function firstGesture(e) {
    if (e.target && e.target.closest && e.target.closest(".son-btn")) return;
    ["pointerdown", "keydown", "touchstart"].forEach(function (t) { removeEventListener(t, firstGesture, true); });
    if (wanted && !started) play();
  }
  function arm() { ["pointerdown", "keydown", "touchstart"].forEach(function (t) { addEventListener(t, firstGesture, true); }); }
  arm();

  // bande-annonce lancée : on coupe la musique
  document.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest(".video button")) { if (started && !audio.paused) pause(); }
  }, true);

  // onglet caché : pause ; revenu : reprise
  var hiddenWhilePlaying = false;
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) { hiddenWhilePlaying = started && !audio.paused; if (hiddenWhilePlaying) audio.pause(); }
    else if (hiddenWhilePlaying && wanted) { audio.play().catch(function () {}); }
  });

  render();
})();

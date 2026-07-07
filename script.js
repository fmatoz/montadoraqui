(function () {
  "use strict";

  var WA_NUMBER = "5511949393926";

  function buildWaUrl(message) {
    return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(message);
  }

  // Countdown até meia-noite
  var hEl = document.getElementById("cd-h");
  var mEl = document.getElementById("cd-m");
  var sEl = document.getElementById("cd-s");

  function pad(n) { return n < 10 ? "0" + n : "" + n; }

  function tick() {
    var now = new Date();
    var midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    var diff = Math.max(0, midnight - now);
    var h = Math.floor(diff / 3600000);
    var m = Math.floor((diff % 3600000) / 60000);
    var s = Math.floor((diff % 60000) / 1000);
    if (hEl) hEl.textContent = pad(h);
    if (mEl) mEl.textContent = pad(m);
    if (sEl) sEl.textContent = pad(s);
  }
  tick();
  setInterval(tick, 1000);

  // Modal
  var modal = document.getElementById("modal");
  var fab = document.getElementById("fab-wa");
  var form = document.getElementById("wa-form");

  function openModal() {
    if (!modal) return;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    if (fab) fab.classList.add("is-hidden");
    var first = modal.querySelector("input, textarea");
    if (first) setTimeout(function () { first.focus(); }, 50);
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = "";
    if (fab) fab.classList.remove("is-hidden");
  }

  document.querySelectorAll("[data-open-modal]").forEach(function (btn) {
    btn.addEventListener("click", openModal);
  });
  document.querySelectorAll("[data-close-modal]").forEach(function (btn) {
    btn.addEventListener("click", closeModal);
  });
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && !modal.hidden) closeModal();
  });

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var nome = (data.get("nome") || "").toString().trim();
      var area = (data.get("area") || "").toString().trim();
      var need = (data.get("need") || "").toString().trim();
      if (!nome || !area || !need) return;
      var msg =
        "Olá, vim pelo site da 10 Anos Montando Sonhos.\n" +
        "Meu nome é: " + nome + "\n" +
        "Estou na região/bairro: " + area + "\n" +
        "Preciso de: " + need + "\n" +
        "Gostaria de solicitar um orçamento/agendamento.";
      window.open(buildWaUrl(msg), "_blank", "noopener,noreferrer");
      form.reset();
      closeModal();
    });
  }
})();

// Gamified feedback while answering the quiz. Loaded after script.js and wraps its globals.
(function () {
  var card = document.querySelector(".quiz-container");
  var next = document.querySelector(".next");

  // question counter next to the progress bar
  var count = document.createElement("span");
  count.className = "q-count";
  var progress = document.querySelector(".progress");
  progress.parentNode.insertBefore(count, progress.nextSibling);

  function restartAnim(el, cls) {
    el.classList.remove(cls);
    void el.offsetWidth; // restart the animation
    el.classList.add(cls);
  }

  function toast(text) {
    var t = document.createElement("div");
    t.className = "q-toast";
    t.textContent = text;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 2300);
  }

  // stages follow the background changes already baked into the questions
  var stages = [];
  questions.forEach(function (q) { if (stages.indexOf(q.background) === -1) stages.push(q.background); });
  var shown = currentQuestion;

  var generate = generateQuestions;
  window.generateQuestions = function (index) {
    generate(index);
    count.textContent = (index + 1) + " / " + totalQuestions;
    // rotate through card layouts so consecutive questions never look the same
    var LAYOUTS = [0, 3, 1, 5, 2, 4];
    card.classList.remove("l0", "l1", "l2", "l3", "l4", "l5");
    card.classList.add("l" + LAYOUTS[index % LAYOUTS.length]);
    restartAnim(card, "q-anim");
    if (layer.classList.contains("on")) renderBg(index);

    if (index > shown) {
      var stage = stages.indexOf(questions[index].background);
      if (stage !== stages.indexOf(questions[index - 1].background)) {
        toast("Stage " + (stage + 1) + " / " + stages.length + " unlocked!");
      } else if (index === totalQuestions - 1) {
        toast("Final question!");
      } else if (index === Math.floor(totalQuestions / 2)) {
        toast("Halfway there!");
      }
    }
    shown = index;
  };
  count.textContent = (currentQuestion + 1) + " / " + totalQuestions;

  // ---------- per-question pattern background ----------
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var layer = document.createElement("div");
  layer.id = "quiz-bg";
  document.body.insertBefore(layer, document.body.firstChild);
  var pool = null;
  var current = [];
  var MOTIONS = { big: ["qb-float", "qb-bounce", "qb-sway"], icon: ["qb-float", "qb-sway", "qb-wiggle", "qb-bounce", "qb-drift"], squiggle: ["qb-drift", "qb-float", "qb-spin"] };
  fetch("quizbg/icons.json").then(function (r) { return r.json(); }).then(function (list) {
    pool = { big: [], icon: [], squiggle: [] };
    list.forEach(function (ic) { pool[ic.kind].push(ic); });
    if (layer.classList.contains("on")) renderBg(currentQuestion);
  });

  // small seeded RNG so each question always gets the same pattern
  function rng(seed) {
    return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  }

  function renderBg(index) {
    // one mood: dusty teal/blue, hue and lightness shift a little per question
    var hue = 176 + ((index * 7) % totalQuestions) / (totalQuestions - 1) * 38;
    layer.style.backgroundColor = "hsl(" + hue.toFixed(0) + ", " + (34 + (index % 3) * 3) + "%, " + (40 + (index % 4) * 2) + "%)";
    if (!pool) return;

    current.forEach(function (el) {
      el.classList.add("leave");
      setTimeout(function () { el.remove(); }, 500);
    });
    current = [];

    var rand = rng(index * 977 + 13);
    var vw = innerWidth, vh = innerHeight;
    var small = vw < 700;
    var k = Math.max(small ? 0.42 : 0.5, Math.min(vw / 1920, vh / 1080));
    var plan = small ? { big: 1, icon: 6, squiggle: 12 } : { big: 2, icon: 7, squiggle: 16 };
    var placed = [];
    ["big", "icon", "squiggle"].forEach(function (kind) {
      var list = pool[kind].slice();
      for (var n = 0; n < plan[kind] && list.length; n++) {
        var ic = list.splice(Math.floor(rand() * list.length), 1)[0]; // no repeats within a question
        var w = ic.w * k, h = ic.h * k, x, y, tries = 0;
        // keep icons out of the card area on wide screens and away from each other
        do {
          x = rand() * (vw - w);
          y = 70 + rand() * (vh - 150 - h);
          // phones: the card fills the middle, so use the bands above and below it
          if (small && kind !== "squiggle") y = rand() < 0.5 ? 60 + rand() * Math.max(vh * 0.22 - h, 0) : vh * 0.68 + rand() * Math.max(vh * 0.32 - 100 - h, 0);
          var cx = (x + w / 2) / vw, cy = (y + h / 2) / vh;
          var inCard = !small && kind !== "squiggle" && cx > 0.28 && cx < 0.72 && cy > 0.12 && cy < 0.88;
          var clash = placed.some(function (p) { return Math.abs(p.x - x) < (p.w + w) / 2 && Math.abs(p.y - y) < (p.h + h) / 2; });
        } while ((inCard || clash) && ++tries < 40);
        placed.push({ x: x, y: y, w: w, h: h });

        var el = document.createElement("div");
        el.className = "qb enter";
        el.style.left = x + "px";
        el.style.top = y + "px";
        el.style.width = w + "px";
        var img = new Image();
        img.src = "quizbg/" + ic.src;
        img.alt = "";
        var motions = MOTIONS[kind];
        img.style.setProperty("--a", motions[Math.floor(rand() * motions.length)]);
        img.style.setProperty("--d", (kind === "squiggle" && rand() < 0.3 ? 14 : 3 + rand() * 5).toFixed(1) + "s");
        img.style.setProperty("--delay", (-rand() * 6).toFixed(1) + "s");
        el.appendChild(img);
        layer.appendChild(el);
        current.push(el);
        (function (el, i) {
          setTimeout(function () { el.classList.remove("enter"); }, reduced ? 0 : 150 + i * 35);
        })(el, current.length);
      }
    });
  }

  document.querySelector(".start_btn").addEventListener("click", function () {
    var welcome = document.getElementById("welcome-bg");
    if (welcome) welcome.classList.add("gone");
    layer.classList.add("on");
    renderBg(currentQuestion);
  });

  // tap feedback on answers
  document.querySelectorAll(".quiz-container .option").forEach(function (opt) {
    opt.addEventListener("click", function () { restartAnim(opt, "tapped"); });
  });

  // document capture phase: runs before script.js's own next handler, while the answer is still checked
  document.addEventListener("click", function (e) {
    if (!next.contains(e.target)) return;
    if (!document.querySelector('input[type="radio"]:checked')) {
      restartAnim(card, "shake");
      return;
    }
    var r = next.getBoundingClientRect();
    var xp = document.createElement("span");
    xp.className = "xp-float";
    xp.textContent = "+1";
    xp.style.left = r.left + r.width / 2 + "px";
    xp.style.top = r.top - 10 + "px";
    document.body.appendChild(xp);
    setTimeout(function () { xp.remove(); }, 1000);
  }, true);
})();

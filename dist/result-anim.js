// Shared gamified animations for result pages h1-h5. Loaded after each page's script.js.
(function () {
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // the CSS overlay leaves ~2s after first paint; time everything from page load, not script load
  var REVEAL_AT = 2000;
  function after(ms, fn) { setTimeout(fn, Math.max(0, ms - performance.now())); }

  // which persona is this page? h1..h5 matches the 1-5 prefix on the persona images
  var level = parseInt((location.pathname.match(/\/h([1-5])\//) || [])[1], 10) || 1;
  var TOTAL = 5;

  // ---------- collection (persists across retakes) ----------
  var collected = [];
  try { collected = JSON.parse(localStorage.getItem("taop-collected")) || []; } catch (e) {}
  var isNew = collected.indexOf(level) === -1;
  if (isNew) collected.push(level);
  try { localStorage.setItem("taop-collected", JSON.stringify(collected)); } catch (e) {}

  // ---------- hero extras: unlock badge + level meter ----------
  var hero = document.querySelector(".result_h1");
  var badge = document.createElement("div");
  badge.className = "unlock-badge" + (isNew ? "" : " seen");
  badge.innerHTML = isNew ? "<b>★</b> New type unlocked!" : "<b>✓</b> Already in your collection";
  hero.insertBefore(badge, hero.firstChild);

  var pctEl = document.querySelector(".percentage");
  var meter = document.createElement("div");
  meter.className = "meter";
  meter.innerHTML = '<div class="meter-segs">' + "<span></span>".repeat(TOTAL) + "</div>" +
    '<div class="meter-labels"><span>Level ' + level + "/" + TOTAL + "</span><span>Procrastination meter</span></div>";
  pctEl.parentNode.insertBefore(meter, pctEl.nextSibling);

  // negative delays are fine: a late script just joins the stagger mid-way
  var now = performance.now();
  Array.prototype.forEach.call(hero.children, function (el, i) {
    el.style.animationDelay = (REVEAL_AT + 100 + i * 150 - now) / 1000 + "s";
  });

  var restartLink = document.querySelector(".restart a");
  if (restartLink && collected.length < TOTAL) restartLink.textContent = "Play again";

  // ---------- collection cards ----------
  var cards = document.querySelectorAll(".personastype");
  cards.forEach(function (card) {
    var n = parseInt(card.querySelector("img").getAttribute("src"), 10);
    var have = collected.indexOf(n) !== -1;
    card.classList.toggle("locked", !have);
    var tag = document.createElement("span");
    tag.className = "card-tag";
    tag.textContent = have ? "✓ Collected" : "🔒 Locked";
    card.appendChild(tag);
  });
  var header = document.querySelector(".morepersonas_header h1");
  if (header) {
    header.textContent = "Collect all procrastinator types";
    var count = document.createElement("span");
    count.className = "collection-count";
    count.textContent = collected.length + " / " + TOTAL + " collected" +
      (collected.length < TOTAL ? " — play again to unlock more" : " — you caught 'em all!");
    var bar = document.createElement("span");
    bar.className = "collection-bar";
    bar.innerHTML = "<i></i>";
    header.appendChild(count);
    header.appendChild(bar);
  }

  // ---------- reveal sequence ----------
  var segs = meter.querySelectorAll(".meter-segs span");
  var pct = pctEl.querySelector("b");
  var target = parseInt(pct.textContent, 10);

  function fillMeter() {
    var start = null, duration = 250 * level + 400;
    pct.textContent = "0%";
    function tick(t) {
      if (start === null) start = t;
      var p = Math.min((t - start) / duration, 1);
      pct.textContent = Math.round(target * p) + "%";
      segs.forEach(function (s, i) { if (p * level >= i + 1 - 0.01) s.classList.add("on"); });
      if (p < 1) requestAnimationFrame(tick);
      else if (isNew) confetti();
    }
    requestAnimationFrame(tick);
  }

  if (reduced) {
    segs.forEach(function (s, i) { if (i < level) s.classList.add("on"); });
  } else {
    pct.textContent = "0%";
    after(REVEAL_AT + 900, fillMeter);
  }

  // ---------- confetti (no library) ----------
  function confetti() {
    var c = document.createElement("canvas");
    c.id = "confetti";
    document.body.appendChild(c);
    var ctx = c.getContext("2d");
    var dpr = window.devicePixelRatio || 1;
    c.width = innerWidth * dpr;
    c.height = innerHeight * dpr;
    ctx.scale(dpr, dpr);
    var colors = ["#3C8196", "#78BEB6", "#A2D1DD", "#F5C24C", "#6CC198"];
    var parts = [];
    for (var i = 0; i < 160; i++) {
      parts.push({
        x: innerWidth / 2, y: innerHeight / 3,
        vx: (Math.random() - 0.5) * 16, vy: Math.random() * -14 - 4,
        s: Math.random() * 6 + 4, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4,
        c: colors[i % colors.length]
      });
    }
    var t0 = performance.now();
    (function frame(t) {
      var age = t - t0;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      ctx.globalAlpha = Math.max(0, 1 - age / 3000);
      parts.forEach(function (p) {
        p.vy += 0.35; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
        ctx.restore();
      });
      if (age < 3000) requestAnimationFrame(frame); else c.remove();
    })(t0);
  }

  // ---------- 10 steps art: rebuild each png as base + animated props ----------
  if (!reduced && window.fetch) {
    fetch("../steps/props.json").then(function (r) { return r.json(); }).then(function (meta) {
      document.querySelectorAll(".ImageSlides img").forEach(function (img) {
        var n = parseInt((img.getAttribute("src").match(/(\d+)\.png$/) || [])[1], 10);
        if (!meta[n]) return;
        var pad = n < 10 ? "0" + n : "" + n;
        var scene = document.createElement("div");
        scene.className = "step-scene";
        var base = new Image();
        base.src = "../steps/" + pad + "-base.png";
        base.alt = img.alt;
        scene.appendChild(base);
        meta[n].forEach(function (p, i) {
          var el = new Image();
          el.src = "../steps/" + p.src;
          el.alt = "";
          el.className = "prop anim-" + p.anim;
          el.style.left = p.x + "%";
          el.style.top = p.y + "%";
          el.style.width = p.w + "%";
          el.style.animationDelay = (p.anim === "blink" ? 0 : i * 0.3) + "s";
          scene.appendChild(el);
        });
        // swap only once the base has loaded so the slide never flashes empty
        base.onload = function () { img.replaceWith(scene); };
      });
    });
  }

  // ---------- persona cards: play that persona's lottie on hover ----------
  // h1 ships its comp under a different name; lottie resolves images/ relative to the json
  function lottiePath(n) { return "../h" + n + "/" + (n === 1 ? "steadyrandy_comp.json" : "data.json"); }

  function loadCardAnim(card) {
    if (card._anim || typeof bodymovin === "undefined") return;
    var img = card.querySelector("img");
    var box = document.createElement("div");
    box.className = "card-anim";
    card.appendChild(box);
    var place = function () {
      box.style.left = img.offsetLeft + "px";
      box.style.top = img.offsetTop + "px";
      box.style.width = img.offsetWidth + "px";
      box.style.height = img.offsetHeight + "px";
    };
    place();
    card._place = place;
    card._anim = bodymovin.loadAnimation({
      container: box, renderer: "svg", loop: true, autoplay: false,
      path: lottiePath(parseInt(img.getAttribute("src"), 10))
    });
    card._anim.addEventListener("DOMLoaded", function () {
      box.classList.add("ready");
      card.classList.add("has-anim");
      if (card.matches(":hover")) card._anim.play();
    });
  }

  if (!reduced) {
    cards.forEach(function (card) {
      card.addEventListener("pointerenter", function () {
        loadCardAnim(card);
        card._place();
        card._anim.play();
      });
      card.addEventListener("pointerleave", function () { if (card._anim) card._anim.pause(); });
    });
    // preload once the collection scrolls near, so the first hover doesn't wait on the network
    if ("IntersectionObserver" in window) {
      var pre = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        pre.disconnect();
        cards.forEach(loadCardAnim);
      }, { rootMargin: "300px" });
      pre.observe(document.querySelector(".morepersonas"));
    }
    window.addEventListener("resize", function () {
      cards.forEach(function (c) { if (c._place) c._place(); });
    });
  }

  // ---------- reveal sections on scroll ----------
  var targets = document.querySelectorAll(
    ".overcome_copy .p1, .overcome_copy h1, .overcome_container, .morepersonas_header, .personastype, .visit-store_header, .visit-store_end"
  );
  if ("IntersectionObserver" in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        io.unobserve(e.target);
        var fill = e.target.querySelector(".collection-bar i");
        if (fill) fill.style.width = (collected.length / TOTAL) * 100 + "%";
        // drop the stagger delay afterwards so hover stays snappy
        setTimeout(function () { e.target.style.transitionDelay = ""; }, 1500);
      });
    }, { threshold: 0.15 });
    cards.forEach(function (el, i) { el.style.transitionDelay = i * 0.12 + "s"; });
    targets.forEach(function (el) {
      el.classList.add("reveal");
      io.observe(el);
    });
  } else {
    var fill = document.querySelector(".collection-bar i");
    if (fill) fill.style.width = (collected.length / TOTAL) * 100 + "%";
  }

  // ---------- tips slider: animate each slide in and auto-advance ----------
  if (typeof showSlides !== "function" || reduced) return;
  var show = showSlides;
  window.showSlides = function (n) {
    show(n);
    document.querySelectorAll(".mySlides, .ImageSlides").forEach(function (el) {
      if (el.style.display !== "block") return;
      el.classList.remove("slide-in");
      void el.offsetWidth; // restart the animation
      el.classList.add("slide-in");
    });
  };

  var overcome = document.querySelector(".overcome");
  var paused = false, visible = false, timer;
  var restart = function () {
    clearInterval(timer);
    timer = setInterval(function () {
      if (!paused && visible && !document.hidden) plusSlides(1);
    }, 6000);
  };
  overcome.addEventListener("mouseenter", function () { paused = true; });
  overcome.addEventListener("mouseleave", function () { paused = false; });
  // manual navigation resets the countdown
  document.querySelector(".dot-container").addEventListener("click", restart);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
    }, { threshold: 0.3 }).observe(overcome);
  } else {
    visible = true;
  }
  restart();
})();

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
    restartAnim(card, "q-anim");

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

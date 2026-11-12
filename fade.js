(function () {
  var nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) return;

  var reduce = false;
  try {
    reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) {}

  function showAll() {
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].classList.add("is-in");
    }
  }

  if (reduce || !("IntersectionObserver" in window)) {
    showAll();
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  for (var i = 0; i < nodes.length; i++) {
    io.observe(nodes[i]);
  }

  window.setTimeout(showAll, 1800);
})();

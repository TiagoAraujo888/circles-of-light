(function () {
  var reflections = [
    "What is quietly present in you just now — not the story you might tell, but the feeling itself?",
    "If you like, can you let this moment be enough?",
    "Is there a sincere wish in you to be met by love — not to become someone else, but to be received as you are?",
    "Divine Love does not ask you to become someone else. You are welcome here, as you are.",
    "What would it feel like to rest, even for one breath, without fixing anything?",
    "Honesty, met with kindness, can be a quiet path toward truth.",
    "Can you notice your body, just as it is, in this moment?",
    "You do not have to have the answer. An open, respectful heart is enough.",
    "If it feels right, you might open, softly, to Divine Love — not as something to reach for, but as a presence already here.",
    "What in you is asking to be received, rather than solved?",
    "Growth through love is often quiet, and it can begin with simple honesty.",
    "Take one slow breath, if you like. There is nothing to do, and nothing to fix."
  ];

  var nodes = document.querySelectorAll("[data-reflection]");
  if (!nodes.length) return;
  var pick = reflections[Math.floor(Math.random() * reflections.length)];
  nodes.forEach(function (el) {
    var p = el.querySelector("p") || el.appendChild(document.createElement("p"));
    p.textContent = pick;
  });
})();

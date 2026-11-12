(function () {
  var langs = window.COL_LANGUAGES || [];
  var navs = document.querySelectorAll("[data-lang-switcher]");
  if (!navs.length || !langs.length) return;

  var parts = location.pathname.split("/").filter(Boolean);
  var currentFolder = parts[0] || "en";
  var rest = parts.slice(1).join("/");
  if (!rest || rest === "index.html") rest = "";

  navs.forEach(function (nav) {
    nav.innerHTML = "";
    langs.forEach(function (lang) {
      var a = document.createElement("a");
      a.href = rest ? "/" + lang.folder + "/" + rest : "/" + lang.folder + "/";
      a.lang = lang.code;
      a.hreflang = lang.code;
      a.dir = lang.dir;
      a.textContent = lang.name;
      if (lang.folder === currentFolder) a.setAttribute("aria-current", "true");
      nav.appendChild(a);
    });
  });
})();

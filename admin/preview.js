/* global CMS, h */
CMS.registerPreviewStyle("/styles.css");

function text(entry, path) {
  return entry.getIn(["data"].concat(path.split(".")));
}

function lines(value) {
  if (!value) return [];
  if (typeof value.toJS === "function") value = value.toJS();
  if (Array.isArray(value)) return value;
  return [String(value)];
}

function pagePreview(props) {
  var entry = props.entry;
  var heading = text(entry, "heading") || text(entry, "seo_title") || "";
  var intro = text(entry, "intro") || text(entry, "body") || text(entry, "meta_description") || "";
  var children = [
    h("a", { className: "skip-link", href: "#content" }, "Skip to content"),
    h("header", { className: "site-header" },
      h("a", { className: "wordmark", href: "/en/" }, "Circles of Light")
    ),
    h("main", { id: "content" },
      h("section", { className: "section" },
        h("div", { className: "wrap" },
          heading ? h("h1", {}, String(heading)) : null,
          lines(intro).map(function (para, i) {
            if (para && typeof para === "object") return null;
            return h("p", { key: i }, String(para));
          })
        )
      )
    )
  ];
  return h("div", {}, children);
}

function heroPreview(props) {
  var entry = props.entry;
  return h("div", {},
    h("section", { className: "hero headline", "aria-labelledby": "site-headline" },
      h("div", { className: "wrap" },
        h("div", { className: "breath", "aria-hidden": "true" },
          h("div", { className: "breath-circle" })
        ),
        h("span", { className: "eyebrow" }, String(text(entry, "eyebrow") || "")),
        h("h1", { id: "site-headline" }, String(text(entry, "headline") || "")),
        h("p", {}, String(text(entry, "intro") || ""))
      )
    )
  );
}

function simplePreview(headingPath, bodyPath) {
  return function (props) {
    var entry = props.entry;
    return h("div", { className: "section" },
      h("div", { className: "wrap" },
        h("h2", {}, String(text(entry, headingPath) || "")),
        h("p", {}, String(text(entry, bodyPath) || ""))
      )
    );
  };
}

CMS.registerPreviewTemplate("home", pagePreview);
CMS.registerPreviewTemplate("circle", pagePreview);
CMS.registerPreviewTemplate("reflect", pagePreview);
CMS.registerPreviewTemplate("about", pagePreview);
CMS.registerPreviewTemplate("one-to-one", pagePreview);
CMS.registerPreviewTemplate("questions-page", pagePreview);
CMS.registerPreviewTemplate("contact", pagePreview);
CMS.registerPreviewTemplate("thanks", pagePreview);
CMS.registerPreviewTemplate("privacy", pagePreview);
CMS.registerPreviewTemplate("hero", heroPreview);
CMS.registerPreviewTemplate("questions", simplePreview("question", "answer"));
CMS.registerPreviewTemplate("reflections", simplePreview("text", "text"));
CMS.registerPreviewTemplate("letters", function (props) {
  var entry = props.entry;
  var body = props.widgetFor("body");
  return h("div", { className: "section" },
    h("div", { className: "wrap" },
      h("h1", {}, String(text(entry, "title") || "")),
      body
    )
  );
});

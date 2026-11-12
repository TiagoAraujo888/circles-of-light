import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import yaml from "js-yaml";

const contentRoot = path.join(process.cwd(), "content");
const locale = "en";

function readFile(rel) {
  return fs.readFileSync(path.join(contentRoot, rel), "utf8");
}

function loadYaml(rel) {
  return yaml.load(readFile(rel));
}

function loadMdDir(rel) {
  const dir = path.join(contentRoot, rel);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".md") || name.endsWith(".yml") || name.endsWith(".yaml"))
    .sort()
    .map((name) => {
      const raw = fs.readFileSync(path.join(dir, name), "utf8");
      if (name.endsWith(".yml") || name.endsWith(".yaml")) {
        const data = yaml.load(raw) || {};
        return { slug: name.replace(/\.(yml|yaml)$/, ""), ...data };
      }
      const parsed = matter(raw);
      return {
        slug: name.replace(/\.md$/, ""),
        ...parsed.data,
        body: (parsed.content || "").trim(),
      };
    })
    .sort((a, b) => {
      const ao = Number.isFinite(a.order) ? a.order : 999;
      const bo = Number.isFinite(b.order) ? b.order : 999;
      if (ao !== bo) return ao - bo;
      return String(a.slug).localeCompare(String(b.slug));
    });
}

function loadYamlDirSingle(rel) {
  const items = loadMdDir(rel);
  return items[0] || {};
}

const pages = Object.fromEntries(loadMdDir(`pages/${locale}`).map((page) => [page.slug, page]));

const site = loadYaml(`site/${locale}/site.yml`);
const thanksPath = site.thanks_href || "/en/thanks.html";
const formHost = String(site.site_url || "https://circlesoflight.netlify.app").replace(/\/$/, "");
// On Cloudflare Pages, Netlify Forms are not available, so the forms post
// absolutely to the Netlify site. On Netlify (and local) builds the action stays relative.
site.form_action =
  process.env.CF_PAGES === "1" && !/^https?:\/\//i.test(thanksPath)
    ? formHost + thanksPath
    : thanksPath;

export default {
  locale,
  pages,
  hero: loadYaml(`hero/${locale}/hero.yml`),
  questions: loadMdDir(`questions/${locale}`),
  reflections: loadMdDir(`reflections/${locale}`),
  reflectionTexts: loadMdDir(`reflections/${locale}`).map((item) => item.text),
  photos: loadYaml(`photos/${locale}/photos.yml`),
  site,
};

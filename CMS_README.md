# Circles of Light — how to edit the site

This is a quiet back office for the Circles of Light website. You can change the words, questions, reflections and photographs here, then look at a preview before anything goes public.

The public website stays hidden from search engines until you approve a launch.

## How to log in

1. Go to [circlesoflight.netlify.app/admin/](https://circlesoflight.netlify.app/admin/).
2. Choose to log in with GitHub. The site uses your GitHub account, through Netlify.
3. Use the GitHub account that owns the `circles-of-light` repository.

Only someone with access to that repository can edit. If the login page asks you to allow access, that is expected the first time.

## What you can edit

The left-hand menu uses plain names:

- **Pages** — the words on Home, What is a Circle, Pause and Reflect, About, Questions, Stay in touch, Thank you, and Privacy.
- **Hero** — the opening question, the pause, and the three opening lines on the home page.
- **Questions** — the questions and answers on the Questions page. You can add a new one, or change the order.
- **Reflections** — the short rotating reflections on Home and Pause and Reflect. One is chosen at random when a visitor arrives.
- **Photos** — the photographs and the short description under each one. New pictures you add are stored in `img/uploads`. The pictures already on the site stay where they are.
- **Site words** — the menu, the footer, the letter signup lines, the complementary care line, and the email and WhatsApp details.
- **Reflection letters** — a place to write letters for later. See below.

## How Save, preview and Publish work

Nothing you type is live until you press **Publish**.

1. Open the page or item you want to change.
2. Edit the words.
3. Press **Save**. This keeps a draft. The public website does not change yet.
4. Look at the preview on the right. It uses the same look as the website, so you can see how the words sit on the page.
5. When you are happy, press **Publish**. The change is saved to GitHub, and the website updates itself after a short build (usually a minute or two).

If you leave a draft and come back later, it will still be waiting. You can also discard a draft if you change your mind.

## How to add a letter

The reflection letters are stored here only. They are **not emailed**, and they **do not appear on the public website**, until you decide that later.

1. Open **Reflection letters**.
2. Choose **New**.
3. Add a title, a date, and the letter itself.
4. Leave the status as **draft** until you are ready. You can later mark it **ready** when the wording feels finished.
5. Press **Save**, then **Publish** if you want it safely stored. Even then, visitors will not see it, and no email is sent.

## How to add a language later

The site is English-only for now. When you are ready to add another language, this is the path:

Planned languages, in waves: Portuguese, Spanish and French first; then German, Dutch, Italian, Greek, Norwegian, Finnish, Swedish and Danish; then Chinese, Hindi, Arabic (right-to-left), Russian, Japanese, Bengali, Indonesian, Turkish and Korean.

1. In `admin/config.yml`, add the new language code to the list of locales (for example `pt`).
2. Questions, Reflections, letters, the Hero, Photos and Site words already use a folder for each language, so a Portuguese copy can live in a `pt` folder beside `en`.
3. For Pages, copy each English file from `content/pages/en/` to `content/pages/pt/` and add those new files to the Pages list in `admin/config.yml`.
4. Translate in your own gentle voice, not word for word. Portuguese should be formal European Portuguese.
5. Turn the language on in `languages.js` so it appears in the header. Form pages in the new language should send people to that language's thank-you page.
6. Keep the site hidden from search engines until you approve the public launch.

English currently lives at `/en/`. When translations begin, English can later move to the main address, with other languages in their own folders. That change can wait until you are ready.


## Second host (Cloudflare Pages)

The same build can also be published to Cloudflare Pages, as a second, free host, while the site stays hidden from search. In the Cloudflare Pages project settings use:

- Build command: `npm run build`
- Output directory: `_site`
- Environment variable: `NODE_VERSION` = `22`

Cloudflare sets `CF_PAGES=1` on its builds. When that is present, the “alive” and “reflections” forms keep the same form names, field names and honeypot, and post to the Netlify site at `https://circlesoflight.netlify.app` (for example `https://circlesoflight.netlify.app/en/thanks.html`), so messages still arrive by the usual form notifications. On Netlify, and when you build on your own computer, the form actions stay as relative addresses, as they do now. There is no JavaScript form submit to keep in step with this; the forms post in the ordinary way.

A `_headers` file adds `X-Robots-Tag: noindex, nofollow` on every path. A `_redirects` file sends `/` to `/en/` and `/en` to `/en/`, as a temporary 302. On Cloudflare, those redirects are followed even if a file is also present, so the small “Continue to Circles of Light” page at the bare address does not block the redirect. That page is still there as a gentle fallback if someone opens the files without the redirects.

## A few things this back office does not change

These stay in the website's code, so they are not edited from `/admin`:

- the look of the site (colours, fonts and layout)
- the hidden names of the form fields, which the mail service needs in order to deliver messages
- the list of languages in the header, until a language is turned on as above
- the small “Continue to Circles of Light” page at the bare website address

The audio player on Pause and Reflect appears only when you turn **Audio is ready** on, after the recording is in place.

## If something does not look right

You can preview a change before you publish it. After publishing, wait a minute and refresh the public page. If you need help, write to the person looking after the site for you and share which page you were editing.

# June Email Signature Builder

A single-page tool for generating the June email signature and pasting it straight into Gmail.

No build step, no dependencies — open `index.html` in a browser, or serve it locally:

```bash
npm run dev
```

## Usage

1. Fill in name, job title, email, phone, and link label + URL.
2. Hit **Copy signature**.
3. In Gmail: **Settings → See all settings → General → Signature**, paste with `⌘V`, then **Save Changes**.

Your details persist in `localStorage`, so the form comes back filled in next time.

## Email client compatibility

The generated markup is table-based with 100% inline styles — no `<style>` block, no classes, and no
media queries, since Gmail strips all of those from a signature. Copying prepends a `<br>` so the
signature isn't flush against the message body.

Verified against Gmail, and built to the same conventions Outlook and Apple Mail need.

### Images must be hosted, and this is not optional

The logo and icons are referenced by public https URL, served by GitHub Pages out of `images/`:

```
https://eshchar-june.github.io/june-email-signature/images/
```

Two earlier approaches both failed, for reasons worth recording:

- **Base64 `data:` URIs.** Convenient — nothing to host — but Gmail strips `data:` URIs from
  received mail and Outlook blocks them outright. Recipients saw `alt` text and empty boxes.
- **Letting Gmail host them.** Pasting into Gmail's signature editor really does re-upload the
  images and rewrite the `src` to `googleusercontent.com`, and this looks like it works. It only
  survives *new* messages. On a reply Gmail sends the proxy URL as a bare link, and that URL is
  scoped to the sender's account, so every recipient gets a broken image.

Hosting the images ourselves is what makes new mail, replies, forwards and non-Gmail clients behave
identically. It also cuts the signature from ~101,000 characters to ~4,000, which matters if you
ever need it to fit in a spreadsheet cell.

To move the images to june.ai or any CDN, upload the `images/` folder and change the single `BASE`
constant at the top of `assets.js`.

## Behaviour worth knowing

- Every field degrades cleanly when empty, spacer cells included. Empty contact fields drop out; if
  all three are gone so is the divider, and an empty name and title take the whole heading block with
  them rather than leaving a blank line above a bare rule.
- Bare domains are normalised (`june.ai/demo` → `https://june.ai/demo`).
- Email becomes a `mailto:` link, phone a `tel:` link.
- **Copy signature** copies rich HTML by selecting a rendered off-screen node and letting the browser
  serialise it — the path that keeps images intact in Gmail's editor. `navigator.clipboard.write()`
  with `text/html` + `text/plain` is the fallback. This is the only path that prepends the leading
  `<br>`, so the preview and both HTML exports stay identical to the signature itself.
- **Copy HTML** / **Download .html** export the raw markup for other clients.
- The logo and contact icons are fixed. There is no upload — replace the files in `images/` and
  push; GitHub Pages serves them at the same URLs.
- Field labels float Bootstrap-style, driven entirely by `:placeholder-shown`. That is why every
  input carries `placeholder=" "`; removing it strands the labels in their floated position.

## Files

| Path | Purpose |
| --- | --- |
| `index.html` | The whole app — UI, signature generator, clipboard handling |
| `assets.js` | Public image URLs, and the single `BASE` constant that points at them |
| `images/` | The logo and icons, served publicly by GitHub Pages |
| `server.js` | Zero-dependency static server behind `npm run dev` |

The logo is an animated GIF (`images/image-1.gif`); the three contact icons are PNGs. Replacing any
of them is just a commit — the URLs don't change, so already-installed signatures pick up the new
image. Keep the filenames as they are.

### A caveat on the animated logo

Outlook on Windows renders only the **first frame** of an animated GIF, and Apple Mail does the same
when it isn't the frontmost window. The current logo animates the wordmark in from an empty disc, so
those clients show a plain pink circle with no "JUNE" on it. If that matters, re-export the GIF with
the finished wordmark on frame 1 and let the animation run from there.

## Design

90×90 circular avatar, 24px gap, name at 18/26 weight 600, title at 14/20 to match the contact
metadata below it, a 1px `#e0e0e0` divider 12px under the heading, 16px above the contact row, 14px
icons with 6px gaps and 16px between items, all in `#1c1842` Inter.

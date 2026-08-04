# June Email Signature Builder

A single-page tool for generating the June email signature and pasting it straight into Gmail.

![Signature preview](images/image-1.png)

No build step, no dependencies — open `index.html` in a browser.

## Usage

1. Fill in name, job title, email, phone, and link label + URL.
2. Hit **Copy signature**.
3. In Gmail: **Settings → See all settings → General → Signature**, paste with `⌘V`, then **Save Changes**.

Your details persist in `localStorage`, so the form comes back filled in next time.

## Email client compatibility

The generated markup is table-based with 100% inline styles — no `<style>` block, no classes, and no
media queries, since Gmail strips all of those from a signature. The June logo and the three contact
icons are embedded as base64 data URIs, so there is nothing to host; Gmail re-uploads pasted images
to its own servers. A leading `<br>` keeps the signature off the message body.

Verified against Gmail, and built to the same conventions Outlook and Apple Mail need.

## Behaviour worth knowing

- Empty phone or link fields drop out cleanly, spacer cells included. If all three contact items are
  empty, the divider under the name disappears too.
- Bare domains are normalised (`june.ai/demo` → `https://june.ai/demo`).
- Email becomes a `mailto:` link, phone a `tel:` link.
- **Copy signature** copies rich HTML by selecting a rendered off-screen node and letting the browser
  serialise it — the path that keeps images intact in Gmail's editor. `navigator.clipboard.write()`
  with `text/html` + `text/plain` is the fallback.
- **Copy HTML** / **Download .html** export the raw markup for other clients.

## Files

| Path | Purpose |
| --- | --- |
| `index.html` | The whole app — UI, signature generator, clipboard handling |
| `assets.js` | Generated base64 data URIs for the logo and contact icons |
| `images/` | Source PNGs the data URIs are generated from |

To regenerate `assets.js` after changing any image:

```bash
{
  echo "// Auto-generated from images/*.png — base64 data URIs so the signature needs no image hosting."
  echo "window.SIG_ASSETS = {"
  printf '  avatar: "data:image/png;base64,%s",\n' "$(base64 -i images/image-1.png | tr -d '\n')"
  printf '  mail: "data:image/png;base64,%s",\n'   "$(base64 -i images/image-2.png | tr -d '\n')"
  printf '  phone: "data:image/png;base64,%s",\n'  "$(base64 -i images/image-3.png | tr -d '\n')"
  printf '  globe: "data:image/png;base64,%s"\n'   "$(base64 -i images/image-4.png | tr -d '\n')"
  echo "};"
} > assets.js
```

## Design

Layout metrics match the original signature template exactly: 90×90 circular avatar, 24px gap, name
at 20/28 weight 600, title at 15/24, a 1px `#e0e0e0` divider 12px under the title, 16px above the
contact row, 14px icons with 6px gaps and 16px between items, all in `#1c1842` Inter.

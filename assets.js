// Image URLs used by the signature.
//
// These must be publicly reachable over https. Email clients refuse to render
// base64 `data:` URIs, and images that only Gmail hosts break the moment you
// reply — the URL points at a proxy scoped to your own account, so recipients
// get nothing. Serving them ourselves is what makes the signature behave the
// same on new mail, replies, forwards and outside Gmail.
//
// Served by GitHub Pages from the images/ folder of this repo. To move them to
// june.ai (or any CDN), upload that folder and change BASE — nothing else.

(function () {
  var BASE = 'https://eshchar-june.github.io/june-email-signature/images';

  window.SIG_ASSETS = {
    avatar: BASE + '/image-1.gif',
    mail: BASE + '/image-2.png',
    phone: BASE + '/image-3.png',
    globe: BASE + '/image-4.png'
  };
})();

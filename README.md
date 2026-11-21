# UNBTHRD website

This rebuilds weareunbthrd.wixsite.com/unbthrd as plain files you own. It needs no Wix and no monthly fee.

## What's in here

| Page | File | Old Wix address |
|---|---|---|
| Home | `index.html` | /unbthrd |
| About | `about.html` | /about |
| Events | `events.html` | /unbthrd-experience |
| Studio | `studio.html` | /unbthrd-studio |
| Academy | `academy.html` | /copy-of-studio |
| Contact | `contact.html` | /contact |
| Let's Work | `work-with-us.html` | /copy-of-contact |

- `assets/style.css` holds colours, fonts and layout. The cream is `#f2e6ca` and the black is `#191919`.
- `assets/img/` and `assets/video/` hold all the images and videos copied from the Wix site.

To change any text, open the `.html` file in a text editor, find the sentence and edit it.

## Hosting (GitHub Pages, free)

The site is hosted on GitHub Pages from a repository called `unbthrd-website`.

**To change the site:** edit the files here, then on github.com open the repository, click **Add file → Upload files**, drag in the changed files (or the whole contents of this folder) and click **Commit changes**. The live site updates within a minute or two.

- `CNAME` tells GitHub the site lives at weareunbthrd.com. Don't delete it.
- The pages like `unbthrd-studio.html` and the `unbthrd/` folder only redirect old Wix links to the new pages.

**Domain:** weareunbthrd.com is registered at Wix. Its DNS (in Wix) points the main address to GitHub's four A records (185.199.108.153, .109.153, .110.153, .111.153) and `www` to `<your-github-username>.github.io`. The Google email (MX) records are untouched.

**Forms:** the contact, Let's Work and newsletter forms are sent by FormSubmit (formsubmit.co) to jiem@weareunbthrd.com. The address is set at the top of the forms section in `assets/site.js`. The very first message triggers an activation email from FormSubmit; click its link once and forms work from then on.

## Still to do

- **Event trailer:** the "U Focus" trailer on the Events page was a protected Wix video, so it couldn't be copied. Its cover image is there for now. Send the video file or a YouTube link to swap it in.
- **Newsletter list:** sign-ups collected on Wix stay in your Wix account. Export them before the account closes.
- **Fonts:** Wix used paid fonts (Molde, Gobold, Maison Neue). This site uses the closest free Google Fonts (Barlow Condensed and Inter). If you have licence files for the original fonts, they can be added.
- The full-length original videos are kept in `../unbthrd-website-originals/`. They're left out of this folder on purpose so they don't get uploaded.

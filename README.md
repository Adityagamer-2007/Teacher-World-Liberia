# Teacher World Liberia — Website (React + Vite + TypeScript)

## Run on Windows 10/11
1. Right-click the ZIP → **Extract All**.
2. Install Node.js LTS from https://nodejs.org (accept defaults), then restart your PC.
3. Open **Visual Studio Code** → File → Open Folder → choose the extracted `twl` folder.
4. Terminal → New Terminal.
5. `npm install`
6. `npm run dev` → open the address shown (usually http://localhost:5173).
7. Production build: `npm run build` (output in `dist/`), preview with `npm run preview`.

## Contact form
No backend is configured. By default the form validates, then opens the visitor's email app (nothing is claimed as sent).
To use a real service, create a server endpoint or form service that accepts JSON `{name,email,phone,org,type,message}`,
keep any API keys **on the server**, and put only its public URL in `.env` as `VITE_CONTACT_ENDPOINT=https://...` (see `.env.example`).

## Deployment
`public/_redirects` (Netlify) and `vercel.json` make direct links like `/about` work.

## Assets
- `public/images/` holds team portraits. The portraits for Mulbah, Anderson, Bah and Dr. Lan, and the logo, were cropped from the client's WhatsApp screenshots, so they are low resolution. Replace the files with originals when available, keeping the same filenames (`logo.png`, `mulbah.jpg`, `anderson.jpg`, `bah.jpg`, `lan.jpg`). `favicon.png` is derived from the logo.
- `public/images/gallery/` (optimised photos plus `t_` thumbnails) and `public/videos/` come from the client's WhatsApp albums. Each gallery's items are listed in `src/gallery.ts` (captions are the client's own).

## Where to edit content
`src/data.ts`: phone numbers, email, offices, team, partnership schools and program text.

## Troubleshooting
- `npm is not recognized`: reinstall Node.js and restart VS Code.
- PowerShell script error: run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.
- Install errors: delete `node_modules` and `package-lock.json`, run `npm install` again.
- Blank 3D area: the browser lacks WebGL; a CSS globe is shown instead.

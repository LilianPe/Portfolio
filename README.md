# Portfolio

My personal portfolio, live at **[lilianperthuis.fr](https://www.lilianperthuis.fr)**.

A single-page site presenting who I am, the projects I've built (web apps, AI, DevOps, 42 school projects) and a way to get in touch.

## Features

- **Snap-scrolling layout** with a side navigation that follows the active section
- **Projects gallery** with image/video carousels, tech stack and links for each project
- **About panel** with a short presentation and background
- **Contact form** sending emails through EmailJS
- **Custom cursor**
- **Responsive** across desktop and mobile
- **Privacy-friendly analytics** with Vercel Analytics, plus a legal notice page

## Tech stack

- [Next.js](https://nextjs.org) (App Router) · React · TypeScript
- Tailwind CSS
- EmailJS · Vercel Analytics
- Deployed on Vercel

## Run locally

```bash
npm install
npm run dev
```

The contact form needs EmailJS credentials in a `.env.local` file:

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
```

## Contact

- Website: [lilianperthuis.fr](https://www.lilianperthuis.fr)
- LinkedIn: [Lilian Perthuis](https://www.linkedin.com/in/lilian-perthuis-14bb562a2/)
- Email: lilianperthuis@gmail.com

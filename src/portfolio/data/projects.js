// src/portfolio/data/projects.js
const projects = [
  {
    title: "Events Management App",
    description: "A full-stack web app that lets users create and manage view events. Built with DRF for the backend and React for the frontend.",
    techStack: ["React", "Django", "PostgreSQL", "Django Rest Framework"],
    github: "https://github.com/Tech-By-Henry/Event",       // GitHub repository link
    website: "https://events-by-henry.vercel.app/"       // Live product website link
  },
  {
    title: "Trade Net",
    description: "TradeNet is a no-nonsense arbitrage trading platform built for traders who value speed and clarity.",
    techStack: ["Python", "HTML", "CSS", "Javascript", "Celery", "PostgreSQL"],
    github: "https://github.com/Tech-By-Henry/Aleen",
    website: "https://tech-by-henry.onrender.com/"
  },
  {
    title: "Verifi",
    description: "Fetches bank account holder details using NubAPI, therefore understanding external API integration.",
    techStack: ["React","MUI", "PostgresQL", "Django Rest Framework"],
    github: "https://github.com/Tech-By-Henry/L_API/",
    website: "https://l-api.vercel.app/"
  },
    {
    title: "QR Barcode Generator",
    description: "Generates QR codes and barcodes instantly from user input for quick download.",
    techStack: ["HTML", "CSS", "Javascript", "Django", "Python"],
    github: "https://github.com/Tech-By-Henry/QR-BARCODE",
    website: "https://qr-barcode.onrender.com"
  },
      {
    title: "Letter Generator App",
    description: "Generates Letters with provided details instantly for quick download.",
    techStack: ["React", "Tailwind"],
    github: "https://github.com/Tech-By-Henry/letter-generator-app",
    website: "https://letter-generator-app.vercel.app/"
  }
];

export default projects;

export const contributedProjects = [
  {
    title: "DPCMS Revamped",
    description: "A refreshed cooperative finance platform focused on clearer navigation, improved member access, and a smoother experience for tracking savings, investments, and financial activity.",
    contribution: "Contributed to this project as part of the company team.",
    techStack: ["Team Project", "React", "Tailwind", "SEO"],
    image: "/dpcms-revamped.png",
    website: "https://destinypromoterscooperative.com"
  },
  {
    title: "Flo Finance",
    description: "A fintech web experience designed to make loan discovery and application flows feel faster, clearer, and more trustworthy for users seeking accessible financial support.",
    contribution: "Contributed to this project as part of the company team.",
    techStack: ["Team Project", "React", "Tailwind", "SEO"],
    image: "/flo-finance.png",
    website: "https://flofinanceng.com"
  },
  {
    title: "Frisan Foods",
    description: "A clean food-brand website presenting Frisan's natural products with strong visual storytelling, product-focused sections, and a user journey built around brand trust.",
    contribution: "Contributed to this project as part of the company team.",
    techStack: ["Team Project", "React", "Tailwind", "SEO"],
    image: "/frisan-foods.png",
    website: "https://www.frisanfoods.com"
  },
  {
    title: "Fortune Initiative",
    description: "A finance-focused corporate website structured to communicate investment services, advisory support, and client confidence through a polished digital presence.",
    contribution: "Contributed to this project as part of the company team.",
    techStack: ["Team Project", "React", "Tailwind", "SEO"],
    image: "/fortune-initiative.png",
    website: "https://fortuneinitiativeng.com"
  },
  {
    title: "Maicon Hotels",
    description: "A hospitality website showcasing Maicon Hotels with a premium first impression, room discovery paths, and clear calls to action for prospective guests.",
    contribution: "Contributed to this project as part of the company team.",
    techStack: ["Team Project", "React", "Tailwind", "SEO"],
    image: "/maicon-hotels.png",
    website: "https://maiconhotels.netlify.app"
  }
];

import { useEffect } from "react";
import projects, { contributedProjects } from "../data/projects";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_TITLE,
  OG_IMAGE,
  OG_IMAGE_ALT,
  PERSON_EMAIL,
  PERSON_JOB,
  PERSON_LOCATION,
  PERSON_NAME,
  PERSON_PHONE,
  SITE_NAME,
  SITE_URL,
  SOCIAL_SAME_AS,
} from "../data/seo";

function upsertMeta(selector, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function Seo() {
  useEffect(() => {
    const origin = typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : SITE_URL;
    const canonical = `${origin}/`;
    const image = `${origin}/contact2.png`;

    document.title = DEFAULT_TITLE;

    upsertMeta('meta[name="description"]', { name: "description", content: DEFAULT_DESCRIPTION });
    upsertMeta('meta[name="keywords"]', { name: "keywords", content: DEFAULT_KEYWORDS });
    upsertMeta('meta[name="author"]', { name: "author", content: `${PERSON_NAME} | ${SITE_NAME}` });
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    });
    upsertMeta('meta[name="googlebot"]', { name: "googlebot", content: "index, follow" });
    upsertMeta('meta[name="theme-color"]', { name: "theme-color", content: "#000000" });
    upsertMeta('meta[name="geo.region"]', { name: "geo.region", content: "NG-LA" });
    upsertMeta('meta[name="geo.placename"]', { name: "geo.placename", content: PERSON_LOCATION });

    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SITE_NAME });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: DEFAULT_TITLE });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: DEFAULT_DESCRIPTION });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: image });
    upsertMeta('meta[property="og:image:alt"]', { property: "og:image:alt", content: OG_IMAGE_ALT });
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: "en_NG" });

    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: DEFAULT_TITLE });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: DEFAULT_DESCRIPTION });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image });
    upsertMeta('meta[name="twitter:creator"]', { name: "twitter:creator", content: "@TechByHenry1" });

    upsertLink("canonical", canonical);

    const allProjects = [...projects, ...contributedProjects];
    const graph = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": `${origin}/#person`,
          name: PERSON_NAME,
          alternateName: SITE_NAME,
          url: canonical,
          image,
          email: PERSON_EMAIL,
          telephone: PERSON_PHONE,
          jobTitle: PERSON_JOB,
          description: DEFAULT_DESCRIPTION,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Lagos",
            addressCountry: "NG",
          },
          knowsAbout: [
            "React",
            "Django",
            "Python",
            "JavaScript",
            "PostgreSQL",
            "REST APIs",
            "HTML",
            "CSS",
            "SEO",
          ],
          sameAs: SOCIAL_SAME_AS,
        },
        {
          "@type": "WebSite",
          "@id": `${origin}/#website`,
          url: canonical,
          name: SITE_NAME,
          description: DEFAULT_DESCRIPTION,
          inLanguage: "en",
          publisher: { "@id": `${origin}/#person` },
        },
        {
          "@type": "WebPage",
          "@id": `${origin}/#webpage`,
          url: canonical,
          name: DEFAULT_TITLE,
          description: DEFAULT_DESCRIPTION,
          isPartOf: { "@id": `${origin}/#website` },
          about: { "@id": `${origin}/#person` },
          primaryImageOfPage: image,
        },
        {
          "@type": "ItemList",
          name: "Featured and contributed web projects by Henry Iheonu",
          itemListElement: allProjects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: project.title,
            url: project.website || canonical,
            description: project.description,
          })),
        },
        {
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Who is Tech By Henry?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Tech By Henry is Henry Iheonu, a full-stack software engineer in Lagos, Nigeria, specializing in React, Django, Python, and production web applications.",
              },
            },
            {
              "@type": "Question",
              name: "What kind of projects does Henry build?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Henry builds full-stack apps, REST APIs, and client websites — including event platforms, fintech experiences, hospitality sites, agency sites such as Meezak Technologies, and artisan marketplaces such as Get a Pro.",
              },
            },
            {
              "@type": "Question",
              name: "How can I hire Henry Iheonu?",
              acceptedAnswer: {
                "@type": "Answer",
                text: `Email ${PERSON_EMAIL}, call ${PERSON_PHONE}, or reach out via LinkedIn, GitHub, X, or Upwork from the contact section of this portfolio.`,
              },
            },
          ],
        },
      ],
    };

    let script = document.getElementById("seo-jsonld");
    if (!script) {
      script = document.createElement("script");
      script.id = "seo-jsonld";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(graph);

    void OG_IMAGE;
  }, []);

  return null;
}

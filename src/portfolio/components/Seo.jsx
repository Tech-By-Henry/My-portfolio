import { useEffect } from "react";
import projects, { contributedProjects } from "../data/projects";
import {
  BRAND_ALIASES,
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_TITLE,
  OG_IMAGE,
  OG_IMAGE_ALT,
  PERSON_EMAIL,
  PERSON_FAMILY_NAME,
  PERSON_GIVEN_NAME,
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

function upsertLink(rel, href, extra = {}) {
  const extraKey = extra.hrefLang ? `[hreflang="${extra.hrefLang}"]` : "";
  let el = document.head.querySelector(`link[rel="${rel}"]${extraKey}`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
  Object.entries(extra).forEach(([key, value]) => el.setAttribute(key, value));
}

export default function Seo() {
  useEffect(() => {
    const origin = SITE_URL;
    const canonical = `${origin}/`;
    const image = `${origin}/contact2.png`;

    document.title = DEFAULT_TITLE;

    upsertMeta('meta[name="description"]', { name: "description", content: DEFAULT_DESCRIPTION });
    upsertMeta('meta[name="keywords"]', { name: "keywords", content: DEFAULT_KEYWORDS });
    upsertMeta('meta[name="author"]', { name: "author", content: `${PERSON_NAME} | ${SITE_NAME}` });
    upsertMeta('meta[name="application-name"]', { name: "application-name", content: SITE_NAME });
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    });
    upsertMeta('meta[name="googlebot"]', { name: "googlebot", content: "index, follow" });
    upsertMeta('meta[name="theme-color"]', { name: "theme-color", content: "#000000" });
    upsertMeta('meta[name="geo.region"]', { name: "geo.region", content: "NG-LA" });
    upsertMeta('meta[name="geo.placename"]', { name: "geo.placename", content: PERSON_LOCATION });

    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "profile" });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SITE_NAME });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: DEFAULT_TITLE });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: DEFAULT_DESCRIPTION });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: image });
    upsertMeta('meta[property="og:image:alt"]', { property: "og:image:alt", content: OG_IMAGE_ALT });
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: "en_NG" });
    upsertMeta('meta[property="profile:first_name"]', { property: "profile:first_name", content: PERSON_GIVEN_NAME });
    upsertMeta('meta[property="profile:last_name"]', { property: "profile:last_name", content: PERSON_FAMILY_NAME });
    upsertMeta('meta[property="profile:username"]', { property: "profile:username", content: "TechByHenry" });

    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: DEFAULT_TITLE });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: DEFAULT_DESCRIPTION });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image });
    upsertMeta('meta[name="twitter:creator"]', { name: "twitter:creator", content: "@TechByHenry1" });
    upsertMeta('meta[name="twitter:site"]', { name: "twitter:site", content: "@TechByHenry1" });

    upsertLink("canonical", canonical);
    upsertLink("alternate", canonical, { hrefLang: "en" });
    upsertLink("alternate", canonical, { hrefLang: "en-NG" });
    upsertLink("alternate", canonical, { hrefLang: "x-default" });
    SOCIAL_SAME_AS.forEach((href) => {
      if (!document.head.querySelector(`link[rel="me"][href="${href}"]`)) {
        const me = document.createElement("link");
        me.setAttribute("rel", "me");
        me.setAttribute("href", href);
        document.head.appendChild(me);
      }
    });

    const allProjects = [...projects, ...contributedProjects];
    const graph = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": `${origin}/#person`,
          name: PERSON_NAME,
          givenName: PERSON_GIVEN_NAME,
          familyName: PERSON_FAMILY_NAME,
          additionalName: "Iheonu",
          alternateName: BRAND_ALIASES,
          url: canonical,
          image,
          email: PERSON_EMAIL,
          telephone: PERSON_PHONE,
          jobTitle: PERSON_JOB,
          description: DEFAULT_DESCRIPTION,
          brand: { "@type": "Brand", name: SITE_NAME },
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
          mainEntityOfPage: { "@id": `${origin}/#webpage` },
        },
        {
          "@type": "ProfilePage",
          "@id": `${origin}/#profile`,
          url: canonical,
          name: DEFAULT_TITLE,
          about: { "@id": `${origin}/#person` },
          mainEntity: { "@id": `${origin}/#person` },
        },
        {
          "@type": "Organization",
          "@id": `${origin}/#organization`,
          name: SITE_NAME,
          legalName: PERSON_NAME,
          alternateName: BRAND_ALIASES,
          url: canonical,
          logo: `${origin}/Logo.png`,
          image,
          email: PERSON_EMAIL,
          telephone: PERSON_PHONE,
          founder: { "@id": `${origin}/#person` },
          sameAs: SOCIAL_SAME_AS,
        },
        {
          "@type": "WebSite",
          "@id": `${origin}/#website`,
          url: canonical,
          name: SITE_NAME,
          alternateName: BRAND_ALIASES,
          description: DEFAULT_DESCRIPTION,
          inLanguage: "en",
          publisher: { "@id": `${origin}/#organization` },
          about: { "@id": `${origin}/#person` },
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
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: ["h1", "#about"],
          },
        },
        {
          "@type": "ItemList",
          name: `Projects by ${SITE_NAME} — ${PERSON_NAME}`,
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
                text: "Tech By Henry is the personal brand and official portfolio of Henry Iheonu, also known as Iheonu, a full-stack software engineer based in Lagos, Nigeria.",
              },
            },
            {
              "@type": "Question",
              name: "Who is Henry Iheonu?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Henry Iheonu is a Lagos-based full-stack software engineer who works under the name Tech By Henry. He builds React, Django, Python, HTML, and CSS products.",
              },
            },
            {
              "@type": "Question",
              name: "Who is Iheonu?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Iheonu is the surname of Henry Iheonu, the software engineer behind Tech By Henry at https://tech-by-henry.vercel.app/.",
              },
            },
            {
              "@type": "Question",
              name: "How can I hire Tech By Henry or Henry Iheonu?",
              acceptedAnswer: {
                "@type": "Answer",
                text: `Email ${PERSON_EMAIL}, call ${PERSON_PHONE}, or reach out via LinkedIn, GitHub, X, or Upwork from the contact section.`,
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

import type { ProjectShowcaseItem, ProjectStackItem } from "@/types/project";

const commonTags = ["Design", "Illustrations", "Packaging", "marketing"];
const showcaseCommonTags = ["Design", "Illustrations", "Packaging", "Marketing"];

export const brandingStudioProjects: ProjectStackItem[] = [
  {
    title: "NFT project branding",
    imageSrc: "/img/works/showcase-stack/pr03.webp",
    imageAlt: "Project Preview Image",
    imageWidth: 1920,
    imageHeight: 1180,
    tags: commonTags,
  },
  {
    title: "Interactive app concept",
    imageSrc: "/img/works/showcase-stack/pr02.webp",
    imageAlt: "Project Preview Image",
    imageWidth: 2200,
    imageHeight: 1240,
    tags: commonTags,
  },
  {
    title: "Editorial illustrations set",
    imageSrc: "/img/works/showcase-stack/pr01.webp",
    imageAlt: "Project Preview Image",
    imageWidth: 1920,
    imageHeight: 1180,
    tags: commonTags,
  },
  {
    title: "Creative studio template",
    imageSrc: "/img/works/showcase-stack/pr04.webp",
    imageAlt: "Project Preview Image",
    imageWidth: 1920,
    imageHeight: 1180,
    coverClassName: "cover-darken",
    tags: commonTags,
  },
];

export const digitalDesignerProjectsShowcase: ProjectShowcaseItem[] = [
  {
    titleLines: ["Gemeente", "Voerendaal"],
    bgImageSrc: "/img/works/1920x1280_pr01.webp",
    cardImageSrc: "/img/works/700x700_pr01.webp",
    cardImageAlt: "Creatief project voor Gemeente Voerendaal",
    cursorText: "Maak kennis",
    href: "/contact",
    tags: ["Campagne", "Design", "Communicatie", "Digitaal"],
  },
  {
    titleLines: ["Gemeente", "Stein"],
    bgImageSrc: "/img/works/1920x1280_pr02.webp",
    cardImageSrc: "/img/works/700x700_pr02.webp",
    cardImageAlt: "Digitaal project voor Gemeente Stein",
    cursorText: "Start een project",
    href: "/contact",
    tags: ["Concept", "Webdesign", "Development", "Content"],
  },
  {
    titleLines: ["SerPaCo", "digital experience"],
    bgImageSrc: "/img/works/1920x1280_pr03.webp",
    cardImageSrc: "/img/works/700x700_pr03.webp",
    cardImageAlt: "Digitale ervaring voor SerPaCo",
    cursorText: "Samenwerken",
    href: "/contact",
    tags: ["Strategie", "Design", "Development", "Support"],
  },
];

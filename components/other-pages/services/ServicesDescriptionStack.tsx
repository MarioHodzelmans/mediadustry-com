"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import TextScramble from "@/components/animations/TextScramble";
import CommonServicesStack, {
  ServicesStackSlot,
} from "@/components/animations/CommonServicesStack";

const IMG_W = 1200;
const IMG_H = 1300;
const IMG_ALT = "Azurio Template Sample Image";

type Card = {
  subtitle: string;
  title: string;
  tagCols: [string[], string[]];
  image: string;
  descrClass: string;
  descr: ReactNode;
};

const CARDS: Card[] = [
  {
    subtitle: "01 / Services",
    title: "Innovative design",
    tagCols: [
      ["UI/UX", "Web design", "Applications", "Print design"],
      ["Packaging", "Motion", "3D models"],
    ],
    image: "/img/services/services-stack/s01.webp",
    descrClass: "t-large t-bold services-card__descr",
    descr: (
      <>
        We create visually compelling designs that enhance user experience.
        <span>
          From UI/UX design to stunning websites, mobile apps, and print
          materials, we make sure your brand&apos;s visuals resonate with your
          audience.
        </span>
      </>
    ),
  },
  {
    subtitle: "02 / Services",
    title: "Creative development",
    tagCols: [
      ["Frontend", "Interactions", "Backend", "E-Commerce"],
      ["Mobile Apps", "Maintenance", "Support"],
    ],
    image: "/img/services/services-stack/s02.webp",
    descrClass: "t-bold t-large services-card__descr",
    descr: (
      <>
        We build high-performance websites and applications using modern
        technologies.
        <span>
          Our solutions are designed to be scalable and functional for optimal
          performance.
        </span>
      </>
    ),
  },
  {
    subtitle: "03 / Services",
    title: "Brand Identity",
    tagCols: [
      ["Brand strategy", "Logo design", "Guidelines"],
      ["Visual identity", "Rebranding"],
    ],
    image: "/img/services/services-stack/s03.webp",
    descrClass: "t-bold t-large services-card__descr",
    descr: (
      <>
        From logo design to comprehensive brand strategies, we ensure your
        business stands out with a{" "}
        <span>
          unique visual identity and consistent messaging across all
          touchpoints.
        </span>
      </>
    ),
  },
  {
    subtitle: "04 / Services",
    title: "Marketing solutions",
    tagCols: [
      ["Strategy", "Social media", "SEO Optimization"],
      ["Email", "Campaigns"],
    ],
    image: "/img/services/services-stack/s04.webp",
    descrClass: "t-bold t-large services-card__descr",
    descr: (
      <>
        We develop and execute tailored digital marketing strategies.
        <span>
          SEO and content marketing, social media management and paid campaigns
          - we help you reach and engage your target audience effectively.
        </span>
      </>
    ),
  },
];

function Tag({ children }: { children: string }) {
  return (
    <TextScramble className="tag tag-s-mobile mxd-scramble">
      {children}
    </TextScramble>
  );
}

function ServiceCard({ card, index }: { card: Card; index: number }) {
  const [colA, colB] = card.tagCols;
  return (
    <ServicesStackSlot part="card" index={index}>
      <div className="mxd-stack-services__card">
        <ServicesStackSlot part="wrapper" index={index}>
          <div className="services-card__wrapper">
            <div className="services-card__content">
              <div className="services-card__info">
                <div className="services-card__subtitle">
                  <Tag>{card.subtitle}</Tag>
                </div>
                <div className="services-card__title">
                  <ServicesStackSlot part="title" index={index}>
                    <div className="services-card__title-text">
                      {card.title}
                    </div>
                  </ServicesStackSlot>
                </div>
                <ServicesStackSlot part="tags" index={index}>
                  <div className="services-card__tags">
                    <div className="tags-column">
                      {colA.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                    <div className="tags-column">
                      {colB.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  </div>
                </ServicesStackSlot>
              </div>
              <ServicesStackSlot part="descr" index={index}>
                <div className={card.descrClass}>{card.descr}</div>
              </ServicesStackSlot>
            </div>
            <ServicesStackSlot part="image" index={index}>
              <div className="services-card__image">
                <Image
                  src={card.image}
                  width={IMG_W}
                  height={IMG_H}
                  alt={IMG_ALT}
                />
                <div className="services-card__cover" />
              </div>
            </ServicesStackSlot>
          </div>
        </ServicesStackSlot>
      </div>
    </ServicesStackSlot>
  );
}

export default function ServicesDescriptionStack() {
  return (
    <div id="services" className="mxd-section">
      <div className="mxd-container fullwidth-container">
        <div className="mxd-block">
          <CommonServicesStack className="mxd-stack-services">
            {CARDS.map((card, index) => (
              <ServiceCard key={card.subtitle} card={card} index={index} />
            ))}
          </CommonServicesStack>
        </div>
      </div>
    </div>
  );
}

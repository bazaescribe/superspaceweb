"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const platformStories = [
  {
    id: "tailored",
    label: "Tailored experience",
    title: "Built around your business.",
    description: "Your workspace reflects the people, work, rules and terminology your operation actually uses.",
    mockup: "/assets/figma/feature-tailored.png",
  },
  {
    id: "managed",
    label: "Reduced overhead",
    title: "Managed by us.",
    description: "Use Superspace like any other app. We take care of running and maintaining the platform behind it.",
    mockup: "/assets/figma/feature-managed.png",
  },
  {
    id: "team",
    label: "Quick and Easy",
    title: "Ready for your team.",
    description:
      "Give each one access to the work and information they need. Permissions and responsibilities built in.",
    mockup: "/assets/figma/feature-team.png",
  },
  {
    id: "expandable",
    label: "Expandable",
    title: "Managed by us.",
    description: "Use Superspace like any other app. We take care of running and maintaining the platform behind it.",
    mockup: "/assets/figma/feature-expandable.png",
  },
] as const;

const industries = [
  {
    id: "manufacturing",
    title: "Manufacturing",
    description: "Coordinate production, people and materials as work moves through your operation.",
    capabilities: "Work orders · Production stages · Materials · Assignments",
    image: "/assets/use-case-manufacturing.jpg",
  },
  {
    id: "logistics",
    title: "Logistics",
    description: "Keep goods, locations and teams coordinated as things move from one place to another.",
    capabilities: "Inventory movements · Transfers · Locations · Dispatch",
    image: "/assets/use-case-logistics.jpg",
  },
  {
    id: "field-services",
    title: "Field Services",
    description: "Coordinate the people, availability and work behind every service you deliver.",
    capabilities: "Scheduling · Assignments · Availability · Service records",
    image: "/assets/use-case-service.jpg",
  },
  {
    id: "distribution",
    title: "Distribution",
    description: "Connect the information and handoffs that keep products moving to the right place.",
    capabilities: "Orders · Routes · Inventory · Partners",
    image: "/assets/figma/industry-distribution.png",
  },
] as const;

const operationCards: Array<{ title: string; description: string; span?: "wide" }> = [
  {
    title: "Manage complex orders.",
    description:
      "Track every order from intake to fulfillment, with the customers, products, approvals, documents and internal work connected to it.",
    span: "wide",
  },
  {
    title: "Run service operations.",
    description: "Coordinate requests, assignments, schedules, status changes and customer communication in one place.",
  },
  {
    title: "Control inventory & purchasing.",
    description:
      "Connect products, stock, suppliers, purchase orders and fulfillment without stitching together separate tools.",
  },
  {
    title: "Standardize internal workflows.",
    description:
      "Turn approvals, handoffs, recurring processes and business rules into workflows your team can actually follow.",
  },
  {
    title: "Manage customers & partners.",
    description:
      "Give your team the information and workflows they need while creating dedicated experiences for customers, suppliers or other external partners.",
    span: "wide",
  },
  {
    title: "Build new operational capabilities.",
    description:
      "When your business changes, add the workflows and tools you need without introducing another disconnected system.",
  },
] as const;

type PlatformStoryId = (typeof platformStories)[number]["id"];
type IndustryId = (typeof industries)[number]["id"];

export function PlatformShowcase() {
  const [activeId, setActiveId] = useState<PlatformStoryId>(platformStories[0].id);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let frame = 0;
    const updateActiveStory = () => {
      frame = 0;
      const viewportCenter = window.innerHeight / 2;
      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const bounds = card.getBoundingClientRect();
        const distance = Math.abs(bounds.top + bounds.height / 2 - viewportCenter);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });
      setActiveId((current) => {
        const next = platformStories[nearestIndex].id;
        return current === next ? current : next;
      });
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveStory);
    };
    updateActiveStory();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToStory = (id: PlatformStoryId) => {
    const index = platformStories.findIndex((story) => story.id === id);
    cardRefs.current[index]?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
  };

  return (
    <section className="platform-showcase shell" id="platform" aria-labelledby="platform-title">
      <h2 id="platform-title" className="section-heading">
        Custom where it matters. Standard where it shouldn&apos;t.{" "}
        <span>Superspace is a managed operational platform built around the way your business actually works.</span>
      </h2>
      <div className="platform-showcase__content">
        <nav className="platform-showcase__nav" aria-label="Superspace benefits">
          {platformStories.map((story) => {
            const isActive = story.id === activeId;
            return (
              <button
                className={isActive ? "platform-bullet platform-bullet--active" : "platform-bullet"}
                key={story.id}
                type="button"
                aria-current={isActive ? "true" : undefined}
                onClick={() => scrollToStory(story.id)}
              >
                <span aria-hidden="true" />
                {story.label}
              </button>
            );
          })}
        </nav>
        <div className="platform-showcase__cards">
          {platformStories.map((story, index) => (
            <article
              className="platform-feature-card"
              id={`platform-${story.id}`}
              key={story.id}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
            >
              <p>
                <strong>{story.title}</strong> <span>{story.description}</span>
              </p>
              <motion.div
                className="platform-feature-card__mockup"
                initial={reduceMotion ? false : { opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.18, once: true }}
                transition={{ duration: 1.1, ease: [0.22, 0.86, 0.24, 1] }}
              >
                <Image
                  src={story.mockup}
                  alt={`${story.label} in a Superspace workspace`}
                  fill
                  sizes="(max-width: 720px) calc(100vw - 64px), 886px"
                />
              </motion.div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OperationsGrid() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="operations-grid shell" aria-labelledby="operations-title">
      <motion.h2
        id="operations-title"
        className="section-heading"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.7, once: true }}
        transition={{ duration: 0.62, ease: [0.22, 0.86, 0.24, 1] }}
      >
        Built for the operations your business depends on.{" "}
        <span>From managing orders to coordinating field teams, we got you covered.</span>
      </motion.h2>
      <motion.div
        className="operations-grid__cards"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.18, once: true }}
        transition={{ delay: 0.08, duration: 0.64, ease: [0.22, 0.86, 0.24, 1] }}
      >
        {operationCards.map((card) => (
          <article
            className={`operations-card ${card.span === "wide" ? "operations-card--wide" : ""}`}
            key={card.title}
          >
            <div className="operations-card__media" aria-hidden="true" />
            <p>
              <strong>{card.title}</strong> {card.description}
            </p>
          </article>
        ))}
      </motion.div>
      <p className="operations-grid__prompt">
        Your operation looks any different? <a href="#conversation">Let&apos;s talk.</a>
      </p>
    </section>
  );
}

export function IndustriesAccordion() {
  const [activeId, setActiveId] = useState<IndustryId>("manufacturing");
  const active = industries.find((industry) => industry.id === activeId)!;
  const reduceMotion = useReducedMotion();
  return (
    <section className="industries shell" aria-labelledby="industries-title">
      <motion.h2
        id="industries-title"
        className="section-heading"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.7, once: true }}
        transition={{ duration: 0.62, ease: [0.22, 0.86, 0.24, 1] }}
      >
        Different industries. One operational foundation.{" "}
        <span>Superspace brings together the data &amp; capabilities your operations need.</span>
      </motion.h2>
      <motion.div
        className="industries__cards"
        aria-label="Industries Superspace supports"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2, once: true }}
        transition={{ delay: 0.08, duration: 0.64, ease: [0.22, 0.86, 0.24, 1] }}
      >
        {industries.map((industry) => {
          const isActive = industry.id === activeId;
          return (
            <button
              className={isActive ? "industry-card industry-card--active" : "industry-card"}
              key={industry.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveId(industry.id)}
            >
              <Image
                className="industry-card__image"
                src={industry.image}
                alt=""
                fill
                sizes="(max-width: 760px) 100vw, 420px"
              />
              <span className="industry-card__shade" />
              <span className="industry-card__copy">
                <strong>{industry.title}</strong>
                {isActive && (
                  <>
                    <span>{active.description}</span>
                    <small>{active.capabilities}</small>
                  </>
                )}
              </span>
            </button>
          );
        })}
      </motion.div>
      <p className="industries__prompt">View more industries.</p>
    </section>
  );
}

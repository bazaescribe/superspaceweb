"use client";

import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { AnalyticsUpIcon, Car01Icon, Factory02Icon, HandHelpingIcon } from "@hugeicons/core-free-icons";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useId, useRef, useState } from "react";
import { motion as motionTokens } from "@/lib/motion";

const platformStories = [
  {
    id: "built-around-you",
    title: "Built around your business",
    description: "Your workspace reflects the people, work, rules and terminology your operation actually uses.",
    accent: "#170fff",
    icon: Factory02Icon,
    mockup: "/assets/figma/hero-challenges.png",
    mockupClass: "platform-showcase__screen--workspace",
  },
  {
    id: "managed",
    title: "Managed by us",
    description: "Use Superspace like any other app. We take care of running and maintaining the platform behind it.",
    accent: "#eb6b40",
    icon: Car01Icon,
    mockup: "/assets/raw-20.png",
    mockupClass: "platform-showcase__screen--calendar",
  },
  {
    id: "ready",
    title: "Ready for your team",
    description:
      "Give each person access to the work and information they need, with responsibilities and permissions built in.",
    accent: "#36a05f",
    icon: HandHelpingIcon,
    mockup: "/assets/figma/hero-challenges.png",
    mockupClass: "platform-showcase__screen--team",
  },
  {
    id: "evolves",
    title: "Built to evolve",
    description: "Add the workflows and tools you need as your business changes, without another disconnected system.",
    accent: "#171717",
    icon: AnalyticsUpIcon,
    mockup: "/assets/figma/hero-challenges.png",
    mockupClass: "platform-showcase__screen--evolve",
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
  const [activeId, setActiveId] = useState<PlatformStoryId>("built-around-you");
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.25 });
  const panelId = useId();
  const activeIndex = platformStories.findIndex((story) => story.id === activeId);
  const active = platformStories[activeIndex];

  const advanceStory = () => {
    setActiveId((currentId) => {
      const currentIndex = platformStories.findIndex((story) => story.id === currentId);
      return platformStories[(currentIndex + 1) % platformStories.length].id;
    });
  };

  return (
    <section
      ref={sectionRef}
      className="platform-showcase shell"
      id="platform"
      aria-labelledby="platform-title"
    >
      <motion.h2
        id="platform-title"
        className="section-heading"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.7, once: true }}
        transition={{ duration: 0.62, ease: [0.22, 0.86, 0.24, 1] }}
      >
        Custom where it matters. Standard where it shouldn&apos;t.{" "}
        <span>Superspace is a managed operational platform built around the way your business actually works.</span>
      </motion.h2>
      <motion.div
        className="platform-showcase__tabs"
        role="tablist"
        aria-label="How Superspace works"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.45, once: true }}
        transition={{ delay: 0.08, duration: 0.56, ease: [0.22, 0.86, 0.24, 1] }}
      >
        {platformStories.map((story) => {
          const isActive = story.id === activeId;
          return (
            <button
              className={isActive ? "platform-tab platform-tab--active" : "platform-tab"}
              key={story.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              onClick={() => setActiveId(story.id)}
              style={{ "--tab-accent": story.accent } as React.CSSProperties}
            >
              <span className="platform-tab__progress" aria-hidden="true">
                {isActive && isInView && (
                  <motion.span
                    className="platform-tab__progress-fill"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: reduceMotion ? 0 : 5.6, ease: "linear" }}
                    onAnimationComplete={reduceMotion ? undefined : advanceStory}
                  />
                )}
              </span>
              <HugeiconsIcon aria-hidden="true" icon={story.icon} size={24} strokeWidth={1.4} />
              <span className="platform-tab__title">{story.title}</span>
              <small>{story.description}</small>
            </button>
          );
        })}
      </motion.div>
      <motion.div
        className="platform-showcase__stage"
        id={panelId}
        role="tabpanel"
        aria-label={active.title}
        style={{ "--stage-accent": active.accent } as React.CSSProperties}
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2, once: true }}
        transition={{ delay: 0.12, duration: 0.64, ease: [0.22, 0.86, 0.24, 1] }}
      >
        <div className="platform-showcase__dots" aria-hidden="true" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="platform-showcase__mockup"
            key={active.id}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={motionTokens.standard}
          >
            <Image
              className={`platform-showcase__screen ${active.mockupClass}`}
              src={active.mockup}
              alt="Superspace workspace"
              width={1287}
              height={820}
              sizes="(max-width: 760px) 120vw, 1100px"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
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

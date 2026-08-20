"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useState } from "react";
import { motion as motionTokens } from "@/lib/motion";

const useCases = [
  {
    id: "manufacturing",
    title: "Manufacturing",
    description: "Coordinate production, people and materials as work moves through your operation.",
    capabilities: "Work orders · Production stages · Materials · Assignments",
    image: "/assets/figma/use-manufacturing.png",
  },
  {
    id: "logistics",
    title: "Logistics",
    description: "Keep movement, inventory and exceptions connected from origin to delivery.",
    capabilities: "Shipments · Inventory · Routes · Exceptions",
    image: "/assets/figma/use-logistics.png",
  },
  {
    id: "service-ops",
    title: "Service Ops",
    description: "Give every service team a single view of the work, customers and next action.",
    capabilities: "Requests · Scheduling · Teams · Customer history",
    image: "/assets/figma/use-service-ops.png",
  },
  {
    id: "approvals",
    title: "Review & Approvals",
    description: "Route critical decisions through the people and context needed to make them.",
    capabilities: "Requests · Policies · Reviewers · Audit trails",
    image: "/assets/raw-15.png",
  },
] as const;

const platformStories = [
  {
    id: "built-around-you",
    title: "Built around your business",
    description: "Your workspace reflects the people, work, rules and terminology your operation actually uses.",
    mockup: "/assets/figma/hero-challenges.png",
  },
  {
    id: "managed",
    title: "Managed by us",
    description: "We run the infrastructure and keep your system improving as your operation changes.",
    mockup: "/assets/figma/hero-challenges.png",
  },
  {
    id: "ready",
    title: "Ready for your team",
    description: "Give people an interface that fits the work they do every day.",
    mockup: "/assets/figma/hero-challenges.png",
  },
  {
    id: "evolves",
    title: "Built to evolve",
    description: "Add new workflows and capabilities without rebuilding the foundation.",
    mockup: "/assets/figma/hero-challenges.png",
  },
] as const;

type UseCaseId = (typeof useCases)[number]["id"];
type PlatformStoryId = (typeof platformStories)[number]["id"];

export function UseCaseAccordion() {
  const [activeId, setActiveId] = useState<UseCaseId>("manufacturing");
  const [pendingId, setPendingId] = useState<UseCaseId | null>(null);
  const [showDetails, setShowDetails] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!pendingId) return;

    let enterTimer: number | undefined;
    const exitTimer = window.setTimeout(
      () => {
        setActiveId(pendingId);
        enterTimer = window.setTimeout(
          () => {
            setShowDetails(true);
            setPendingId(null);
          },
          reduceMotion ? 0 : motionTokens.accordionEnterDelay * 1000,
        );
      },
      reduceMotion ? 0 : motionTokens.accordionExit * 1000,
    );

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(enterTimer);
    };
  }, [pendingId, reduceMotion]);

  const selectUseCase = (nextId: UseCaseId) => {
    if (nextId === activeId && !pendingId) return;

    setShowDetails(false);
    setPendingId(nextId);
  };

  return (
    <div className="use-case-accordion" aria-label="Operations Superspace can support">
      {useCases.map((useCase) => {
        const isActive = activeId === useCase.id;

        return (
          <button
            className={`use-case ${isActive ? "use-case--active" : ""}`}
            key={useCase.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => selectUseCase(useCase.id)}
          >
            <Image
              className="use-case__image"
              src={useCase.image}
              alt=""
              fill
              sizes="(max-width: 760px) 100vw, 708px"
            />
            <span className="use-case__shade" />
            <span className="use-case__copy">
              <motion.span
                className="use-case__title"
                layout={reduceMotion ? false : "position"}
                transition={{ layout: motionTokens.layout }}
              >
                {useCase.title}
              </motion.span>
              <AnimatePresence mode="wait" initial={false}>
                {isActive && showDetails && (
                  <motion.span
                    className="use-case__details"
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: 5, transition: { duration: 0.14 } }}
                    transition={{ delay: reduceMotion ? 0 : motionTokens.accordionEnterDelay, ...motionTokens.fast }}
                  >
                    <span>{useCase.description}</span>
                    <small>{useCase.capabilities}</small>
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function OperationShowcase() {
  const [activeId, setActiveId] = useState<PlatformStoryId>("built-around-you");
  const reduceMotion = useReducedMotion();
  const panelId = useId();
  const active = platformStories.find((story) => story.id === activeId)!;

  return (
    <div className="operation-showcase">
      <div className="operation-showcase__left">
        <h2 id="operation-title">Your operation, running on Superspace.</h2>
        <div className="operation-showcase__rail" role="tablist" aria-label="How Superspace works">
          {platformStories.map((story) => {
            const isActive = activeId === story.id;

            return (
              <motion.button
                className={
                  isActive ? "operation-showcase__tab operation-showcase__tab--active" : "operation-showcase__tab"
                }
                key={story.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveId(story.id)}
                layout
                transition={{ layout: motionTokens.layout }}
              >
                <motion.span className="operation-showcase__title" layout="position">
                  {story.title}
                </motion.span>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.span
                      className="operation-showcase__description"
                      initial={reduceMotion ? false : { height: 0, opacity: 0, y: -6 }}
                      animate={{ height: "auto", opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { height: 0, opacity: 0, y: -4 }}
                      transition={motionTokens.fast}
                    >
                      {story.description}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="operation-showcase__stage" role="tabpanel" id={panelId} aria-label={active.title}>
        <Image
          className="operation-showcase__metal"
          src="/assets/chromatic-metal-1.png"
          alt=""
          fill
          sizes="(max-width: 760px) 100vw, 960px"
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="operation-showcase__mockup"
            key={active.id}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 1.015 }}
            transition={motionTokens.featured}
          >
            <Image
              className="operation-showcase__screen"
              src={active.mockup}
              alt="Superspace workspace"
              width={1287}
              height={820}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

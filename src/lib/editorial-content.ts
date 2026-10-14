export type EditorialBlock = { text: string; strong?: boolean };
export type EditorialChapter = { id: string; label: string; title: string; blocks: EditorialBlock[] };

export const aboutSections: EditorialChapter[] = [
  {
    id: "idea",
    label: "The idea",
    title: "Building software around the way businesses work.",
    blocks: [
      {
        text: "Every business operates differently. We believe its software should reflect that.",
      },
      {
        text: "Superspace is building a new foundation for operational software. One that adapts to how organizations actually work, evolves as they grow, and makes sophisticated technology accessible without requiring every company to build it from scratch.",
      },
      {
        text: "Different businesses. One underlying engine. Endless ways to operate.",
        strong: true,
      },
    ],
  },
  {
    id: "story",
    label: "Our story",
    title: "Our Story.",
    blocks: [
      {
        text: "We’ve seen the same problem across very different businesses.",
      },
      {
        text: "As companies grow, their operations evolve. New processes emerge. Teams expand. Responsibilities shift. What worked yesterday starts getting in the way of what needs to happen tomorrow.",
      },
      {
        text: "But their software doesn’t always keep up.",
      },
      {
        text: "Some businesses bend their operations to fit existing tools. Others invest in custom software, building and maintaining the same fundamental capabilities over and over again.",
      },
      {
        text: "Permissions. Workflows. State transitions. Integrations. Audit trails. Different applications, familiar machinery.",
      },
      {
        text: "We kept wondering why.",
      },
      {
        text: "Beneath the differences between industries and organizations, we saw recurring patterns: objects, people, relationships, actions, rules, and states.",
      },
      {
        text: "And eventually, one question became impossible to ignore:",
      },
      {
        text: "What if businesses could change the way they operate without rebuilding the software that runs them?",
        strong: true,
      },
      {
        text: "So we started building SuperSpace.",
      },
    ],
  },
  {
    id: "approach",
    label: "The approach",
    title: "A different approach.",
    blocks: [
      {
        text: "We model the business. Our technology does the rest.",
        strong: true,
      },
      {
        text: "At the heart of Superspace is a domain-agnostic operational runtime: a shared engine designed to understand and execute different business operations.",
      },
      {
        text: "Instead of building a separate application for every organization, we describe how that organization works: its objects, relationships, rules, actions, permissions, and states.",
      },
      {
        text: "Our runtime turns those definitions into working software, including the interfaces people use to interact with it.",
      },
      {
        text: "Dashboards, tables, detail pages, and operational actions emerge from the same underlying models.",
      },
      {
        text: "When the business changes, the model can change with it. Translating real operations into working systems without writing new application-specific code.",
      },
      {
        text: "It’s an ambitious idea, and we’re still early. But the technology is real. And it’s working.",
      },
      {
        text: "The complexity belongs in the engine. The possibilities belongs to the people using it.",
        strong: true,
      },
    ],
  },
  {
    id: "values",
    label: "What drives us",
    title: "What guides us",
    blocks: [
      {
        text: "Curiosity before assumptions.",
        strong: true,
      },
      {
        text: "We question the obvious, challenge conventions, and look for patterns where others see unrelated problems. The most interesting solutions often begin with asking why something has to work the way it does.",
      },
      {
        text: "Experimentation with purpose.",
      },
      {
        text: "We love ambitious ideas. We love seeing them work even more. We build, test, learn, and let reality have the final word.",
      },
      {
        text: "Craft in everything.",
      },
      {
        text: "We care about what happens deep inside the engine and what someone experiences when they click a button. Elegant abstractions mean little if they don’t make people’s lives easier. Both sides deserve obsessive attention.",
      },
      {
        text: "Ambition without pretense.",
      },
      {
        text: "We’re a small team taking on a very big problem. We don’t pretend to have all the answers, and we don’t believe meaningful technology requires a famous address or an enormous organization behind it.",
      },
      {
        text: "We believe in doing the work, proving what works, and enjoying the hell out of figuring out the rest.",
      },
    ],
  },
  {
    id: "next",
    label: "What’s next",
    title: "Built for what’s next.",
    blocks: [
      {
        text: "We imagine a world where starting a business, exploring a new operating model, or changing the way an organization works doesn’t mean starting over with its software.",
      },
      {
        text: "Where technology gives businesses room to experiment, adapt, and become something they couldn’t have been before.",
      },
      {
        text: "Where powerful operational infrastructure is no longer a privilege reserved for companies that can afford to build it themselves.",
      },
      {
        text: "That’s the future we’re building toward.",
      },
      {
        text: "And we’re just getting started.",
      },
    ],
  },
];

export const manifestoSections: EditorialChapter[] = [
  {
    id: "problem",
    label: "The problem",
    title: "Software should make more things possible.",
    blocks: [
      {
        text: "Somewhere along the way, we started treating the limitations of software as the natural limitations of business.",
      },
      {
        text: "We learned to adapt our processes to the tools available. To organize teams around what systems allow. To accept that changing how a company operates often means changing half the software it depends on.",
      },
      {
        text: "We got used to it.",
      },
      {
        text: "We don’t think we should have.",
        strong: true,
      },
    ],
  },
  {
    id: "change",
    label: "Change is natural",
    title: "Businesses are not static. Why is their software?",
    blocks: [
      {
        text: "A business is a living thing.",
      },
      {
        text: "People join. Roles change. New ideas emerge. Processes evolve. Entire ways of operating are invented, tested, abandoned, and reinvented.",
      },
      {
        text: "That’s how progress happens.",
      },
      {
        text: "Yet much of the software businesses depend on is built around assumptions about how they are supposed to work.",
      },
      {
        text: "When those assumptions stop being true, the software becomes an obstacle.",
      },
      {
        text: "We believe it should be the opposite.",
      },
    ],
  },
  {
    id: "foundation",
    label: "Build once",
    title: "Reinvention shouldn’t require reconstruction.",
    blocks: [
      {
        text: "Every day, companies solve versions of the same technological problems.",
      },
      {
        text: "Who can do what? What can happen next? Which rules must hold? How do people, resources, and processes relate? What happened, when, and why?",
      },
      {
        text: "These are hard problems. Important problems.",
      },
      {
        text: "But they shouldn’t have to be solved from scratch every time someone wants to build a better business.",
      },
      {
        text: "We believe the underlying machinery of operations can be shared, while the ways organizations use it remain their own.",
      },
      {
        text: "Build the foundations once. Make room for a million different ideas.",
        strong: true,
      },
    ],
  },
  {
    id: "difference",
    label: "Build what makes you different",
    title: "Build what makes you different.",
    blocks: [
      {
        text: "We love building things.",
      },
      {
        text: "And we believe everyone should have the freedom to create technology that works exactly the way they imagine.",
      },
      {
        text: "But there’s a difference between building something new and rebuilding something that already exists.",
      },
      {
        text: "Every business needs ways to manage permissions, enforce rules, coordinate actions, track changes, and keep its operations consistent.",
      },
      {
        text: "These are essential capabilities. They are also problems that have been solved, in slightly different forms, countless times.",
      },
      {
        text: "We don’t think every organization should have to solve them again.",
      },
      {
        text: "Not when starting a business. Not when introducing a new process. Not when building another application.",
      },
      {
        text: "And certainly not every time the business evolves.",
      },
      {
        text: "We believe technology should provide a common foundation for the things organizations share, while leaving them free to create everything that makes them unique.",
      },
      {
        text: "Build your own interfaces. Explore new ideas. Invent new ways of working.",
      },
      {
        text: "Build what makes you different. Don’t rebuild what makes it work.",
        strong: true,
      },
    ],
  },
  {
    id: "complexity",
    label: "Own the complexity",
    title: "Complexity is our responsibility.",
    blocks: [
      {
        text: "The world doesn’t need more software that makes people think like programmers.",
        strong: true,
      },
      {
        text: "It needs technology sophisticated enough to understand how people actually work.",
      },
      {
        text: "That takes serious engineering.",
      },
      {
        text: "Abstractions that hold up in reality. Systems that remain dependable when things get complicated. Interfaces that make sense to the people using them.",
      },
      {
        text: "We don’t believe simplicity comes from avoiding complexity. We believe simplicity is what happens when complexity is handled well.",
      },
      {
        text: "And we’re willing to do the hard work underneath.",
      },
    ],
  },
  {
    id: "possibility",
    label: "Freedom to evolve",
    title: "Here’s to the crazy ones.",
    blocks: [
      {
        text: "Imagine being able to change an operation without commissioning another application.",
      },
      {
        text: "To explore a new business model without rebuilding the systems around it.",
      },
      {
        text: "To give a growing company capabilities that once required a dedicated software engineering organization.",
      },
      {
        text: "Not because every business should work the same way.",
      },
      {
        text: "But because every business deserves the freedom to work differently.",
      },
      {
        text: "That’s the possibility that excites us. Not software f it’s own sake.",
      },
      {
        text: "What people might build when software stops getting in their way.",
        strong: true,
      },
    ],
  },
  {
    id: "future",
    label: "The future is open",
    title: "We’re not here to predict the future.",
    blocks: [
      {
        text: "We don’t know what the next generation of businesses will look like. And we think that’s wonderful.",
      },
      {
        text: "The most interesting ideas haven’t been imagined yet. The most inventive operating models haven’t been tested. Some of tomorrow’s most important companies might be starting in a bedroom somewhere today.",
      },
      {
        text: "They shouldn’t need to ask their software for permission to become something new.",
      },
      {
        text: "We’re building SuperSpace because we believe the next generation of business software shouldn’t prescribe how organizations operate.",
      },
      {
        text: "It should give them the tools to figure that out for themselves.",
      },
      {
        text: "The future of business shouldn’t be limited by the software of the past.",
      },
      {
        text: "And we’re here to do something about it.",
      },
    ],
  },
];

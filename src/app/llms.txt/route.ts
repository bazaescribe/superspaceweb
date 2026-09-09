import { siteDescription, siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

const pages = [
  ["Platform", "/platform", "How Matrix, Flow, and Atlas model, run, and contextualize an operation."],
  ["Solutions", "/solutions", "Operational patterns and the types of growing companies Superspace serves."],
  ["Company", "/company", "The company, product thesis, and approach behind Superspace."],
  ["Contact", "/contact", "How to start a conversation about an operational system."],
] as const;

export function GET() {
  const links = pages
    .map(([label, path, description]) => `- [${label}](${new URL(path, siteUrl)}): ${description}`)
    .join("\n");

  return new Response(
    `# Superspace\n\n> ${siteDescription}\n\nSuperspace is a Mexico City company building managed operational software for growing teams. It models the people, records, relationships, rules, workflows, and context of a business as one working system.\n\n## Core pages\n\n${links}\n`,
    { headers: { "content-type": "text/plain; charset=utf-8" } },
  );
}

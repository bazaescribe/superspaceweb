import { SiteHero } from "@/components/site-hero";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeaderThemeScope, HeaderThemeRegion } from "@/components/header-theme";
import { BookingLink } from "@/components/booking-link";
import { SystemSection, SectionBuffer, SplitContent } from "@/components/section-system";
import { ShapeSystemVisual } from "@/components/shape-system-card";
import { ConnectBlockVisual } from "@/components/connect-block-card";
import { WorkOrbitVisual } from "@/components/work-orbit-card";
import { createPageMetadata } from "@/lib/seo";
import styles from "./deployment.module.css";
import { DeploymentCostChart } from "@/components/deployment-cost-chart";

export const metadata = createPageMetadata({
  title: "Deployment — A working system, managed for you",
  description:
    "Understand the Superspace discovery engagement, monthly managed service, and how deployment compares with SaaS, AI-assisted DIY, consulting, and building software internally.",
  path: "/deployment",
});

const stages = [
  {
    title: "Discover",
    description:
      "We work with your team to map one important operation: the people, information, handoffs, rules, and exceptions behind it.",
    visual: <ShapeSystemVisual hovered={false} />,
    outcome: "An operating map and a shared understanding of the problem.",
    label: "01 / Understand the work",
  },
  {
    title: "Define",
    description:
      "Together, we decide what the first deployment should cover. Scope, responsibilities, commercial terms, and rollout expectations are agreed before implementation.",
    visual: <ShapeSystemVisual hovered />,
    outcome: "A clear deployment proposal, with scope and fees agreed.",
    label: "02 / Agree on the system",
  },
  {
    title: "Configure",
    description:
      "We configure the shared Superspace platform around your operation, connecting your information, workflows, roles, and interfaces. Your team helps validate real scenarios.",
    visual: <ConnectBlockVisual />,
    outcome: "A configured workspace, validated against the way you work.",
    label: "03 / Bring it together",
  },
  {
    title: "Launch",
    description:
      "We help your team get comfortable with the workspace and bring it into everyday use. The operating model becomes a system people can work in.",
    visual: <WorkOrbitVisual />,
    outcome: "A team ready to use its new operational workspace.",
    label: "04 / Put it to work",
  },
  {
    title: "Evolve",
    description:
      "We manage the platform as you use it. As your operation changes, we scope the next improvements together; changes and extensions are handled through paid support hours.",
    visual: <WorkOrbitVisual />,
    outcome: "Ongoing platform management and a path for the next improvement.",
    label: "05 / Keep moving",
  },
].map(({ visual, outcome, label, ...stage }) => ({
  ...stage,
  visual: (
    <div className={styles.stage}>
      <span className={styles.stageLabel}>{label}</span>
      <div className={styles.stageArt}>{visual}</div>
      <div className={styles.stageOutcome}>
        <span>What you get</span>
        <p>{outcome}</p>
      </div>
    </div>
  ),
}));

type Rating = "Yes" | "No" | "Varies" | "Low" | "Medium" | "High";
const comparison: { label: string; values: Rating[] }[] = [
  { label: "Configured around your operation", values: ["Yes", "Varies", "Yes", "Yes", "Yes"] },
  { label: "Platform maintenance included", values: ["Yes", "Yes", "No", "Varies", "No"] },
  { label: "Infrastructure managed for you", values: ["Yes", "Yes", "Varies", "Varies", "No"] },
  { label: "Workflow changes handled for you", values: ["Yes", "Varies", "No", "Varies", "No"] },
  { label: "Control over source code", values: ["No", "No", "Yes", "Varies", "Yes"] },
  { label: "Technical effort for your team", values: ["Low", "Low", "High", "Medium", "High"] },
  { label: "Maintenance responsibility for your team", values: ["Low", "Low", "High", "Varies", "High"] },
];

function ComparisonRating({ value }: { value: Rating }) {
  if (value === "Yes" || value === "No")
    return (
      <span className={value === "Yes" ? styles.yes : styles.no}>
        <span aria-hidden="true">{value === "Yes" ? "✓" : "—"}</span>
        <span className="sr-only">{value}</span>
      </span>
    );
  return <span className={`${styles.rating} ${value === "Low" ? styles.low : ""}`}>{value}</span>;
}

export default function DeploymentPage() {
  return (
    <HeaderThemeScope className={`site-v2 ${styles.page}`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <SiteHero
          title="A system built around your work. Managed for you."
          intro={
            <>
              {" "}
              We understand your operation, configure Superspace around it, and keep the platform running. Your team
              gets a working system without taking on a software maintenance job.{" "}
            </>
          }
          actions={
            <>
              {" "}
              <BookingLink placement="deployment_hero" label="Talk about your operation" designIcon />
              <a className="button button--secondary" href="#engagement">
                What am I buying?
              </a>{" "}
            </>
          }
        />
        <div className="v24-spine system-spine">
          <div className={styles.summary} aria-label="The deployment journey">
            <div>
              <span>01 / Start with clarity</span>
              <strong>Discover the operation</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>02 / Make it work</span>
              <strong>Configure your workspace</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>03 / Keep it working</span>
              <strong>Operate with us</strong>
            </div>
          </div>
          <SectionBuffer />
          <div id="engagement" className={styles.anchor}>
            <SystemSection primary="A focused engagement to begin. " accent="A monthly service to keep going.">
              <div className={styles.engagements}>
                <article className={styles.engagement}>
                  <div className={styles.cardTop}>
                    <span>Start here</span>
                    <span>01</span>
                  </div>
                  <div className={styles.cardArt}>
                    <ShapeSystemVisual hovered={false} />
                  </div>
                  <div className={styles.cardCopy}>
                    <p className={styles.kicker}>Discovery engagement</p>
                    <h3>Understand before we implement.</h3>
                    <p>
                      A paid, focused engagement to understand the operation and define what the first deployment needs
                      to do.
                    </p>
                    <ul>
                      <li>Map the people, information, and workflows.</li>
                      <li>Identify handoffs, rules, and exceptions.</li>
                      <li>Agree the initial scope and deployment proposal.</li>
                    </ul>
                    <div className={styles.cardNote}>Engagement scope and fee are agreed before we begin.</div>
                  </div>
                </article>
                <article className={styles.engagement}>
                  <div className={styles.cardTop}>
                    <span>Keep moving</span>
                    <span>02</span>
                  </div>
                  <div className={styles.cardArt}>
                    <WorkOrbitVisual />
                  </div>
                  <div className={styles.cardCopy}>
                    <p className={styles.kicker}>Monthly service fee</p>
                    <h3>A working system, with a team behind it.</h3>
                    <p>
                      Ongoing access to your configured workspace and management of the Superspace platform. Your team
                      uses the system; we take care of the software.
                    </p>
                    <ul>
                      <li>A shared workspace for everyday operations.</li>
                      <li>Platform operation, maintenance, and updates.</li>
                      <li>A continuing relationship as your needs evolve.</li>
                    </ul>
                    <div className={styles.cardNote}>
                      Changes and extensions are scoped separately through paid support hours.
                    </div>
                  </div>
                </article>
              </div>
            </SystemSection>
          </div>
          <SystemSection
            className="system-section--deployment"
            primary="From the way you work "
            accent="to a workspace you can use."
          >
            <SplitContent items={stages} variant="steps" />
          </SystemSection>
        </div>
        <HeaderThemeRegion tone="dark" className="v24-dark" data-theme="dark">
          <div className="v24-spine system-spine">
            <SystemSection
              primary="Your operation is specific. "
              accent="Your software doesn’t need its own maintenance team."
            >
              <div className={styles.managed}>
                <div className={styles.managedCopy}>
                  <p className={styles.kicker}>Configured for you. Maintained by us.</p>
                  <h3>Buy the capability to run your operation.</h3>
                  <p>
                    Your deployment is configured on the shared Superspace platform. You don’t receive a separate fork
                    or source code handoff: there is no private codebase for your team to host, patch, or keep
                    compatible as the platform evolves.
                  </p>
                  <p>We maintain the platform. You own your company’s data and can export it at any time.</p>
                </div>
                <div className={styles.responsibilities}>
                  <div>
                    <span>Superspace looks after</span>
                    <h4>The platform</h4>
                    <p>Software maintenance, platform updates, and keeping the service operating.</p>
                  </div>
                  <div>
                    <span>Your team focuses on</span>
                    <h4>The operation</h4>
                    <p>The people, decisions, and everyday work that move your business forward.</p>
                  </div>
                  <div className={styles.shared}>
                    <span>We shape together</span>
                    <h4>What comes next</h4>
                    <p>New workflows and improvements, with scope and cost agreed before additional work.</p>
                  </div>
                </div>
              </div>
            </SystemSection>
            <SystemSection primary="A clearer cost picture. " accent="Fewer responsibilities to carry.">
              <DeploymentCostChart />
            </SystemSection>
          </div>
        </HeaderThemeRegion>
        <div className="v24-spine system-spine">
          <SystemSection primary="Different ways to buy software. " accent="Different responsibilities come with them.">
            <p className={styles.comparisonIntro}>
              Superspace sits between an off-the-shelf application and building your own software: a system modeled
              around your operation, delivered through a managed platform.
            </p>
            <div className={styles.scoreLegend}>
              <span>
                <b>✓</b> Yes
              </span>
              <span>
                <b>—</b> No
              </span>
              <span>Varies by product or agreement</span>
            </div>
            <p className={styles.mobileHint}>Swipe across to compare the options →</p>
            <div
              className={styles.tableScroll}
              role="region"
              aria-label="Compare software delivery options"
              tabIndex={0}
            >
              <table className={styles.table}>
                <caption>
                  Typical delivery models; products and contracts vary. “Yes” means available within the delivery model,
                  not unlimited work. Superspace workflow changes are scoped and billed separately. AI-assisted DIY
                  assumes your team owns the build and ongoing operation.
                </caption>
                <thead>
                  <tr>
                    <th scope="col">What to consider</th>
                    <th scope="col">
                      <span>Modeled + managed</span>Superspace
                    </th>
                    <th scope="col">Off-the-shelf SaaS</th>
                    <th scope="col">
                      <span>AI-assisted DIY</span>Build with AI
                    </th>
                    <th scope="col">Consulting project</th>
                    <th scope="col">Internal team</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      {row.values.map((value, index) => (
                        <td key={index}>
                          <ComparisonRating value={value} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SystemSection>
          <SystemSection primary="Start with one important operation. " accent="Agree on what success looks like.">
            <div className={styles.fit}>
              <div>
                <span className={styles.kicker}>A good starting point</span>
                <h3>Work that has outgrown its tools.</h3>
                <p>
                  An established operation held together by spreadsheets, messages, disconnected applications, or too
                  much manual coordination.
                </p>
              </div>
              <div>
                <span className={styles.kicker}>Before you commit to deployment</span>
                <h3>A clear scope. A shared plan.</h3>
                <p>
                  We agree what is covered, what your team needs to contribute, the rollout approach, and the fees. You
                  can evaluate the proposal before deciding to proceed.
                </p>
              </div>
            </div>
          </SystemSection>
        </div>
      </main>
      <Footer />
    </HeaderThemeScope>
  );
}

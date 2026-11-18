import styles from "./home-narrative.module.css";

const layers = [
  {
    name: "Interfaces",
    detail: "People · Apps · AI agents · API",
    text: "People, applications, and agents share the same business context and governed actions. People keep final decision authority.",
    tone: "interfaces",
  },
  {
    name: "Business model",
    detail: "Specific to your business",
    text: "Your objects, relationships, states, roles, and workflows.",
    tone: "model",
  },
  {
    name: "Rules and actions",
    detail: "Shared foundation",
    text: "What can happen, who can do it, and what it changes.",
    tone: "foundation",
  },
  {
    name: "Capabilities",
    detail: "Shared foundation",
    text: "Reusable operational logic and interface patterns, such as Resource Allocation.",
    tone: "foundation",
  },
  {
    name: "Ontology engine",
    detail: "Shared foundation",
    text: "Interprets each business model and runs it as working software.",
    tone: "foundation",
  },
] as const;

/** The platform layers, from the interfaces people use down to the engine. */
export function PlatformStack() {
  return (
    <div className={styles.stack}>
      <ol className={styles.layers}>
        {layers.map((layer) => (
          <li key={layer.name} data-tone={layer.tone}>
            <div>
              <strong>{layer.name}</strong>
              <small>{layer.detail}</small>
            </div>
            <p>{layer.text}</p>
          </li>
        ))}
      </ol>
      <p className={styles.note}>
        Governed collaboration between people and AI is the design direction. Orchestration of external systems is on
        the roadmap.
      </p>
    </div>
  );
}

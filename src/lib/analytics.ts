export const analyticsEventName = "superspace:analytics";

export type AnalyticsEvent =
  | { name: "page_view"; path: string }
  | {
      name: "cta_clicked";
      cta: "talk_to_us";
      destination: string;
      placement: string;
    };

declare global {
  interface WindowEventMap {
    [analyticsEventName]: CustomEvent<AnalyticsEvent>;
  }
}

/**
 * First-party event boundary. A future analytics provider can subscribe to this
 * browser event without coupling UI components to a vendor SDK.
 */
export function track(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(analyticsEventName, { detail: event }));

  if (process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true") {
    console.info("[analytics]", event);
  }
}

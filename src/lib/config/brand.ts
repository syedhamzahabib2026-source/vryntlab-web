/**
 * Brand / product copy for the chatbot UI and lead pipeline.
 * Core logic stays generic; tune these when reusing the widget elsewhere.
 */

export const DEFAULT_LEAD_SOURCE = "vryntlab-site";

export const brand = {
  /** Shown in email subjects, Slack headers, and notification intros */
  shortName: "VryntLab",
  /** OpenRouter attribution (optional header) */
  openRouterAppName: "VryntLab AI",
} as const;

export const chatWidgetDefaults = {
  title: "Ask VryntLab",
  placeholder: "Message…",
  emptyThreadHint: "Say something when you're ready.",
  newChatLabel: "New chat",
  sendLabel: "Send",
  sendingLabel: "…",
  launcherAriaLabel: "Ask VryntLab — open chat",
  closeAriaLabel: "Close chat",
  /** Visible label next to launcher on `md+` viewports */
  launcherButtonLabel: "Ask",
  /** sessionStorage key for conversation id */
  sessionStorageKey: "vryntlab_conversation_id",
  proactiveGreetings: [
    "Hey — what are you looking to get done?",
    "Hey, what kind of project are you thinking about?",
    "What are you trying to build?",
  ] as const,
} as const;

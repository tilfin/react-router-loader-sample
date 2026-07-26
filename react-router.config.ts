import type { Config } from "@react-router/dev/config";

export default {
  // Authentication and the demo API use browser storage, so this app is a SPA.
  ssr: false,
} satisfies Config;

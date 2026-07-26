import type { LoaderFunctionArgs } from "react-router";
import { requireSession } from "../../src/auth/auth";

export { AppLayout as default } from "../../src/components/layout/AppLayout";
export { RouteError as ErrorBoundary } from "../../src/components/layout/RouteError";

export function clientLoader({ request }: LoaderFunctionArgs) {
  return { user: requireSession(request).user };
}

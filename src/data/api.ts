import { requireSession } from '../auth/auth'
import { createUserApi } from './users'

/**
 * Creates a request-scoped API client with authentication already attached.
 * In production this is the seam for a fetch client that sets the Bearer token.
 */
export function authenticatedApi(request: Request) {
  const session = requireSession(request)

  return {
    users: createUserApi({
      accessToken: session.accessToken,
      groups: session.user.groups,
    }),
  }
}

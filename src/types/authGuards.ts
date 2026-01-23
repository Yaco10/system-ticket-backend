import { AuthRequest, AuthenticatedRequest } from "./auth.types";

export function assertAuthenticated(
  req: AuthRequest
): asserts req is AuthenticatedRequest {
  if (!req.userId) {
    throw new Error("Unauthenticated");
  }
}



/**
 * UED Mock Route Registry
 *
 * Default: ALL endpoints use real dev backend with real accessToken.
 * Only add routes here for NEW features that UED is designing
 * and the real API doesn't exist yet.
 *
 * Lifecycle:
 *   1. UED designs new feature → add mock endpoint here
 *   2. trade-fe implements real API → remove from here, use real API
 *   3. Sync code back to trade-fe
 *
 * Example:
 *   { pattern: '/new-feature/list', data: { items: [...mockData] } }
 */

export interface MockRoute {
  pattern: string;
  data: any;
  paramMatch?: Record<string, any>;
}

// Currently empty — all endpoints use real dev backend
export const mockRoutes: MockRoute[] = [
  // Add new UED feature mock endpoints below:
  // { pattern: '/your/new/endpoint', data: { ... } },
];

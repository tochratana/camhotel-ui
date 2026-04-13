export type RouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

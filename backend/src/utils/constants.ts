import { Router } from "express";
import IndexRoutes from "../routes/index.routes";

import SearchRoutes from "../routes/search.routes";

interface RoutesInformationModel {
  title: string;
  path: string;
  routes: Router;
}
export const routesInformation: RoutesInformationModel[] = [
  {
    title: "Index",
    path: "/api",
    routes: IndexRoutes,
  },
  {
    title: "Manage search",
    path: "/api/search",
    routes: SearchRoutes,
  },
];

import React from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import Details from "../components/Details/Details";
import StartShips from "../components/StartShips";
import Species from "../components/Species";
import People from "../components/People";

interface CustomRouteProps {
  path: string;
  component: React.ComponentType<any>;
  title?: string;
}

const routes: CustomRouteProps[] = [
  { path: "/", component: Dashboard },
  { path: "/details/:id", component: Details },
  { path: "/startships", component: StartShips },
  { path: "/people", component: People },
  { path: "/species", component: Species },
];

export default routes;

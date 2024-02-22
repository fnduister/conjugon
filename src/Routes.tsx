import React from 'react'
import { createBrowserRouter, Link } from "react-router-dom";
import Account from "./Pages/Account/Account";
import Home from './Pages/Home/Home';
import Error from './Pages/Error/Error';
import Pregame from "./Pages/Pregame/Pregame";
import App from './App';
import Race from './Pages/Games/Race/Race';
import Games from "./Pages/Games/Games";
import BreadCrumbsItem from './Components/Breadcrumbs/BreadCrumbsItem';
import FindError from './Pages/Games/FindError/FindError';
import Complete from './Pages/Games/Complete/Complete';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import MoveMe from './Pages/Games/MoveMe/MoveMe';
import AddVerbPage from './Pages/AddVerb/AddVerbPage';
import NotFoundPage from './Pages/NotFound/NotFoundPage';


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    handle: { crumb: { name: "Home", path: "/" } },
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/pregame",
        element: <ErrorBoundary>

          <Pregame />
        </ErrorBoundary>,
        handle: { crumb: { name: "Pregame", path: "/pregame" } },
      },
      {
        path: "/add-verb",
        element: <ErrorBoundary>

          <AddVerbPage />
        </ErrorBoundary>,
        handle: { crumb: { name: "AddVerb", path: "/add-verb" } },
      },
      {
        path: "/games",
        element: <Games />,

        children: [
          {
            path: "/games/race",
            element: <ErrorBoundary>

              <Race />
            </ErrorBoundary>
            ,
            handle: { crumb: { name: "Race", path: "/games/race" } },
          },
          {
            path: "/games/find-error",
            element: <ErrorBoundary>

              <FindError />
            </ErrorBoundary>,
            handle: { crumb: { name: "Trouve l'erreur", path: "/games/find-error" } },
          },
          {
            path: "/games/complete",
            element: <ErrorBoundary>

              <Complete />
            </ErrorBoundary>,
            handle: { crumb: { name: "Complete", path: "/games/complete" } },

          },
          {
            path: "/games/move-me",
            element: <ErrorBoundary>

              <MoveMe />
            </ErrorBoundary>,
            handle: { crumb: { name: "Bouge moi", path: "/games/move-me" } },
          }
        ]
      },
      {
        path: "/account",
        element: <Account />,
        handle: { crumb: { name: "Account", path: "/account" } },
      },
    ]
  },
  {
    path: "*",
    element: < NotFoundPage />,
    handle: { crumb: { name: "Pregame", path: "/pregame" } },
  },

]);
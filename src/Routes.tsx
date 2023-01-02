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

]);
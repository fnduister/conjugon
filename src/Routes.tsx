import { createBrowserRouter } from "react-router-dom";
import Account from "./Pages/Account/Account";
import Home from './Pages/Home/Home';
import Error from './Pages/Error/Error';
import Pregame from "./Pages/Pregame/Pregame";
import App from './App';
import Race from './Pages/Games/Race/Race';
import Games from "./Pages/Games/Games";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/pregame/:gameId",
        element: <Pregame />,
      },
      {
        path: "/games",
        element: <Games />,
        children: [
          {
            path: "/games/race",
            element: <Race />,
          }
        ]
      },
      {
        path: "/account",
        element: <Account />,
      },
    ]
  },

]);
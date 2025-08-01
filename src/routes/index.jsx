import HomeTemplate from "../pages/HomeTemplate";
import Home from "../pages/HomeTemplate/Home";
import About from "../pages/HomeTemplate/About";
import ListMovie from "../pages/HomeTemplate/ListMovie";

import AdminTemplate from "../pages/AdminTemplate";
import User from "../pages/AdminTemplate/User";

import Login from "../pages/Login";
import Register from "../pages/Register";

import { Route } from "react-router-dom";

const routes = [
  {
    path: "",
    element: HomeTemplate,
    nested: [
      {
        path: "",
        element: Home,
      },
      {
        path: "about",
        element: About,
      },
      {
        path: "list-movie",
        element: ListMovie,
      },
    ],
  },
  {
    path: "admin",
    element: AdminTemplate,
    nested: [
      {
        path: "user",
        element: User,
      },
    ],
  },
  {
    path: "login",
    element: Login,
  },
  {
    path: "register",
    element: Register,
  }
];
export const renderRoute = () => {
  return routes.map((router) => {
    if (router.nested) {
      return (
        <Route
          key={router.element}
          path={router.path}
          element={<router.element />}
        >
          {router.nested.map((routerNested) => {
            return (
              <Route
                key={routerNested.element}
                path={routerNested.path}
                element={<routerNested.element />}
              />
            );
          })}
        </Route>
      );
    } else {
      return <Route path={router.path} element={<router.element />}/>
    }
  });
};

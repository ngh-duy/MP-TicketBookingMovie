import HomeTemplate from "../pages/HomeTemplate";
import Home from "../pages/HomeTemplate/Home";
import About from "../pages/HomeTemplate/About";
import ListMovie from "../pages/HomeTemplate/ListMovie";
import BookingMovie from "../pages/HomeTemplate/BookingMovie";

import AdminTemplate from "../pages/AdminTemplate";
import User from "../pages/AdminTemplate/User";
import Dashboard from "../pages/AdminTemplate/Dashboard";
import Profile from "../pages/AdminTemplate/Profile";
import Movie from "../pages/AdminTemplate/Movie";

import Login from "../pages/Login";
import Register from "../pages/Register";

import Modal from "../pages/_components/modal";

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
      {
        path: "booking/:maphim",
        element: BookingMovie,
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
       {
        path: "dashboard",
        element: Dashboard,
      },
       {
        path: "movie",
        element: Movie,
      },
       {
        path: "profile",
        element: Profile,
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
  },
    {
    path: "modal",
    element: Modal,
  },

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

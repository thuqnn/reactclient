import "./App.css";
import React, {
  useEffect,
  createContext,
  useReducer,
  useContext,
  useState,
} from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Cookie from "js-cookie";

import { Header } from "./components/Navbar/Header";
import { Home } from "./components/Screens/Home";
import { Login } from "./components/Screens/Login";
import { Register } from "./components/Screens/Register";
import { Profile } from "./components/Screens/Profile";
import { CreatePost } from "./components/Screens/CreatePost";
import { UserProfile } from "./components/Screens/UserProfile";
import { SubUserPost } from "./components/Screens/SubUserPost";

import { reducer, initialState } from "./reducer/UserReducer";

import "./lib/font-awesome/css/all.min.css";

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    if (state !== undefined) {
      try {
        const user = JSON.parse(Cookie.get("user"));
        if (user) {
          dispatch({ type: "USER", payload: user });
        }
      } catch (errror) {
        if (!history.location.pathname.startsWith("/reset"))
          history.push("/login");
      }
    }
    //const user = JSON.parse(localStorage.getItem("user"));
  }, []);
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/create">
        <CreatePost />
      </Route>
      <Route exact path="/profile/:id">
        <UserProfile />
      </Route>
      <Route exact path="/myfollowingpost">
        <SubUserPost />
      </Route>
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Header />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;

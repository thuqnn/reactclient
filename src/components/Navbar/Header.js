import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import Cookies from "js-cookie";

export const Header = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  //console.log(state);
  const renderList = () => {
    if (state) {
      return [
        <li className="nav-item">
          <Link className="nav-link " to="/profile">
            Profile
          </Link>
        </li>,
        <li className="nav-item">
          <Link className="nav-link " to="/create">
            Create Article
          </Link>
        </li>,

        <li className="nav-item">
          <Link className="nav-link " to="/myfollowingpost">
            My Following Post
          </Link>
        </li>,
        <li className="nav-item">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              Cookies.remove("token");
              Cookies.remove("user");
              dispatch({ type: "CLEAR" });
              history.push("/login");
            }}
          >
            Logout
          </button>
        </li>,
      ];
    } else {
      return [
        <li className="nav-item active">
          <Link className="nav-link" to="/login">
            Login <span className="sr-only">(current)</span>
          </Link>
        </li>,
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </li>,
      ];
    }
  };
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-white bg-white">
        <Link to={state ? "/" : "/login"} className="navbar-brand">
          Instagram
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">{renderList()}</ul>
        </div>
      </nav>
    </div>
  );
};

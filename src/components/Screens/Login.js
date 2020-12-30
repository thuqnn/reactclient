import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import Cookie from "js-cookie";
import M from "materialize-css";
import { MY_API } from "../../config";

export const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  // console.log(state);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  //console.log(user);
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    if (e.keyCode === 13) {
      postData();
    }
  };
  //name: e.target.name is name of input
  const postData = () => {
    const { email, password } = user;
    fetch(`${MY_API}/auth/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          M.toast({ html: "Login Failed !" });
          return;
        }
        return res.json();
      })
      .then((data) => {
        //console.log(data);
        Cookie.set("token", data.token);
        Cookie.set("user", JSON.stringify(data.user));
        dispatch({ type: "USER", payload: data.user });
        M.toast({ html: "Login Success !" });
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mycard">
      <div className="card auth-card">
        <h2>Instagram</h2>
        <div className="input-group mb-3">
          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            onKeyDown={handleChange}
          />
        </div>
        <div className="input-group mb-3">
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            onKeyDown={handleChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => postData()}
        >
          Submit
        </button>
        <h5 className="pt-4">
          <Link to="/register"> Don't have an Account !</Link>
        </h5>
      </div>
    </div>
  );
};

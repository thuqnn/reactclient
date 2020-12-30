import React, { useState } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";
import { MY_API } from "../../config";

export const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onHandleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    if (e.keyCode === 13) {
      postData();
    }
  };

  const postData = () => {
    const { name, email, password } = user;
    fetch(`${MY_API}/auth/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error });
        } else {
          M.toast({ html: data.message });
        }
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
            name="name"
            type="text"
            className="form-control"
            placeholder="Name"
            value={user.name}
            onChange={onHandleChange}
            onKeyDown={onHandleChange}
          />
        </div>

        <div className="input-group mb-3">
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="Password"
            value={user.password}
            onChange={onHandleChange}
            onKeyDown={onHandleChange}
          />
        </div>
        <div className="input-group mb-3">
          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="Email"
            value={user.email}
            onChange={onHandleChange}
            onKeyDown={onHandleChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => postData()}
        >
          Register
        </button>
        <h5 className="pt-4">
          <Link to="/login"> Already have an Account !</Link>
        </h5>
      </div>
    </div>
  );
};

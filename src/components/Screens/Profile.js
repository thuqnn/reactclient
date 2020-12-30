import React, { useEffect, useState, useContext } from "react";
import Cookie from "js-cookie";

import { UserContext } from "../../App";

export const Profile = () => {
  const [mypics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch("/blog/userposts", {
      method: "get",
      headers: {
        Authorization: "Thu Pham" + Cookie.get("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setPics(result);
      });
  }, []);
  return (
    <div className="container">
      <div className="row " style={{ borderBottom: "1px solid gray" }}>
        <div className="col-md-3 mb-4">
          <img
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "80px",
            }}
            src="https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
            alt="person"
          />
        </div>
        <div className="col-md-9">
          <h4>{state ? state.name : "loading"}</h4>
          <h5>{state ? state.email : "loading"}</h5>
          <div className="d-flex">
            <h6>{mypics.length} Post</h6>
            <h6>&nbsp;{state ? state.followers.length : "0"} Follow</h6>
            <h6>&nbsp;{state ? state.following.length : "0"} Following</h6>
          </div>
        </div>
      </div>

      <div className="row gallery">
        {mypics.map((item) => {
          return (
            <div className="col-md-4 mt-4" key={item._id}>
              <img className="item" src={item.image} alt={item.title} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Cookie from "js-cookie";

import { UserContext } from "../../App";

import { MY_API } from "../../config";

export const UserProfile = () => {
  const [userProfile, setProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const { id } = useParams();

  const [showFollow, setShowFollow] = useState(
    state ? !state.following.includes(id) : true
  );

  useEffect(() => {
    fetch(`${MY_API}/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Thu Pham" + Cookie.get("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        setProfile(result);
      });
  }, [id]);

  const followUser = () => {
    fetch(`${MY_API}/users/follow`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Thu Pham" + Cookie.get("token"),
      },
      body: JSON.stringify({
        followId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        Cookie.set("user", JSON.stringify(data));
        setProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
        setShowFollow(false);
      });
  };

  const unfollowUser = () => {
    fetch(`${MY_API}/users/unfollow`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Thu Pham" + Cookie.get("token"),
      },
      body: JSON.stringify({
        unfollowId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        Cookie.set("user", JSON.stringify(data));
        // console.log(data);
        setProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(
            (item) => item !== data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower,
            },
          };
        });
        setShowFollow(true);
      });
  };
  return (
    <>
      {userProfile ? (
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
              <h4>{userProfile ? userProfile.user.name : "loading"}</h4>
              <h4>{userProfile ? userProfile.user.email : "loading"}</h4>

              <div className="d-flex">
                <h6>
                  {userProfile ? userProfile.posts.length : "loading"} Post
                </h6>
                <h6> &nbsp;{userProfile.user.followers.length} Follow</h6>
                <h6> &nbsp;{userProfile.user.following.length} Following</h6>
              </div>
              {showFollow ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => followUser()}
                >
                  Follower
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => unfollowUser()}
                >
                  UnFollow
                </button>
              )}
            </div>
          </div>

          <div className="row gallery">
            {userProfile.posts.map((item) => {
              return (
                <div className="col-md-4 mt-4" key={item._id}>
                  <img className="item" src={item.image} alt={item.title} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <h2>Loading...!</h2>
      )}
    </>
  );
};

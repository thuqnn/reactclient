import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import Cookie from "js-cookie";
import { Link } from "react-router-dom";
import { MY_API } from "../../config";

export const Home = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  // console.log(state);

  useEffect(() => {
    fetch(`${MY_API}/blog`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Thu Pham" + Cookie.get("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setData(result);
      });
  }, []);
  const likePost = (id) => {
    fetch(`${MY_API}/blog/like`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Thu Pham" + Cookie.get("token"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unlikePost = (id) => {
    fetch(`${MY_API}/blog/unlike`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Thu Pham" + Cookie.get("token"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //   console.log(result)
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeComment = (text, postId) => {
    fetch(`${MY_API}/blog/comment`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Thu Pham" + Cookie.get("token"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deletePost = (postid) => {
    fetch(`${MY_API}/blog/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Thu Pham" + Cookie.get("token"),
      },
      body: JSON.stringify({
        postId: postid,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      });
  };
  return (
    <div className="home container">
      <div className="row">
        {data.map((item) => {
          // console.log(item);
          return (
            <div className="card" key={item._id}>
              <h5 style={{ padding: "5px" }}>
                <Link
                  to={
                    item.postedBy._id !== state.id
                      ? "/profile/" + item.postedBy._id
                      : "/profile"
                  }
                >
                  {item.postedBy.name}
                </Link>

                {item.postedBy._id === state.id && (
                  <i
                    className="fa fa-trash"
                    aria-hidden="true"
                    style={{ float: "right" }}
                    onClick={() => deletePost(item._id)}
                  ></i>
                )}
              </h5>
              <img className="card-img-top" src={item.image} alt={item.title} />
              <div className="card-body">
                <i className="fa fa-heart" style={{ color: "red" }}></i>
                {item.likes.includes(state.id) ? (
                  <i
                    className="fa fa-thumbs-down"
                    aria-hidden="true"
                    onClick={() => unlikePost(item._id)}
                  ></i>
                ) : (
                  <i
                    className="fa fa-thumbs-up"
                    aria-hidden="true"
                    onClick={() => likePost(item._id)}
                  ></i>
                )}

                <h6>{item.likes.length} Likes</h6>
                <h6 className="card-title">{item.title}</h6>
                <p className="card-text">{item.description}</p>
                {item.comments.map((record) => {
                  return (
                    <h6 key={record._id}>
                      <span style={{ fontWeight: "500" }}>
                        {record.postedBy.name}
                      </span>
                      &nbsp;{record.text}
                    </h6>
                  );
                })}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    makeComment(e.target[0].value, item._id);
                    e.target.reset();
                  }}
                >
                  <input
                    type="text"
                    placeholder="add a comment"
                    className="form-control"
                  />
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

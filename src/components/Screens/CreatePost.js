import React, { useState } from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";
import Cookie from "js-cookie";

export const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [url, setURL] = useState("");

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "instagram-clone");
    formData.append("cloud_name", "bravebits");
    fetch("https://api.cloudinary.com/v1_1/vandonvn/image/upload", {
      method: "post",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setURL(data.url);
      });
  };

  const handleSubmit = () => {
    if (url)
      fetch("/blog/create", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Thu Pham" + Cookie.get("token"),
        },
        body: JSON.stringify({
          title,
          description,
          image: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error });
          } else {
            M.toast({ html: "Created Successfully !" });
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
  };

  return (
    <div>
      <div className="card create-post">
        <h2>Instagram</h2>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>

        <div className="input-group mb-3">
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="inputGroupFile01"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <label className="custom-file-label" htmlFor="inputGroupFile01">
              Choose file
            </label>
          </div>
          <div className="input-group-prepend d-flex justify-content-end">
            <button className="btn btn-primary" onClick={handleUpload}>
              Upload Image
            </button>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

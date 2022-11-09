import { Notyf } from "notyf";
import { useEffect } from "react";
import { useState } from "react";
import { urlPrefix } from "../misc/resuse";
import "./Community.css";

export function Community() {
  const [posts, setPosts] = useState();
  var notyf = new Notyf();
  function openin(id) {
    window.location.href = "/community/" + id;
  }
  function like(id) {
    fetch(urlPrefix() + "/community" + "/like/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        id: id,
      }),
    }).then(async function (response) {
      response = await response.json();
      console.log(response);
      if (response.success) {
        notyf.success("Liked!");
        window.location.reload();
      }
    });
  }
  useEffect(() => {
    fetch(urlPrefix() + "/community", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then(async function (response) {
      response = await response.json();
      console.log(response);
      if (response.length > 0) {
        setPosts(response);
      }
    });
  }, []);

  return (
    <div class="community">
        <button class='signup-button' onClick={()=>{window.location.href = '/newpost'}}>New Post</button>
      {posts ? (
        posts.map((post) => {
          return (
            <div class="post">
              <div class="up-down">
                <button onClick={() => like(post._id)}>▲</button>
                <p>{post.likes.length}</p>
                <button onClick={() => like(post._id)}>▼</button>
              </div>
              <div class="post-info" onClick={() => openin(post._id)}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <p class="author">by: {post.author.name} </p>
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <h1>No Posts Found!</h1>
        </div>
      )}
    </div>
  );
}

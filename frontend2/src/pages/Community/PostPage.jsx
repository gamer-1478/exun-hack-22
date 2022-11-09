import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { urlPrefix } from "../../misc/resuse";
import "./PostPage.css";

export function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      fetch(urlPrefix() + `/community/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          setPost(data);
          console.log(data);
        });
    };
    fetchPost();
  }, []);

  function commentsubmit() {
    var comment = document.getElementById("comment").value;
    var url = urlPrefix() + "/community/comment/" + id;
    var data = {
      content: comment,
    };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
        credentials: "include",
      body: JSON.stringify(data),
    }).then(function (response) {
      if (response.ok) {
        window.location.reload();
      }
    });
  }

  return (
    <div class="post-main">
      {post ? (
        <>
          <div class="up-down">
            <button onclick="like('<%= post._id%>')">▲</button>
            <p>{post.likes.length}</p>
            <button onclick="dislike('<%= post._id%>')">▼</button>
          </div>
          <div class="post-info">
            <h1>{post.title}</h1>
            <p class="author">by: {post.author.name}</p>
            <br></br>
            <br></br>
            <p class="content">{post.content}</p>
            <br></br>
            <p>Comments: {post.comments.length} </p>
            <br></br>
            <h2>Drop a comment: </h2>
            <br></br>
            <textarea cols="100" rows="10" id="comment"></textarea>
            <button class="submit-comment" onClick={commentsubmit}>
              Submit
            </button>
            <div>
              {post.comments.length != 0 ? (
                <>
                  <h2>Comments: </h2>
                  <div class="comments">
                    {post.comments.map(function (comment) {
                      return (<div class="comment">
                        <p> {comment.content}</p>
                        <p>by: {comment.author}</p>
                      </div>)
                    })}
                  </div>
                </>
              ) : (
                <h2>No comments yet</h2>
              )}
            </div>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

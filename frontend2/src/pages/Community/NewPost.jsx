import { Notyf } from "notyf";
import { urlPrefix } from "../../misc/resuse";
import "./NewPost.css";

export function NewPost() {
  var notyf = new Notyf();
  async function submit() {
    var title = document.getElementById("title").value;
    var type = document.getElementById("type").value;
    var content = document.getElementById("description").value;
    await fetch(urlPrefix()+ "/community", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        title,
        type,
        content,
      }),
    }).then(async (response) => {
      var res = await response.json();
      if (res.sucess == true) {
        await notyf.success(res.msg);
        setTimeout(function () {
          window.location.href = res.link;
        }, 1000);
      } else {
        await notyf.error(res[0].msg);
      }
    });
  }

  return (
    <div class="postsss">
      <div class="pots-form">
        <h2>Create a new post</h2>
        <div class="field">
          <label for="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required="true"
            placeholder="This Awesome Post!"
          />
        </div>
        <div class="field">
          <label for="type">Type</label>
          <select id="type" name="type" class="type">
            <option value="diaper">Game Issue</option>
            <option value="skin">Hardware Issue</option>
            <option value="other">Others</option>
          </select>
        </div>

        <div class="field">
          <label for="description">Description</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
          ></textarea>
        </div>

        <button onClick={submit} class="signup-button">
          Post Story
        </button>
      </div>
    </div>
  );
}

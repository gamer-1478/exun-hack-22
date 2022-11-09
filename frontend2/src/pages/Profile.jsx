import { Notyf } from "notyf";
import { useEffect, useState } from "react";
import { urlPrefix } from "../misc/resuse";

export default function ProfilePage() {
  const [user, setUser] = useState();
  useEffect(() => {
    fetch(urlPrefix() + "/auth/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then(async (response) => {
      var res = await response.json();
      console.log(res);
      setUser(res);
    });
  }, []);

  var notyf = new Notyf();
  async function submit() {
    var email = document.getElementById("email").value;
    var name = document.getElementById("name").value;
    await fetch(urlPrefix()+ "/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        name: name,
      }),
    }).then(async (response) => {
      var res = await response.json();
      if (res.success == true) {
        await notyf.success("Profile Updated Successfully!");
      } else {
        await notyf.error(res.msg);
      }
    });
  }

  function library() {
    window.location.href = "/library";
  }

  return (
    <div>
      {user ? (
        <div class="landing-class">
          <div class="signup">
            <h1>Hello {user.name}!</h1>
            <input
              type="button"
              value=" My Library"
              onClick={library}
              class="signup-button"
            />

            <div class="signup-form">
              <div class="field">
                <label for="name">Name</label>
                <input
                  type="text"
                  id="name"
                  defaultValue={user.name}
                  disabled={false}
                  name="name"
                  placeholder="Ashok Kumar"
                />
              </div>
              <div class="field">
                <label for="email">Email</label>
                <input
                  type="text"
                  id="email"
                  defaultValue={user.email}
                  name="email"
                  placeholder="ashok.kumar@gmail.com"
                />
              </div>
              <input
                type="button"
                value="Update Profile"
                onClick={submit}
                class="signup-button"
              />
            </div>
            <input
              type="button"
              value="Logout"
              onClick={() => {window.location.href = "/logout"}}
              class="signup-button"
            />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

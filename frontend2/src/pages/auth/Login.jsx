import { Notyf } from 'notyf';

import './Login.css'
import { urlPrefix } from '../../misc/resuse';
// Create an instance of Notyf
const notyf = new Notyf();

async function submit() {
  var email = document.getElementById("email").value;
  var pass = document.getElementById("pass").value;
  await fetch(urlPrefix() + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({
      email: email,
      password: pass,
    }),
  }).then(async (response) => {
    var res = await response.json();
    console.log(res);
    if (res.success == true) {
      await notyf.success(
        "You have been successfully Logged In, redirecting Automatically!"
      );
      setTimeout(function () {
        window.location.href = "/";
      }, 1000);
    } else {
      await notyf.error(res.msg);
    }
  });
}

export function Login() {
  return (
    <div>
      <div>
        <div class="landing-class">
          <div class="signup">
            <h1>Login</h1>
            <div class="signup-form">
              <div class="field">
                <label for="email">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Ashok.Kumar@gmail.com"
                />
              </div>
              <div class="field">
                <label for="pass">Password</label>
                <input
                  type="text"
                  id="pass"
                  name="pass"
                  placeholder="@$#0kKum@r1234@secure"
                />
              </div>
              <p class="click-here">
                Don't have an account?{" "}
                <a href="/register">Register here!</a>
              </p>
              <input
                type="button"
                value="proceed"
                onClick={() => submit()}
                class="signup-button"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

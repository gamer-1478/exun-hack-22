import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // for React, Vue and Svelte
import './Register.css'
import { urlPrefix } from '../misc/resuse';
// Create an instance of Notyf
const notyf = new Notyf();

async function submit() {
  var fullname = document.getElementById("fullname").value;
  var email = document.getElementById("email").value;
  var pass = document.getElementById("pass").value;
  var confpass = document.getElementById("confpass").value;
  if (pass != confpass) {
    notyf.error("Passwords do not match");
    return;
  }
  await fetch(urlPrefix() + "/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: fullname,
      email: email,
      password: pass,
      confirmPassword: confpass,
    }),
  }).then(async (response) => {
    var res = await response.json();
    console.log(res);
    if (res.success) {
      await notyf.success(
        "You have been successfully registered, redirecting Automatically!"
      );
      setTimeout(function () {
        window.location.href = "/";
      }, 1000);
    } else {
      await notyf.error(res[0].msg);
    }
  });
}

export function Register() {
  return (
    <div>
      <div class="landing-class">
        <div class="signup">
          <h1>Sign Up</h1>
          <div class="signup-form">
            <div class="field">
              <label for="fullname">Full Name</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                placeholder="Ashok Kumar"
              />
            </div>
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
            <div class="field">
              <label for="confpass">Confirm Password</label>
              <input
                type="text"
                id="confpass"
                name="confpass"
                placeholder="@$#0kKum@r1234@secure"
              />
            </div>
            <p class="click-here">
              Already have an account? <a href="/login">Login here!</a>
            </p>
            <input
              type="button"
              value="proceed"
              onClick={()=>{submit()}}
              class="signup-button"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

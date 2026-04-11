Build frontend login/register system.

-----------------------------------
STEP 1 — Create Login Page
-----------------------------------

Create:

client/login.html

Add:

<!DOCTYPE html>
<html>
<head>

  <title>Login - Chess Game</title>

  <link rel="stylesheet" href="/styles.css">

</head>

<body>

<div class="auth-container">

  <h1>Login</h1>

  <form id="loginForm">

    <input
      type="email"
      id="email"
      placeholder="Email"
      required
    >

    <input
      type="password"
      id="password"
      placeholder="Password"
      required
    >

    <button type="submit">

      Login

    </button>

  </form>

  <p>

    Don't have an account?

    <a href="/register">

      Register

    </a>

  </p>

</div>

<script src="/auth.js"></script>

</body>
</html>

-----------------------------------
STEP 2 — Create Register Page
-----------------------------------

Create:

client/register.html

Add:

<!DOCTYPE html>
<html>
<head>

  <title>Register - Chess Game</title>

  <link rel="stylesheet" href="/styles.css">

</head>

<body>

<div class="auth-container">

  <h1>Register</h1>

  <form id="registerForm">

    <input
      type="text"
      id="name"
      placeholder="Name"
      required
    >

    <input
      type="email"
      id="email"
      placeholder="Email"
      required
    >

    <input
      type="password"
      id="password"
      placeholder="Password"
      required
    >

    <button type="submit">

      Register

    </button>

  </form>

  <p>

    Already have an account?

    <a href="/">

      Login

    </a>

  </p>

</div>

<script src="/auth.js"></script>

</body>
</html>

-----------------------------------
STEP 3 — Create Auth Logic
-----------------------------------

Create:

client/auth.js

Add:

const API_BASE =
  "http://localhost:3000/api/auth";

-----------------------------------
REGISTER LOGIC
-----------------------------------

const registerForm =
  document.getElementById(
    "registerForm"
  );

if (registerForm) {

  registerForm.addEventListener(
    "submit",
    async (e) => {

      e.preventDefault();

      const name =
        document.getElementById("name").value;

      const email =
        document.getElementById("email").value;

      const password =
        document.getElementById("password").value;

      try {

        const response =
          await fetch(
            `${API_BASE}/register`,
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json"
              },
              body: JSON.stringify({
                name,
                email,
                password
              })
            }
          );

        const data =
          await response.json();

        alert(
          data.message
        );

        window.location =
          "/";

      } catch (error) {

        alert(
          "Register failed"
        );

      }

    }
  );

}

-----------------------------------
LOGIN LOGIC
-----------------------------------

const loginForm =
  document.getElementById(
    "loginForm"
  );

if (loginForm) {

  loginForm.addEventListener(
    "submit",
    async (e) => {

      e.preventDefault();

      const email =
        document.getElementById("email").value;

      const password =
        document.getElementById("password").value;

      try {

        const response =
          await fetch(
            `${API_BASE}/login`,
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json"
              },
              body: JSON.stringify({
                email,
                password
              })
            }
          );

        const data =
          await response.json();

        if (data.token) {

          localStorage.setItem(
            "token",
            data.token
          );

          window.location =
            "/play";

        } else {

          alert(
            data.message
          );

        }

      } catch (error) {

        alert(
          "Login failed"
        );

      }

    }
  );

}

-----------------------------------
STEP 4 — Update Express Routes
-----------------------------------

Update:

server/app.js

Add routes:

app.get("/", (req, res) => {

  res.sendFile(
    path.join(
      __dirname,
      "../client/login.html"
    )
  );

});

app.get("/register", (req, res) => {

  res.sendFile(
    path.join(
      __dirname,
      "../client/register.html"
    )
  );

});

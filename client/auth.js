const API_BASE =
  "http://localhost:3000/api/auth";

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
                  "application/json",
              },
              body: JSON.stringify({
                name,
                email,
                password,
              }),
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
                  "application/json",
              },
              body: JSON.stringify({
                email,
                password,
              }),
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

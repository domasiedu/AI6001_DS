Add logout button and user header to play page.

-----------------------------------
STEP 1 — Store User Info After Login
-----------------------------------

Open:

client/auth.js

Inside LOGIN success block,
replace:

localStorage.setItem(
  "token",
  data.token
);

Add below it:

localStorage.setItem(
  "userName",
  data.user.name
);

-----------------------------------
STEP 2 — Add Header to play.html
-----------------------------------

Open:

client/play.html

Add ABOVE chess board container:

<div class="top-bar">

  <div class="logo">

    ♟ Chess Arena

  </div>

  <div class="user-section">

    <span id="userDisplay"></span>

    <button id="logoutBtn">

      Logout

    </button>

  </div>

</div>

-----------------------------------
STEP 3 — Style Header
-----------------------------------

Open:

client/styles.css

Add:

.top-bar {

  width: 100%;

  display: flex;

  justify-content: space-between;

  align-items: center;

  padding: 15px 25px;

  background: #1e3c72;

  color: white;

  font-weight: bold;

}

.user-section {

  display: flex;

  align-items: center;

  gap: 15px;

}

#logoutBtn {

  padding: 8px 14px;

  border: none;

  border-radius: 6px;

  background: #ff4d4d;

  color: white;

  cursor: pointer;

  font-weight: bold;

}

#logoutBtn:hover {

  background: #cc0000;

}

-----------------------------------
STEP 4 — Display Username + Logout Logic
-----------------------------------

Open:

client/js/board.js

At top add:

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const userName =
      localStorage.getItem(
        "userName"
      );

    const userDisplay =
      document.getElementById(
        "userDisplay"
      );

    if (userDisplay && userName) {

      userDisplay.textContent =
        "Logged in as " +
        userName;

    }

    const logoutBtn =
      document.getElementById(
        "logoutBtn"
      );

    if (logoutBtn) {

      logoutBtn.addEventListener(
        "click",
        () => {

          localStorage.removeItem(
            "token"
          );

          localStorage.removeItem(
            "userName"
          );

          window.location = "/";

        }
      );

    }

  }
);

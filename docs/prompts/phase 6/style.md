Modernize Login and Register UI styling.

-----------------------------------
STEP 1 — Create Global Styles
-----------------------------------

Create:

client/styles.css

Add:

body {

  margin: 0;

  font-family:
    "Segoe UI",
    Tahoma,
    Geneva,
    Verdana,
    sans-serif;

  background:
    linear-gradient(
      135deg,
      #1e3c72,
      #2a5298
    );

  height: 100vh;

  display: flex;

  justify-content: center;

  align-items: center;

}

.auth-container {

  background:
    rgba(255,255,255,0.95);

  padding: 40px;

  border-radius: 16px;

  box-shadow:
    0 10px 40px
    rgba(0,0,0,0.3);

  width: 320px;

  text-align: center;

}

.auth-container h1 {

  margin-bottom: 20px;

  color: #333;

}

.auth-container input {

  width: 100%;

  padding: 12px;

  margin: 10px 0;

  border-radius: 8px;

  border: 1px solid #ccc;

  font-size: 16px;

  transition: 0.2s;

}

.auth-container input:focus {

  border-color: #2a5298;

  outline: none;

}

.auth-container button {

  width: 100%;

  padding: 12px;

  margin-top: 15px;

  border: none;

  border-radius: 8px;

  background:
    linear-gradient(
      135deg,
      #2a5298,
      #1e3c72
    );

  color: white;

  font-size: 16px;

  cursor: pointer;

  transition: 0.3s;

}

.auth-container button:hover {

  transform: scale(1.03);

  box-shadow:
    0 5px 20px
    rgba(0,0,0,0.2);

}

.auth-container a {

  color: #2a5298;

  text-decoration: none;

  font-weight: bold;

}

.auth-container p {

  margin-top: 15px;

}

@media (max-width: 480px) {

  .auth-container {

    width: 90%;

    padding: 30px;

  }

}

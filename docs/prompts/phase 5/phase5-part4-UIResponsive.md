Add responsive support.

File:
client/css/styles.css

-----------------------------------

@media (max-width: 900px) {

  .main-layout {

    flex-direction: column;

    align-items: center;

  }

  .right-panel {

    width: 100%;

    max-width: 420px;

  }

}

# Prompt 2

Improve piece rendering smoothness.

File:
client/css/styles.css

-----------------------------------

.square img {

  transition:

    transform 0.15s ease;

}

.square img:hover {

  transform: scale(1.08);

}

# prompt 3

Improve background styling.

File:
client/css/styles.css

-----------------------------------

body {

  background:

    linear-gradient(
      180deg,
      #eef2f7,
      #dbe3ea
    );

}

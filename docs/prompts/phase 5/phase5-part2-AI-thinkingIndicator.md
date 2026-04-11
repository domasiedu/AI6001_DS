Add AI thinking indicator.

Files:
client/play.html
client/js/board.js
client/css/styles.css

Goal:
Display "AI Thinking..." while AI move is calculating.

-----------------------------------

STEP 1 — Add UI element

In play.html:

Add above board:

<div id="ai-thinking" class="hidden">
  AI Thinking...
</div>

-----------------------------------

STEP 2 — Add CSS

In styles.css:

#ai-thinking {
  font-weight: bold;
  color: orange;
  margin-bottom: 8px;
}

-----------------------------------

STEP 3 — Add show/hide functions

In board.js:

Add:

function showAIThinking() {

  document
    .getElementById("ai-thinking")
    .classList.remove("hidden");

}

function hideAIThinking() {

  document
    .getElementById("ai-thinking")
    .classList.add("hidden");

}

-----------------------------------

STEP 4 — Show indicator before AI move

Inside sendMoveToBackend():

Before fetch call:

showAIThinking();

-----------------------------------

STEP 5 — Hide after response

After board updates:

hideAIThinking();

Update client/css/styles.css to enlarge chess pieces and improve square layout.

Requirements:

1. Modify the existing .square class.

Update it to:

.square {
  width: 70px;
  height: 70px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 42px;   /* Increase chess piece size */
  font-weight: bold;

  cursor: pointer;
  user-select: none;
}

2. Add hover effect to improve interactivity:

.square:hover {
  outline: 2px solid #444;
}

3. Ensure board squares remain centered and clean.

Do NOT modify JavaScript files.
Do NOT change board layout logic.
Only update styling.
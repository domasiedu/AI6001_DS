# Game API and Board

With the help of Chatgpt LLM Created the api for game, routed and tested without using prompts in vscode Codex because the errors were too much.

# Board creation

## Create a JavaScript module called boardParser.js inside server/chess.

Requirements:

- Implement a function called parseFEN(fen)
- Input: a FEN board string
  Example:
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"

- Output: a 2D array (8x8 board)

Rules:

- Split rows using "/"
- Numbers represent empty squares
- Use null for empty squares
- Letters represent chess pieces
- Each row must contain exactly 8 elements
- Return full 8x8 board array

Export:

module.exports = parseFEN;

Do not modify any other files.


## Create a JavaScript module called fenGenerator.js inside server/chess.

Requirements:

- Implement a function called generateFEN(board)

Input:

- A 2D array (8x8 board)
- Empty squares are null
- Pieces are letters (e.g., "P", "r")

Output:

- A valid FEN board string

Rules:

- Count consecutive null values as numbers
- Join rows using "/"
- Each row must produce correct FEN format

Export:

module.exports = generateFEN;

Do not modify any other files.

## Create a JavaScript module called movePiece.js inside server/chess.

Requirements:

- Import:

const parseFEN = require("./boardParser");
const generateFEN = require("./fenGenerator");

- Implement function:

movePiece(fen, fromRow, fromCol, toRow, toCol)

Behavior:

- Convert FEN into board array
- Move piece from source to destination
- Set original square to null
- Convert board back to FEN
- Return updated FEN

Validation:

- If no piece exists at source, throw:

"Invalid move: No piece at source"

Export:

module.exports = movePiece;

Do not modify any other files.


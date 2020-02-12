/* eslint-disable require-jsdoc */
let oldElement;
let selectable = [];
let turn = 1;// Set turn to white

function play() {
  document.body.innerHTML = '';
  drawBoard();
  prepareBoard();
  addListener();
}

function drawBoard() { // Draw board on the webpage
  let id = 0;
  const table = document.createElement('table');
  const btn = document.createElement('button');
  btn.setAttribute('onclick', 'gameOver()');
  btn.innerText = 'Fin de partie';
  btn.setAttribute('id', 'endgame');
  btn.classList.add('center');
  table.setAttribute('id', 'chessBoard');
  for (let i = 0; i < 8; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < 8; j++) {
      const td = document.createElement('td');
      if (i % 2 == j % 2) {
        td.className = 'w';
        td.setAttribute('data-x', i);
        td.setAttribute('data-y', j);
        td.setAttribute('id', id);
        id++;
      } else {
        td.className = 'b';
        td.setAttribute('data-x', i);
        td.setAttribute('data-y', j);
        td.setAttribute('id', id);
        id++;
      }
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  table.classList.add('center');
  document.body.appendChild(table);
  document.body.appendChild(btn);
  tips(true);
}

function selector(x, y) {
  const select = document.querySelectorAll('td[data-x="' + x + '"]');
  let find = false;
  let yInSel;
  let i = 0;
  while (find == false) {
    yInSel = select[i].getAttribute('data-y');
    if (yInSel == y) {
      find = true;
    } else {
      i++;
    }
  }
  const id = select[i].getAttribute('id');
  const element = document.getElementById(id);
  return element;
}

function prepareBoard() { // Add pieces on the board
  for (let i = 0; i < blackPattern.length; i++) {// Add first black pieces row
    const element = blackPattern[i];
    const path = element.path;
    const y = element.y;
    const x = 0;
    const chessSquare = selector(x, y);
    const image = chessSquare.appendChild(document.createElement('img'));
    image.setAttribute('src', path);
    chessSquare.setAttribute('data-piece', element.name);
    image.setAttribute('data-name', element.name);
    chessSquare.setAttribute('data-color', 'b');
  }
  for (let i = 0; i < whitePattern.length; i++) {// Add first white pieces row
    const element = whitePattern[i];
    const path = element.path;
    const y = element.y;
    const x = 7;
    const chessSquare = selector(x, y);
    const image = chessSquare.appendChild(document.createElement('img'));
    image.setAttribute('src', path);
    chessSquare.setAttribute('data-piece', element.name);
    image.setAttribute('data-name', element.name);
    chessSquare.setAttribute('data-color', 'w');
  }
  let finished = false;
  while (finished == false) {
    let x = 1;
    for (let y = 0; y < 8; y++) {// Add black pawns row
      const chessSquare = selector(x, y);
      const path = blackPawn.path;
      const image = chessSquare.appendChild(document.createElement('img'));
      image.setAttribute('src', path);
      chessSquare.setAttribute('data-piece', blackPawn.name);
      image.setAttribute('data-name', blackPawn.name);
      chessSquare.setAttribute('data-color', 'b');
    }
    x = 6;
    for (let y = 0; y < 8; y++) {// Add white pawns row
      const chessSquare = selector(x, y);
      const path = whitePawn.path;
      const image = chessSquare.appendChild(document.createElement('img'));
      image.setAttribute('src', path);
      chessSquare.setAttribute('data-piece', whitePawn.name);
      image.setAttribute('data-name', whitePawn.name);
      chessSquare.setAttribute('data-color', 'w');
    }
    finished = true;
  }
}

function addListener() { // Add listener to react on click
  const td = document.querySelectorAll('td');
  td.forEach((element) => {
    element.onclick = selectPiece;
  });
}

function selectPiece(event) { // On piece select
  let source = event.target || event.srcElement;
  if (source.tagName !== 'TD') {// Check if piece is clicked
    source = source.parentElement;
  }

  const color = source.getAttribute('data-color');
  if (oldElement == undefined) { // Check if nothing is selected
    if (turn == 1 && color == 'w') { // Check if white is clicked and turn is white
      showPath(source);
      oldElement = source;
    }
    if (turn == 0 && color == 'b') { // Check if black is clicked and turn is black
      showPath(source);
      oldElement = source;
    }
  } else if (selectable.includes(source) == true) { // Move piece
    movePiece(oldElement, source);
    if (turn == 1) { // Change turn to black
      turn = 0;
      const kingPos = document.querySelector(`[data-piece=wKing]`);
      kingPos.classList.remove('checkmate');
      if (underAttack('King', 'b')) {// Check king state
        kingPos.classList.add('checkmate');
      }
      selectable = [];
    } else if (turn == 0) { // Change turn to white
      turn = 1;
      const kingPos = document.querySelector(`[data-piece=bKing]`);
      kingPos.classList.remove('checkmate');
      if (underAttack('King', 'w')) {// Check king state
        kingPos.classList.add('checkmate');
      }
      selectable = [];
    }
  } else {// Abort click
    oldElement.classList.remove('selected');
    selectable.forEach((element) => {
      element.classList.remove('selected');
    });
    selectable = [];
    oldElement = undefined;
  }
}

function movePiece(source, dest) { // Move piece
  selectable.forEach((element) => {
    element.classList.remove('selected');
  });
  if (dest.hasChildNodes() == true) {
    dest.removeChild(dest.firstChild);
  }
  // Get all the piece attributes
  const img = source.firstChild;
  const name = img.getAttribute('data-name');
  const color = source.getAttribute('data-color');
  // Delete the piece
  source.removeChild(source.firstChild);
  source.removeAttribute('data-piece');
  source.removeAttribute('data-color');
  // Display the piece at it's new pos
  dest.appendChild(img);
  dest.setAttribute('data-piece', name);
  dest.setAttribute('data-color', color);
  selectable = [];
  oldElement = undefined;
}

function isPiece(x, y, color, type, pos) {
  try {
    if (type == 'wPawn' || type == 'bPawn') {// Check if pawn
      if (selector(x, y).hasChildNodes() == true) {// Check if piece on the tile
        const neighbourColor = selector(x, y).getAttribute('data-color');// Get neighbour color
        if (neighbourColor == color) {// Check difference of colors
          return false;// Not eatable
        } else if (pos == 'left' || pos == 'right') {
          return 'eatable';// Eatable
        }
      } else if (pos == 'left' || pos == 'right') {
        return false;// Not Eatable
      } else {
        return 'true';// Clickable
      }
    } else {
      if (selector(x, y).hasChildNodes() == true) {// Check if piece on the tile
        const neighbourColor = selector(x, y).getAttribute('data-color');// Get neighbour color
        if (neighbourColor == color) {// Check difference of colors
          return false;// Not Eatable
        } else {
          return 'eatable';// Eatable
        }
      } else {
        return 'true';// Clickable
      }
    }
  } catch (error) {
    return false;// Not clickable
  }
}


function gameOver() { // Show the gameover popup
  const popup = document.createElement('div');
  popup.classList.add('center');
  popup.setAttribute('id', 'gameOver');
  const text = document.createElement('h1');
  text.innerText = 'Vous avez perdu !';
  const btn = document.createElement('button');
  btn.setAttribute('onclick', 'getHighScore()');
  btn.innerText = 'Afficher les scores';
  popup.appendChild(text);
  popup.appendChild(btn);
  document.body.appendChild(popup);
}

function tips(state) { // toggle tips popup
  if (state) {
    const popup = document.createElement('div');
    popup.classList.add('center');
    popup.setAttribute('id', 'tips');
    const title = document.createElement('h1');
    title.innerText = 'Comment jouer ?';
    const text = document.createElement('p');
    text.innerText = 'Pour jouer cliquez sur une pièce, les cases accessibles sont mises en évidence. Le jeu commence par les blancs. Comme le jeu n\'est pas terminé, utilisez sur le bouton "Fin de partie" pour afficher les scores';
    const btn = document.createElement('button');
    btn.setAttribute('onclick', 'tips(false)');
    btn.innerText = 'Fermer';
    popup.appendChild(title);
    popup.appendChild(text);
    popup.appendChild(btn);
    document.body.appendChild(popup);
  } else {
    popup = document.getElementById('tips');
    document.body.removeChild(popup);
  }
}

/* eslint-disable eqeqeq */
let oldElement
let selectable = []
let turn = 1// Set turn to white

function drawBoard() { // Draw board on the webpage
  let id = 0
  const table = document.createElement('table')
  for (let i = 0; i < 8; i++) {
    const tr = document.createElement('tr')
    for (let j = 0; j < 8; j++) {
      const td = document.createElement('td')
      if (i % 2 == j % 2) {
        td.className = 'w'
        td.setAttribute('data-x', i)
        td.setAttribute('data-y', j)
        td.setAttribute('id', id)
        id++
      } else {
        td.className = 'b'
        td.setAttribute('data-x', i)
        td.setAttribute('data-y', j)
        td.setAttribute('id', id)
        id++
      }
      tr.appendChild(td)
    }
    table.appendChild(tr)
  }
  document.body.appendChild(table)
}

function selector(x, y) {//EL SAINT GRAAL
  const select = document.querySelectorAll('td[data-x="' + x + '"]')
  let find = false
  let yInSel
  let i = 0
  while (find == false) {
    yInSel = select[i].getAttribute('data-y')
    if (yInSel == y) {
      find = true
    } else {
      i++
    }
  }
  const id = select[i].getAttribute('id')
  const element = document.getElementById(id)
  return element
}//ET TEHC

function prepareBoard() { // Add pieces on the board
  for (let i = 0; i < blackPattern.length; i++) {
    const element = blackPattern[i]
    const path = element.path
    const y = element.y
    const x = 0
    const chessSquare = selector(x, y)
    const image = chessSquare.appendChild(document.createElement('img'))
    image.setAttribute('src', path)
    chessSquare.setAttribute('data-piece', element.name)
    image.setAttribute('data-name', element.name)
    chessSquare.setAttribute('data-color', 'b')
  }
  for (let i = 0; i < whitePattern.length; i++) {
    const element = whitePattern[i]
    const path = element.path
    const y = element.y
    const x = 7
    const chessSquare = selector(x, y)
    const image = chessSquare.appendChild(document.createElement('img'))
    image.setAttribute('src', path)
    chessSquare.setAttribute('data-piece', element.name)
    image.setAttribute('data-name', element.name)
    chessSquare.setAttribute('data-color', 'w')
  }
  let finished = false
  while (finished == false) {
    let x = 1
    for (let y = 0; y < 8; y++) {
      const chessSquare = selector(x, y)
      const path = blackPawn.path
      const image = chessSquare.appendChild(document.createElement('img'))
      image.setAttribute('src', path)
      chessSquare.setAttribute('data-piece', blackPawn.name)
      image.setAttribute('data-name', blackPawn.name)
      chessSquare.setAttribute('data-color', 'b')
      image.setAttribute('data-color', 'b')
    }
    x = 6
    for (let y = 0; y < 8; y++) {
      const chessSquare = selector(x, y)
      const path = whitePawn.path
      const image = chessSquare.appendChild(document.createElement('img'))
      image.setAttribute('src', path)
      chessSquare.setAttribute('data-piece', whitePawn.name)
      image.setAttribute('data-name', whitePawn.name)
      chessSquare.setAttribute('data-color', 'w')
      image.setAttribute('data-color', 'w')
    }
    finished = true
  }
}

function addListener() { // Add listener to react on click
  const td = document.querySelectorAll('td')
  td.forEach(element => {
    element.onclick = selectPiece
  })
}

function selectPiece(event) { // On piece select
  let source = event.target || event.srcElement
  console.log(source)
  console.log(source.tagName)
  if (source.tagName !== 'TD') {// Check if piece is clicked
    source = source.parentElement
  }

  let color = source.getAttribute('data-color')
  if (oldElement == undefined) {// Check if nothing is selected
    if (turn == 1 && color == 'w') {// Check if white is clicked and turn is white
      showPath(source)
      oldElement = source
    }
    if (turn == 0 && color == 'b') {// Check if black is clicked and turn is black
      showPath(source)
      oldElement = source
    }
  } else if (selectable.includes(source) == true) {// Move piece
    movePiece(oldElement, source)
    if (turn == 1) {// Change turn to black
      turn = 0
    }
    else if (turn == 0) {// Change turn to white
      turn = 1
    }
    console.log('clicked twice')
  } else {// Abort click
    oldElement.classList.remove('selected')
    selectable.forEach(element => {
      element.classList.remove('selected')
    })
    selectable = []
    oldElement = undefined
    console.log('aborted click')
  }
}

function showPath(source) { // Calculate and display path
  let x = parseInt(source.getAttribute('data-x'))
  let y = parseInt(source.getAttribute('data-y'))
  const piece = source.getAttribute('data-piece')
  const color = source.getAttribute('data-color')
  console.log('x : ' + x + ' y : ' + y)
  console.log(source.childNodes)
  let eatable = []
  let x2
  let y2
  switch (piece) {
    case 'bPawn':
      x2 = x + 1
      y2 = y
      if (isPiece(x2, y2, color)) {
        selectable.push(selector(x2, y2))
      }

      if (source.getAttribute('data-x') == 1) {
        x2 = x + 2
        y2 = y
        if (isPiece(x2, y2, color)) {
          selectable.push(selector(x2, y2))
        }
      }

      eatable = neighbours(x, y, color)
      if (findKey(eatable, 6) == true) {
        x2 = x
        y2 = y
        x2++
        y2--
        selectable.push(selector(x2, y2))
      }

      if (findKey(eatable, 8) == true) {
        x2 = x
        y2 = y
        x2++
        y2++
        selectable.push(selector(x2, y2))
      }
      break;

    case 'wPawn':
      x2 = x - 1
      y2 = y
      if (isPiece(x2, y2, color)) {
        selectable.push(selector(x2, y2))
      }

      if (source.getAttribute('data-x') == 6) {
        x2 = x - 2
        y2 = y
        if (isPiece(x2, y2, color)) {
          selectable.push(selector(x2, y2))
        }
      }

      eatable = neighbours(x, y, color)
      if (findKey(eatable, 1) == true) {
        x2 = x
        y2 = y
        x2--
        y2--
        selectable.push(selector(x2, y2))
      }

      if (findKey(eatable, 3) == true) {
        x2 = x
        y2 = y
        x2--
        y2++
        selectable.push(selector(x2, y2))
      }
      break;

    case 'Rook':
      for (let index = 1; index < 8; index++) {
        //Back
        x2 = x + index
        y2 = y
        if (isPiece(x2, y2, color)) {
          selectable.push(selector(x2, y2))
        }
      }

      for (let index = 1; index < 8; index++) {
        //Front
        x2 = x - index
        y2 = y
        if (isPiece(x2, y2, color)) {
          selectable.push(selector(x2, y2))
        }
      }

      for (let index = 1; index < 8; index++) {
        //Left
        x2 = x
        y2 = y - index
        if (isPiece(x2, y2, color)) {
          selectable.push(selector(x2, y2))
        }
      }

      for (let index = 1; index < 8; index++) {
        //Right
        x2 = x
        y2 = y + index
        if (isPiece(x2, y2, color)) {
          selectable.push(selector(x2, y2))
        }
      }
      break;


    case 'Knight':
      //Front

      x2 = x - 2// Front left
      y2 = y - 1
      if (isPiece(x2, y2, color)) {
        selectable.push(selector(x2, y2))
      }
      x2 = x - 2//Front right
      y2 = y + 1
      if (isPiece(x2, y2, color)) {
        selectable.push(selector(x2, y2))
      }

      //Left
      x2 = x - 1//Left top
      y2 = y - 2
      if (isPiece(x2, y2, color)) {
        selectable.push(selector(x2, y2))
      }
      x2 = x + 1//Left bottom
      y2 = y - 2
      if (isPiece(x2, y2, color)) {
        selectable.push(selector(x2, y2))
      }

      //Back
      x2 = x + 2//Back left
      y2 = y - 1
      if (isPiece(x2, y2, color)) {
        selectable.push(selector(x2, y2))
      }
      x2 = x + 2//Back right
      y2 = y + 1
      if (isPiece(x2, y2, color)) {
        selectable.push(selector(x2, y2))
      }

      //Right
      x2 = x + 1//Right bottom
      y2 = y + 2
      if (isPiece(x2, y2, color)) {
        selectable.push(selector(x2, y2))
      }
      x2 = x - 1//Right top
      y2 = y + 2
      if (isPiece(x2, y2, color)) {
        selectable.push(selector(x2, y2))
      }
      break;

    case 'Bishop':
      for (let index = 1; index < 8; index++) {
        //Bottom right
        x2 = x + index
        y2 = y + index
        if (isPiece(x2, y2, color)) {
          selectable.push(selector(x2, y2))
        }
      }

      for (let index = 1; index < 8; index++) {
        //Top right
        x2 = x - index
        y2 = y + index
        if (isPiece(x2, y2, color)) {
          selectable.push(selector(x2, y2))
        }
      }

      for (let index = 1; index < 8; index++) {
        //Top left
        x2 = x - index
        y2 = y - index
        if (isPiece(x2, y2, color)) {
          selectable.push(selector(x2, y2))
        }
      }

      for (let index = 1; index < 8; index++) {
        //Bottom left
        x2 = x + index
        y2 = y - index
        if (isPiece(x2, y2, color)) {
          selectable.push(selector(x2, y2))
        }
      }
      break;

    case 'Queen':
      //Rook path
      for (let index = 1; index < 8; index++) {
        //Back
        x2 = x + index
        y2 = y
        if (isPiece(x2, y2, color)) {
          selectable.push(selector(x2, y2))
        }
      }

      for (let index = 1; index < 8; index++) {
        //Front
        x2 = x - index
        y2 = y
        if (isPiece(x2, y2, color)) {
          selectable.push(selector(x2, y2))
        }
      }

      for (let index = 1; index < 8; index++) {
        //Left
        x2 = x
        y2 = y - index
        if (isPiece(x2, y2, color)) {
          selectable.push(selector(x2, y2))
        }
      }

      for (let index = 1; index < 8; index++) {
        //Right
        x2 = x
        y2 = y + index
        if (isPiece(x2, y2, color)) {
          selectable.push(selector(x2, y2))
        }
      }

      //Bishop path
      for (let index = 1; index < 8; index++) {
        //Bottom right
        x2 = x + index
        y2 = y + index
        if (isPiece(x2, y2, color)) {
          selectable.push(selector(x2, y2))
        }
      }

      for (let index = 1; index < 8; index++) {
        //Top right
        x2 = x - index
        y2 = y + index
        if (isPiece(x2, y2, color)) {
          selectable.push(selector(x2, y2))
        }
      }

      for (let index = 1; index < 8; index++) {
        //Top left
        x2 = x - index
        y2 = y - index
        if (isPiece(x2, y2, color)) {
          selectable.push(selector(x2, y2))
        }
      }

      for (let index = 1; index < 8; index++) {
        //Bottom left
        x2 = x + index
        y2 = y - index
        if (isPiece(x2, y2, color)) {
          selectable.push(selector(x2, y2))
        }
      }
      break;

    case 'King':
      x2 = x - 1//Front
      y2 = y
      if (isPiece(x2, y2, color)) {
        selectable.push(selector(x2, y2))
      }

      x2 = x - 1//Front left
      y2 = y - 1
      if (isPiece(x2, y2, color)) {
        selectable.push(selector(x2, y2))
      }

      x2 = x//Left
      y2 = y - 1
      if (isPiece(x2, y2, color)) {
        selectable.push(selector(x2, y2))
      }

      x2 = x + 1//Back left
      y2 = y - 1
      if (isPiece(x2, y2, color)) {
        selectable.push(selector(x2, y2))
      }

      x2 = x + 1//Back
      y2 = y
      if (isPiece(x2, y2, color)) {
        selectable.push(selector(x2, y2))
      }

      x2 = x + 1//Back right
      y2 = y + 1
      if (isPiece(x2, y2, color)) {
        selectable.push(selector(x2, y2))
      }

      x2 = x//Right
      y2 = y + 1
      if (isPiece(x2, y2, color)) {
        selectable.push(selector(x2, y2))
      }

      x2 = x - 1//Front right
      y2 = y + 1
      if (isPiece(x2, y2, color)) {
        selectable.push(selector(x2, y2))
      }
      break;

    default:
      break;
  }
  selectable.forEach(element => {
    element.classList.add('selected')
  })
}

function movePiece(source, dest) { // Move piece
  console.log('item has to be moved from : ' + source + ' to : ' + dest)
  selectable.forEach(element => {
    element.classList.remove('selected')
  })
  console.log(source.childNodes)
  if (dest.hasChildNodes() == true) {
    dest.removeChild(dest.firstChild)
  }
  //Get all the piece attributes
  const img = source.firstChild
  const name = img.getAttribute('data-name')
  const color = source.getAttribute('data-color')
  //Delete the piece
  source.removeChild(source.firstChild)
  source.removeAttribute('data-piece')
  //Display the piece at it's new pos
  dest.appendChild(img)
  dest.setAttribute('data-piece', name)
  dest.setAttribute('data-color', color)
  selectable = []
  oldElement = undefined
}

function neighbours(x, y, color) { // Detect collisions
  /*
    -x-y | -x | -x+y    1|2|3
    -y   | xy | +y      4| |5
    +x-y | +x | +x+y    6|7|8
    */
  const piece = selector(x, y).getAttribute('data-piece')
  const collisions = []

  if (piece == 'bPawn') {
    x++
    y++

    try {// Get the piece on the right
      if (selector(x, y).hasChildNodes() == true) {
        const obj = {}
        obj.collision = 8
        obj.color = selector(x, y).getAttribute('data-color')
        if (obj.color != color) {
          collisions.push(obj)
        }
      } // +x+y
    } catch (error) {
      console.error(error)
    }

    y -= 2

    try {// Get the piece on the left
      if (selector(x, y).hasChildNodes() == true) {
        const obj = {}
        obj.collision = 6
        obj.color = selector(x, y).getAttribute('data-color')
        if (obj.color != color) {
          collisions.push(obj)
        }
      } // +x-y
    } catch (error) {
      console.error(error)
    }
  }
  if (piece == 'wPawn') {
    x--
    y--

    try {// Get the piece on the left
      if (selector(x, y).hasChildNodes() == true) {
        const obj = {}
        obj.collision = 1
        obj.color = selector(x, y).getAttribute('data-color')
        if (obj.color != color) {
          collisions.push(obj)
        }
      } // +x+y
    } catch (error) {
      console.error(error)
    }

    y++
    try {// Get the piece on the middle
      if (selector(x, y).hasChildNodes() == true) {
        const obj = {}
        obj.collision = 2
        obj.color = selector(x, y).getAttribute('data-color')
        if (obj.color != color) {
          collisions.push(obj)
        }
      } // +x
    } catch (error) {
      console.error(error)
    }

    y++

    try {// Get the piece on the right
      if (selector(x, y).hasChildNodes() == true) {
        const obj = {}
        obj.collision = 3
        obj.color = selector(x, y).getAttribute('data-color')
        if (obj.color != color) {
          collisions.push(obj)
        }
      } // +x-y
    } catch (error) {
      console.error(error)
    }
  }
  return collisions
}

function isPiece(x, y, color) {
  try {
    if (selector(x, y).hasChildNodes() == true) {
      const piece = {}
      piece.color = selector(x, y).getAttribute('data-color')
      if (piece.color == color) {
        return false
      } else {
        return true
      }
    }
    else {
      return true
    }
  } catch (error) {
    console.error(error)
  }
}
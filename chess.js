/* eslint-disable eqeqeq */
let oldElement
let selectable = []

function drawBoard () { //  On dessine le plateau
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
function selector (x, y) {
  const select = document.querySelectorAll('td[data-x="' + x + '"]')
  // console.log(select);
  let find = false
  let yInSel
  let i = 0
  while (find == false) {
    yInSel = select[i].getAttribute('data-y')
    // console.log(yInSel);
    if (yInSel == y) {
      find = true
      // console.log('Found')
    } else {
      i++
    }
  }
  const id = select[i].getAttribute('id')
  const element = document.getElementById(id)
  return element
}

function prepareBoard () { // Ajouter les pions au plateau
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
    // console.log(path);
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
    }
    finished = true
  }
}

function addListener () { // On ajoute les listner qui permettent de réagir au click
  const td = document.querySelectorAll('td')
  td.forEach(element => {
    element.onclick = selectPiece
    // console.log("done");
  })
}

function selectPiece (event) { // On piece select
  var source = event.target || event.srcElement
  console.log(source)
  console.log(source.tagName)
  if (source.tagName !== 'TD') {
    source = source.parentElement
  }

  if (oldElement == undefined) {
    showTraj(source)
    oldElement = source
  } else if (selectable.includes(source) == true) {
    movePiece(oldElement, source)
    console.log('clicked twice')
  } else {
    oldElement.classList.remove('selected')
    selectable.forEach(element => {
      element.classList.remove('selected')
    })
    selectable = []
    oldElement = undefined
    console.log('aborted click')
  }
}

function showTraj (source) { // calcule les trajectoires
  let x = source.getAttribute('data-x')
  const y = source.getAttribute('data-y')
  const piece = source.getAttribute('data-piece')
  console.log('x : ' + x + ' y : ' + y)
  console.log(source.childNodes)
  if (piece == 'bPawn') {
    x++
    selectable.push(selector(x, y))
    if (source.getAttribute('data-x') == 1) {
      x++
      selectable.push(selector(x, y))
      x--
    }
    x--
    const eatable = neighbours(x, y)
    if (findKey(eatable, 6) == true) {
      let x2 = x
      let y2 = y
      x2++
      y2--
      selectable.push(selector(x2, y2))
    }
    if (findKey(eatable, 8) == true) {
      let x2 = x
      let y2 = y
      x2++
      y2++
      selectable.push(selector(x2, y2))
    }
    if (findKey(eatable, 7) == true) {
      selectable.splice(0, 1)
    }
  }
  if (piece == 'wPawn') {
    x--
    selectable.push(selector(x, y))
    if (source.getAttribute('data-x') == 6) {
      x--
      selectable.push(selector(x, y))
      x++
    }
    x++
    const eatable = neighbours(x, y)
    if (findKey(eatable, 1) == true) {
      let x2 = x
      let y2 = y
      x2--
      y2--
      selectable.push(selector(x2, y2))
    }
    if (findKey(eatable, 3) == true) {
      let x2 = x
      let y2 = y
      x2--
      y2++
      selectable.push(selector(x2, y2))
    }
    if (findKey(eatable, 2) == true) {
      selectable.splice(0, 1)
    }
  }
  selectable.forEach(element => {
    element.classList.add('selected')
  })
}

function movePiece (source, dest) { // déplace une pièce
  console.log('item has to be moved from : ' + source + ' to : ' + dest)
  selectable.forEach(element => {
    element.classList.remove('selected')
  })
  console.log(source.childNodes)
  if (dest.hasChildNodes() == true) {
    dest.removeChild(dest.firstChild)
  }
  const img = source.firstChild
  const name = img.getAttribute('data-name')
  source.removeChild(source.firstChild)
  source.removeAttribute('data-piece')
  dest.appendChild(img)
  dest.setAttribute('data-piece', name)
  selectable = []
  oldElement = undefined
}

function neighbours (x, y, color) { // detection des collisions
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

    try {
      if (selector(x, y).hasChildNodes() == true) {
        const obj = {}
        obj.collision = 8
        obj.color = selector(x, y).getAttribute('data-color')
        collisions.push(obj)
      } // +x+y
    } catch (error) {
      console.error(error)
    }

    y--
    try {
      if (selector(x, y).hasChildNodes() == true) {
        const obj = {}
        obj.collision = 7
        obj.color = selector(x, y).getAttribute('data-color')
        collisions.push(obj)
      } // +x
    } catch (error) {
      console.error(error)
    }

    y--

    try {
      if (selector(x, y).hasChildNodes() == true) {
        const obj = {}
        obj.collision = 6
        obj.color = selector(x, y).getAttribute('data-color')
        collisions.push(obj)
      } // +x-y
    } catch (error) {
      console.error(error)
    }
  }
  if (piece == 'wPawn') {
    x--
    y--

    try {
      if (selector(x, y).hasChildNodes() == true) {
        const obj = {}
        obj.collision = 1
        obj.color = selector(x, y).getAttribute('data-color')
        collisions.push(obj)
      } // +x+y
    } catch (error) {
      console.error(error)
    }

    y++
    try {
      if (selector(x, y).hasChildNodes() == true) {
        const obj = {}
        obj.collision = 2
        obj.color = selector(x, y).getAttribute('data-color')
        collisions.push(obj)
      } // +x
    } catch (error) {
      console.error(error)
    }

    y++

    try {
      if (selector(x, y).hasChildNodes() == true) {
        const obj = {}
        obj.collision = 3
        obj.color = selector(x, y).getAttribute('data-color')
        collisions.push(obj)
      } // +x-y
    } catch (error) {
      console.error(error)
    }
  }
  return collisions
}

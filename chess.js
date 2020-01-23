"use strict";

let oldElement = undefined;
let selectable = [];

function drawBoard() {
  let id = 0;
  let table = document.createElement("table");
  for (let i = 0; i < 8; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < 8; j++) {
      let td = document.createElement("td");
      if (i % 2 == j % 2) {
        td.className = "w";
        td.setAttribute("data-x", i);
        td.setAttribute("data-y", j);
        td.setAttribute("id", id);
        id++;
      } else {
        td.className = "b";
        td.setAttribute("data-x", i);
        td.setAttribute("data-y", j);
        td.setAttribute("id", id);
        id++;
      }
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  document.body.appendChild(table);
}
function selector(x, y) {
  let select = document.querySelectorAll('td[data-x="' + x + '"]');
  //console.log(select);
  let find = false;
  let yInSel;
  let i = 0;
  while (find == false) {
    yInSel = select[i].getAttribute("data-y");
    //console.log(yInSel);
    if (yInSel == y) {
      find = true;
      //console.log('Found')
    } else {
      i++;
    }
  }
  let id = select[i].getAttribute("id");
  let element = document.getElementById(id);
  return element;
}
// function test(x, y) {
//     let abc = selector(x, y);
//     abc.setAttribute("class", "g");
// }
function prepareBoard() {
  for (let i = 0; i < blackPattern.length; i++) {
    let element = blackPattern[i];
    let path = element.path;
    let y = element.y;
    let x = 0;
    let chessSquare = selector(x, y);
    let image = chessSquare.appendChild(document.createElement("img"));
    image.setAttribute("src", path);
    chessSquare.setAttribute("data-piece", element.name);
    image.setAttribute("data-name", element.name);
    chessSquare.setAttribute("data-color", "b");
  }
  for (let i = 0; i < whitePattern.length; i++) {
    let element = whitePattern[i];
    let path = element.path;
    //console.log(path);
    let y = element.y;
    let x = 7;
    let chessSquare = selector(x, y);
    let image = chessSquare.appendChild(document.createElement("img"));
    image.setAttribute("src", path);
    chessSquare.setAttribute("data-piece", element.name);
    image.setAttribute("data-name", element.name);
    chessSquare.setAttribute("data-color", "w");
  }
  let finished = false;
  while (finished == false) {
    let x = 1;
    for (let y = 0; y < 8; y++) {
      let chessSquare = selector(x, y);
      let path = blackPawn.path;
      let image = chessSquare.appendChild(document.createElement("img"));
      image.setAttribute("src", path);
      chessSquare.setAttribute("data-piece", blackPawn.name);
      image.setAttribute("data-name", blackPawn.name);
      chessSquare.setAttribute("data-color", "b");
    }
    x = 6;
    for (let y = 0; y < 8; y++) {
      let chessSquare = selector(x, y);
      let path = whitePawn.path;
      let image = chessSquare.appendChild(document.createElement("img"));
      image.setAttribute("src", path);
      chessSquare.setAttribute("data-piece", whitePawn.name);
      image.setAttribute("data-name", whitePawn.name);
      chessSquare.setAttribute("data-color", "w");
    }
    finished = true;
  }
}

function addListener() {
  let td = document.querySelectorAll("td");
  td.forEach(element => {
    element.onclick = selectPiece;
    //console.log("done");
  });
}

function selectPiece(event) {
  var source = event.target || event.srcElement;
  console.log(source);
  console.log(source.tagName);
  if (source.tagName !== "TD") {
    source = source.parentElement;
  }

  if (oldElement == undefined) {
    showTraj(source);
    oldElement = source;
  } else if (selectable.includes(source) == true) {
    movePiece(oldElement, source);
    console.log("clicked twice");
  } else {
    oldElement.classList.remove("selected");
    selectable.forEach(element => {
      element.classList.remove("selected");
    });
    selectable = [];
    oldElement = undefined;
    console.log("aborted click");
  }
}

function showTraj(source) {
  let x = source.getAttribute("data-x");
  let y = source.getAttribute("data-y");
  let piece = source.getAttribute("data-piece");
  console.log("x : " + x + " y : " + y);
  console.log(source.childNodes);
  if (piece == "bPawn") {
    x++;
    selectable.push(selector(x, y));
    if (source.getAttribute("data-x") == 1) {
      x++;
      selectable.push(selector(x, y));
      x--;
    }
    x--;
    let eatable = neighbours(x, y);
    if (findKey(eatable, 6) == true) {
      let x2 = x;
      let y2 = y;
      x2++;
      y2--;
      selectable.push(selector(x2, y2));
    }
    if (findKey(eatable, 8) == true) {
      let x2 = x;
      let y2 = y;
      x2++;
      y2++;
      selectable.push(selector(x2, y2));
    }
    if (findKey(eatable, 7) == true) {
      selectable.splice(0, 1);
    }
  }
  if (piece == "wPawn") {
    x--;
    selectable.push(selector(x, y));
    if (source.getAttribute("data-x") == 6) {
      x--;
      selectable.push(selector(x, y));
      x++;
    }
    x++;
    let eatable = neighbours(x, y);
    if (findKey(eatable, 1) == true) {
      let x2 = x;
      let y2 = y;
      x2--;
      y2--;
      selectable.push(selector(x2, y2));
    }
    if (findKey(eatable, 3) == true) {
      let x2 = x;
      let y2 = y;
      x2--;
      y2++;
      selectable.push(selector(x2, y2));
    }
    if (findKey(eatable, 2) == true) {
      selectable.splice(0, 1);
    }
  }
  selectable.forEach(element => {
    element.classList.add("selected");
  });
}

function movePiece(source, dest) {
  console.log("item has to be moved from : " + source + " to : " + dest);
  selectable.forEach(element => {
    element.classList.remove("selected");
  });
  console.log(source.childNodes);
  if (dest.hasChildNodes() == true) {
    dest.removeChild(dest.firstChild);
  }
  let img = source.firstChild;
  let name = img.getAttribute("data-name");
  source.removeChild(source.firstChild);
  source.removeAttribute("data-piece");
  dest.appendChild(img);
  dest.setAttribute("data-piece", name);
  selectable = [];
  oldElement = undefined;
}

function neighbours(x, y, color) {
  /*
    -x-y | -x | -x+y    1|2|3
    -y   | xy | +y      4| |5
    +x-y | +x | +x+y    6|7|8
    */
  let piece = selector(x, y).getAttribute("data-piece");
  let collisions = [];

  if (piece == "bPawn") {
    x++;
    y++;

    try {
      if (selector(x, y).hasChildNodes() == true) {
        let obj = {};
        obj["collision"] = 8;
        obj["color"] = selector(x, y).getAttribute("data-color");
        collisions.push(obj);
      } //+x+y
    } catch (error) {
      console.error(error);
    }

    y--;
    try {
      if (selector(x, y).hasChildNodes() == true) {
        let obj = {};
        obj["collision"] = 7;
        obj["color"] = selector(x, y).getAttribute("data-color");
        collisions.push(obj);
      } //+x
    } catch (error) {
      console.error(error);
    }

    y--;

    try {
      if (selector(x, y).hasChildNodes() == true) {
        let obj = {};
        obj["collision"] = 6;
        obj["color"] = selector(x, y).getAttribute("data-color");
        collisions.push(obj);
      } //+x-y
    } catch (error) {
      console.error(error);
    }
  }
  if (piece == "wPawn") {
    x--;
    y--;

    try {
      if (selector(x, y).hasChildNodes() == true) {
        let obj = {};
        obj["collision"] = 1;
        obj["color"] = selector(x, y).getAttribute("data-color");
        collisions.push(obj);
      } //+x+y
    } catch (error) {
      console.error(error);
    }

    y++;
    try {
      if (selector(x, y).hasChildNodes() == true) {
        let obj = {};
        obj["collision"] = 2;
        obj["color"] = selector(x, y).getAttribute("data-color");
        collisions.push(obj);
      } //+x
    } catch (error) {
      console.error(error);
    }

    y++;

    try {
      if (selector(x, y).hasChildNodes() == true) {
        let obj = {};
        obj["collision"] = 3;
        obj["color"] = selector(x, y).getAttribute("data-color");
        collisions.push(obj);
      } //+x-y
    } catch (error) {
      console.error(error);
    }
  }
  return collisions;
}

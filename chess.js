let oldElement = undefined;

function drawBoard() {
    let table = document.createElement("table");
    for (let i = 0; i < 8; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < 8; j++) {
            let td = document.createElement('td');
            if (i % 2 == j % 2) {
                td.className = "w";
                td.setAttribute('data-x', i)
                td.setAttribute('data-y', j)
            } else {
                td.className = "b";
                td.setAttribute('data-x', i)
                td.setAttribute('data-y', j)
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    document.body.appendChild(table);
}
function selector(x, y) {
    let select = document.querySelectorAll('td[data-x="' + x + '"]');
    console.log(select);
    let find = false;
    let yInSel;
    let i = 0;
    while (find == false) {
        yInSel = select[i].getAttribute('data-y');
        console.log(yInSel);
        if (yInSel == y) {
            find = true
            console.log('Found')
        } else {
            i++;
        }
    }
    return (select[i]);
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
        let image = chessSquare.appendChild(document.createElement("img"))
        image.setAttribute("src", path);
        chessSquare.setAttribute("data-piece", element.name);
    }
    for (let i = 0; i < whitePattern.length; i++) {
        let element = whitePattern[i];
        let path = element.path;
        console.log(path);
        let y = element.y;
        let x = 7;
        let chessSquare = selector(x, y);
        let image = chessSquare.appendChild(document.createElement("img"))
        image.setAttribute("src", path);
        chessSquare.setAttribute("data-piece", element.name);
    }
    let finished = false;
    while (finished == false) {
        let x = 1
        for (let y = 0; y < 8; y++) {
            let chessSquare = selector(x, y);
            let path = blackPawn.path;
            let image = chessSquare.appendChild(document.createElement("img"))
            image.setAttribute("src", path);
            chessSquare.setAttribute("data-piece", blackPawn.name);
        }
        x = 6
        for (let y = 0; y < 8; y++) {
            let chessSquare = selector(x, y);
            let path = whitePawn.path;
            let image = chessSquare.appendChild(document.createElement("img"))
            image.setAttribute("src", path);
            chessSquare.setAttribute("data-piece", whitePawn.name);
        }
        finished = true;
    }
}

function addListener() {
    let td = document.querySelectorAll('td');
    td.forEach(element => {
        element.onclick = selectPiece;
        console.log("done");
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
        source.classList.add("selected");
        oldElement = source;
    } else if (source == oldElement) {
        source.classList.remove("selected")
        console.log("clicked twice")
        oldElement = undefined;
    } else {
        oldElement.classList.remove("selected")
        oldElement = undefined;
        console.log("aborted click")
    }

}

function move(source) {
    let x = source.getAttribute("data-x");
    let y = source.getAttribute("data-y");
    console.log("x : " + x + " y : " + y);

}
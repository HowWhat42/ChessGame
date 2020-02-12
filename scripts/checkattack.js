/* eslint-disable */
function underAttack(piece, color) {// Check king state
    const piecePos = document.querySelector(`[data-piece=${color}${piece}]`);// Get king pos
    let selectable = showPath(piecePos, 'Rook');// Check if under rook attack or queen
    selectable.forEach((element) => {
        element.classList.remove('selected');
        const x = element.getAttribute('data-x');
        const y = element.getAttribute('data-y');
        const name = element.getAttribute('data-piece');
        if (selector(x, y).hasChildNodes() == true) {
            if (name == 'wRook' || name == 'wQueen' || name == 'bRook' || name == 'bQueen') {
                piecePos.classList.add('checkmate');
                return true;
            } else {
                return false;
            }
        }
    });
    selectable = showPath(piecePos, 'Bishop');// Check if under bishop attack or queen
    selectable.forEach((element) => {
        element.classList.remove('selected');
        const x = element.getAttribute('data-x');
        const y = element.getAttribute('data-y');
        const name = element.getAttribute('data-piece');
        if (selector(x, y).hasChildNodes() == true) {
            if (name == 'wBishop' || name == 'wQueen' || name == 'bBishop' || name == 'bQueen') {
                piecePos.classList.add('checkmate');
                return true;
            } else {
                return false;
            }
        }
    });
    selectable = showPath(piecePos, 'Knight');// Check if under knight attack
    selectable.forEach((element) => {
        element.classList.remove('selected');
        const x = element.getAttribute('data-x');
        const y = element.getAttribute('data-y');
        const name = element.getAttribute('data-piece');
        if (selector(x, y).hasChildNodes() == true) {
            if (name == 'wKnight' || name == 'bKnight') {
                piecePos.classList.add('checkmate');
                return true;
            } else {
                return false;
            }
        }
    });

    if (color == 'w') {
        selectable = showPath(piecePos, 'bPawn');// Check if under pawn attack
        selectable.forEach((element) => {
            element.classList.remove('selected');
            const x = element.getAttribute('data-x');
            const y = element.getAttribute('data-y');
            const name = element.getAttribute('data-piece');
            if (selector(x, y).hasChildNodes() == true) {
                if (name == 'bPawn') {
                    piecePos.classList.add('checkmate');
                    return true;
                } else {
                    return false;
                }
            }
        });
    } else {
        selectable = showPath(piecePos, 'wPawn');// Check if under pawn attack
        selectable.forEach((element) => {
            element.classList.remove('selected');
            const x = element.getAttribute('data-x');
            const y = element.getAttribute('data-y');
            const name = element.getAttribute('data-piece');
            if (selector(x, y).hasChildNodes() == true) {
                if (name == 'wPawn') {
                    piecePos.classList.add('checkmate');
                    return true;
                } else {
                    return false;
                }
            }
        });
    }
}

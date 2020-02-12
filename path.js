/* eslint-disable */
function showPath(source, piece) { // Calculate and display traj
    const x = parseInt(source.getAttribute('data-x'));
    const y = parseInt(source.getAttribute('data-y'));
    if (piece == undefined) {
        piece = source.getAttribute('data-piece');
    }
    const color = source.getAttribute('data-color');
    let x2;
    let y2;
    switch (piece) {
        case 'bPawn':
            x2 = x + 1;// Front
            y2 = y;
            if (isPiece(x2, y2, color, 'bPawn') == 'true') {
                selectable.push(selector(x2, y2));
            }
            // Front + 2
            if (source.getAttribute('data-x') == 1) {
                x2 = x + 2;
                y2 = y;
                if (isPiece(x2, y2, color, 'bPawn') == 'true') {
                    selectable.push(selector(x2, y2));
                }
            }

            x2 = x + 1;// Front Right
            y2 = y + 1;
            if (isPiece(x2, y2, color, 'bPawn', 'right') == 'eatable') {
                selectable.push(selector(x2, y2));
            }

            x2 = x + 1;// Front left
            y2 = y - 1;
            if (isPiece(x2, y2, color, 'bPawn', 'left') == 'eatable') {
                selectable.push(selector(x2, y2));
            }
            break;

        case 'wPawn':
            x2 = x - 1;// Front
            y2 = y;
            if (isPiece(x2, y2, color, 'wPawn') == 'true') {
                selectable.push(selector(x2, y2));
            }
            // Front + 2
            if (source.getAttribute('data-x') == 6) {
                x2 = x - 2;
                y2 = y;
                if (isPiece(x2, y2, color, 'wPawn') == 'true') {
                    selectable.push(selector(x2, y2));
                }
            }

            x2 = x - 1;// Front left
            y2 = y - 1;
            if (isPiece(x2, y2, color, 'wPawn', 'left') == 'eatable') {
                selectable.push(selector(x2, y2));
            }

            x2 = x - 1;// Front right
            y2 = y + 1;
            if (isPiece(x2, y2, color, 'wPawn', 'right') == 'eatable') {
                selectable.push(selector(x2, y2));
            }
            break;

        case 'Rook':
        case 'wRook':
        case 'bRook':
            for (let index = 1; index < 8; index++) {// Back
                x2 = x + index;
                y2 = y;
                if (isPiece(x2, y2, color) == 'true') {
                    selectable.push(selector(x2, y2));
                } else if (isPiece(x2, y2, color) == 'eatable') {
                    selectable.push(selector(x2, y2));
                    break;
                } else {
                    break;
                }
            }

            for (let index = 1; index < 8; index++) {// Front
                x2 = x - index;
                y2 = y;
                if (isPiece(x2, y2, color) == 'true') {
                    selectable.push(selector(x2, y2));
                } else if (isPiece(x2, y2, color) == 'eatable') {
                    selectable.push(selector(x2, y2));
                    break;
                } else {
                    break;
                }
            }

            for (let index = 1; index < 8; index++) {// Left
                x2 = x;
                y2 = y - index;
                if (isPiece(x2, y2, color) == 'true') {
                    selectable.push(selector(x2, y2));
                } else if (isPiece(x2, y2, color) == 'eatable') {
                    selectable.push(selector(x2, y2));
                    break;
                } else {
                    break;
                }
            }

            for (let index = 1; index < 8; index++) {// Right
                x2 = x;
                y2 = y + index;
                if (isPiece(x2, y2, color) == 'true') {
                    selectable.push(selector(x2, y2));
                } else if (isPiece(x2, y2, color) == 'eatable') {
                    selectable.push(selector(x2, y2));
                    break;
                } else {
                    break;
                }
            }
            break;

        case 'Knight':
        case 'wKnight':
        case 'bKnight':
            // Front
            x2 = x - 2;// Front left
            y2 = y - 1;
            if (isPiece(x2, y2, color) == 'true' || isPiece(x2, y2, color) == 'eatable') {
                selectable.push(selector(x2, y2));
            }
            x2 = x - 2;// Front right
            y2 = y + 1;
            if (isPiece(x2, y2, color) == 'true' || isPiece(x2, y2, color) == 'eatable') {
                selectable.push(selector(x2, y2));
            }

            // Left
            x2 = x - 1;// Left top
            y2 = y - 2;
            if (isPiece(x2, y2, color) == 'true' || isPiece(x2, y2, color) == 'eatable') {
                selectable.push(selector(x2, y2));
            }
            x2 = x + 1;// Left bottom
            y2 = y - 2;
            if (isPiece(x2, y2, color) == 'true' || isPiece(x2, y2, color) == 'eatable') {
                selectable.push(selector(x2, y2));
            }

            // Back
            x2 = x + 2;// Back left
            y2 = y - 1;
            if (isPiece(x2, y2, color) == 'true' || isPiece(x2, y2, color) == 'eatable') {
                selectable.push(selector(x2, y2));
            }
            x2 = x + 2;// Back right
            y2 = y + 1;
            if (isPiece(x2, y2, color) == 'true' || isPiece(x2, y2, color) == 'eatable') {
                selectable.push(selector(x2, y2));
            }

            // Right
            x2 = x + 1;// Right bottom
            y2 = y + 2;
            if (isPiece(x2, y2, color) == 'true' || isPiece(x2, y2, color) == 'eatable') {
                selectable.push(selector(x2, y2));
            }
            x2 = x - 1;// Right top
            y2 = y + 2;
            if (isPiece(x2, y2, color) == 'true' || isPiece(x2, y2, color) == 'eatable') {
                selectable.push(selector(x2, y2));
            }
            break;

        case 'Bishop':
        case 'wBishop':
        case 'bBishop':
            for (let index = 1; index < 8; index++) {// Bottom right
                x2 = x + index;
                y2 = y + index;
                if (isPiece(x2, y2, color) == 'true') {
                    selectable.push(selector(x2, y2));
                } else if (isPiece(x2, y2, color) == 'eatable') {
                    selectable.push(selector(x2, y2));
                    break;
                } else {
                    break;
                }
            }

            for (let index = 1; index < 8; index++) {// Top right
                x2 = x - index;
                y2 = y + index;
                if (isPiece(x2, y2, color) == 'true') {
                    selectable.push(selector(x2, y2));
                } else if (isPiece(x2, y2, color) == 'eatable') {
                    selectable.push(selector(x2, y2));
                    break;
                } else {
                    break;
                }
            }

            for (let index = 1; index < 8; index++) {// Top left
                x2 = x - index;
                y2 = y - index;
                if (isPiece(x2, y2, color) == 'true') {
                    selectable.push(selector(x2, y2));
                } else if (isPiece(x2, y2, color) == 'eatable') {
                    selectable.push(selector(x2, y2));
                    break;
                } else {
                    break;
                }
            }

            for (let index = 1; index < 8; index++) {// Bottom left
                x2 = x + index;
                y2 = y - index;
                if (isPiece(x2, y2, color) == 'true') {
                    selectable.push(selector(x2, y2));
                } else if (isPiece(x2, y2, color) == 'eatable') {
                    selectable.push(selector(x2, y2));
                    break;
                } else {
                    break;
                }
            }
            break;

        case 'Queen':
        case 'wQueen':
        case 'bQueen':
            // Rook path
            for (let index = 1; index < 8; index++) {// Back
                x2 = x + index;
                y2 = y;
                if (isPiece(x2, y2, color) == 'true') {
                    selectable.push(selector(x2, y2));
                } else if (isPiece(x2, y2, color) == 'eatable') {
                    selectable.push(selector(x2, y2));
                    break;
                } else {
                    break;
                }
            }

            for (let index = 1; index < 8; index++) {// Front
                x2 = x - index;
                y2 = y;
                if (isPiece(x2, y2, color) == 'true') {
                    selectable.push(selector(x2, y2));
                } else if (isPiece(x2, y2, color) == 'eatable') {
                    selectable.push(selector(x2, y2));
                    break;
                } else {
                    break;
                }
            }

            for (let index = 1; index < 8; index++) {// Left
                x2 = x;
                y2 = y - index;
                if (isPiece(x2, y2, color) == 'true') {
                    selectable.push(selector(x2, y2));
                } else if (isPiece(x2, y2, color) == 'eatable') {
                    selectable.push(selector(x2, y2));
                    break;
                } else {
                    break;
                }
            }

            for (let index = 1; index < 8; index++) {// Right
                x2 = x;
                y2 = y + index;
                if (isPiece(x2, y2, color) == 'true') {
                    selectable.push(selector(x2, y2));
                } else if (isPiece(x2, y2, color) == 'eatable') {
                    selectable.push(selector(x2, y2));
                    break;
                } else {
                    break;
                }
            }

            // Bishop path
            for (let index = 1; index < 8; index++) {// Bottom right
                x2 = x + index;
                y2 = y + index;
                if (isPiece(x2, y2, color) == 'true') {
                    selectable.push(selector(x2, y2));
                } else if (isPiece(x2, y2, color) == 'eatable') {
                    selectable.push(selector(x2, y2));
                    break;
                } else {
                    break;
                }
            }

            for (let index = 1; index < 8; index++) {// Top right
                x2 = x - index;
                y2 = y + index;
                if (isPiece(x2, y2, color) == 'true') {
                    selectable.push(selector(x2, y2));
                } else if (isPiece(x2, y2, color) == 'eatable') {
                    selectable.push(selector(x2, y2));
                    break;
                } else {
                    break;
                }
            }

            for (let index = 1; index < 8; index++) {// Top left
                x2 = x - index;
                y2 = y - index;
                if (isPiece(x2, y2, color) == 'true') {
                    selectable.push(selector(x2, y2));
                } else if (isPiece(x2, y2, color) == 'eatable') {
                    selectable.push(selector(x2, y2));
                    break;
                } else {
                    break;
                }
            }

            for (let index = 1; index < 8; index++) {// Bottom left
                x2 = x + index;
                y2 = y - index;
                if (isPiece(x2, y2, color) == 'true') {
                    selectable.push(selector(x2, y2));
                } else if (isPiece(x2, y2, color) == 'eatable') {
                    selectable.push(selector(x2, y2));
                    break;
                } else {
                    break;
                }
            }
            break;

        case 'wKing':
        case 'bKing':
            x2 = x - 1;// Front
            y2 = y;
            if (isPiece(x2, y2, color) == 'true' || isPiece(x2, y2, color) == 'eatable') {
                selectable.push(selector(x2, y2));
            }

            x2 = x - 1;// Front left
            y2 = y - 1;
            if (isPiece(x2, y2, color) == 'true' || isPiece(x2, y2, color) == 'eatable') {
                selectable.push(selector(x2, y2));
            }

            x2 = x;// Left
            y2 = y - 1;
            if (isPiece(x2, y2, color) == 'true' || isPiece(x2, y2, color) == 'eatable') {
                selectable.push(selector(x2, y2));
            }

            x2 = x + 1;// Back left
            y2 = y - 1;
            if (isPiece(x2, y2, color) == 'true' || isPiece(x2, y2, color) == 'eatable') {
                selectable.push(selector(x2, y2));
            }

            x2 = x + 1;// Back
            y2 = y;
            if (isPiece(x2, y2, color) == 'true' || isPiece(x2, y2, color) == 'eatable') {
                selectable.push(selector(x2, y2));
            }

            x2 = x + 1;// Back right
            y2 = y + 1;
            if (isPiece(x2, y2, color) == 'true' || isPiece(x2, y2, color) == 'eatable') {
                selectable.push(selector(x2, y2));
            }

            x2 = x;// Right
            y2 = y + 1;
            if (isPiece(x2, y2, color) == 'true' || isPiece(x2, y2, color) == 'eatable') {
                selectable.push(selector(x2, y2));
            }

            x2 = x - 1;// Front right
            y2 = y + 1;
            if (isPiece(x2, y2, color) == 'true' || isPiece(x2, y2, color) == 'eatable') {
                selectable.push(selector(x2, y2));
            }
            break;

        default:
            break;
    }
    selectable.forEach((element) => {
        element.classList.add('selected');
    });
    return selectable;
}
/* eslint-disable require-jsdoc */
// eslint-disable-next-line no-var
var finalScore;

function sendHighScore() {
  const name = document.querySelector('#userName').value;

  fetch('http://localhost:8080', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'user': name,
      'score': finalScore,
    },
    ),
  });
}

function getHighScore() {
  fetch('http://localhost:8080')
      .then((res) => res.json())
      .then((res) => {
        scoreTable = JSON.parse(res.scoreTable);
        console.log(scoreTable);
        console.log();
        const scoreDisplay = document.createElement('div');
        scoreDisplay.setAttribute('id', 'scoreDisplay');
        const scoreP = document.createElement('h1');
        scoreP.innerText = 'Votre score est : ' + finalScore;
        const nameInput = document.createElement('input');
        nameInput.setAttribute('id', 'userName');
        nameInput.setAttribute('minlength', '1');
        nameInput.setAttribute('placeholder', 'Enter you name');
        const button = document.createElement('button');
        button.setAttribute('onclick', 'sendHighScore()');
        scoreDisplay.appendChild(scoreP);
        scoreDisplay.appendChild(nameInput);
        scoreDisplay.appendChild(button);
        const table = document.createElement('table');
        table.setAttribute('id', 'scoreTable');
        createHeader(table);
        scoreTable.forEach((element) => {
          const tr = document.createElement('tr');
          for (const [key, value] of Object.entries(element)) {
            const td = document.createElement('td');
            td.innerHTML = value;
            tr.appendChild(td);
          }
          table.appendChild(tr);
        });
        document.body.innerHTML = '';
        document.body.appendChild(scoreDisplay);
        document.body.appendChild(table);
      });
}

function createHeader(node) {
  const tr = document.createElement('tr');
  const td1 = document.createElement('td');
  const td2 = document.createElement('td');
  td1.innerText = 'Name';
  td2.innerText = 'Score';
  tr.appendChild(td1);
  tr.appendChild(td2);
  node.appendChild(tr);
}

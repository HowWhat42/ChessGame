/* eslint-disable require-jsdoc */

function highScore(name, score) {
  try {
    const name = document.querySelector('#username').value;
  } catch (error) {

  }

  fetch('http://localhost:8080', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'user': name,
      'score': score,
    },
    ),
  })
      .then((res) => res.json())
      .then((res) => {
        scoreTable = JSON.parse(res.scoreTable);
        console.log(scoreTable);
        console.log();
        const table = document.createElement('table');
        table.setAttribute('id', 'scoreTable');
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
        document.body.appendChild(table);
      });
}

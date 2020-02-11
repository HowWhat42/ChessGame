/* eslint-disable require-jsdoc */

function highScore(name, score) { // couocu
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
        console.log(JSON.parse(res.scoreTable));
        $('body').html = '<table id="score"></table>';
        res.scoreTable.forEach((element) => {
          let row = 
          $('#score').html += 
        });
      });
}

function $(query) {
  document.querySelector(query);
}

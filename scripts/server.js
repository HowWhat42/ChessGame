/* eslint-disable require-jsdoc */
const fs = require('fs');

const rawdata = fs.readFileSync('scoreboard.json', { encoding: 'utf-8' });
const scoreboard = JSON.parse(rawdata);

const http = require('http');

http.createServer((request, response) => {
  const { headers, method, url } = request;
  let body = [];
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    response.on('error', (err) => {
      console.error(err);
    });
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Access-Control-Allow-Origin', headers.origin);
    response.setHeader('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type');
    const scoreTable = JSON.stringify(scoreboard);
    const responseBody = { headers, method, url, scoreTable };
    response.write(JSON.stringify(responseBody));
    response.end();
    if (body.length == 0) {
      console.log('empty' + body + body.length);
    } else {
      console.log('not empty' + body);
      update(body);
    }
  });
}).listen(8080);

function update(body) {
  body = JSON.parse(body);

  scoreboard.sort(function (a, b) {
    return a.score - b.score;
  });
  if (scoreboard.length == 10 && body.score > scoreboard[0].score) {
    scoreboard[0] = body;
    console.log(scoreboard);
  } else if (scoreboard.length == 10) {
    console.log('it\'s not a new highscore !');
  } else {
    scoreboard[scoreboard.length] = body;
  }

  scoreboard.sort(function (a, b) {
    return b.score - a.score;
  });

  const data = JSON.stringify(scoreboard);
  fs.writeFileSync('scoreboard.json', data);
}

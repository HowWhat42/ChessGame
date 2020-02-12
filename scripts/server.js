/* eslint-disable require-jsdoc */
const fs = require('fs');

const rawdata = fs.readFileSync('scoreboard.json', {encoding: 'utf-8'} );
const scoreboard = JSON.parse(rawdata);

console.log(rawdata);
console.log(typeof(rawdata));
console.log(scoreboard);
console.log(typeof(scoreboard));

const http = require('http');

http.createServer((request, response) => {
  const {headers, method, url} = request;
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
    const responseBody = {headers, method, url, scoreTable};
    response.write(JSON.stringify(responseBody));
    response.end();
    console.log('caca' + body);
    if (body.length == 0) {
      console.log('empty' + body + body.length);
    } else {
      console.log('not empty' + body);
      update(body);
    }
  });
}).listen(8080);

function update(body) {
  console.log('coucou'+body);
  body = JSON.parse(body);
  console.log('body : ' + body + '\n' + typeof(body));

  scoreboard.sort(function(a, b) {
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

  scoreboard.sort(function(a, b) {
    return b.score - a.score;
  });

  console.log(scoreboard.length);

  console.log(scoreboard);

  const data = JSON.stringify(scoreboard);
  fs.writeFileSync('scoreboard.json', data);
}

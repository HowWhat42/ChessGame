function highScore (data) {
//   const addr = 'http://localhost/'
//   const name = 'cdellies'
//   const points = '51'
//   const score = {
//     name: name,
//     score: points
//   }
//   axios({
//     method: 'post',
//     url: addr,
//     data: score
//   })
//     .then(data => console.log(data))
//     .then(err => console.log(err))
  fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: {
        name: 'John',
        email: 'john@example.com'
      }
    })
  })
}

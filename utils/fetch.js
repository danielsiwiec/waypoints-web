module.exports.post = (url, body) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => {
      return response.json()
    })
}

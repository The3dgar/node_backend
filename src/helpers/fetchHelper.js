import fetch from 'node-fetch'

export const fetchOutside = (url, headers, body, method = 'GET') => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(body)
  }

  return fetch(url, options)
}

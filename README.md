# Block Search

## Notes:

1. Instead of the [Weather App](https://www.theodinproject.com/lessons/node-path-javascript-weather-app), I'll go with a Block Explorer utilizing the [mempool.space API](https://mempool.space/docs/api/rest)

## Assignment:

1. HTML, JS, CSS
2. Get current Block + specific Block and console.log
3. Process the JSON Data and return only required data for the app
4. Form to let the user search for specific Blocks
5. Display information on the webpage
6. Style
7. Add a loading component to display how long a requests took
   -> USE async/await or promises to get comfortable with it

## Notes:

### n1:

- txid and block hash are sha256 hashed
- difference is block hash has to start with some zeros (0) depending on difficulty
- block-hash check: starts with at least 6x0s -> (000000)
- if not found as block hash try as TXID
- check flow:
- 1.  hex number with length of 64
- 2.  starts with at least 6x0s
- 2.1 if yes query for block-hash
- 2.1.1 if block hash result is nil - try it as txid
- 2.2 if no try it as txid

### n2:

- curl -sSL "https://mempool.space/api/tx/1156ded14061b3882f134260366c05e3d39f43d34eaf89a00db7f84d5006106b"

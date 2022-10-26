const express = require('express');
const request = require('request');

const app = express();

const getEncodeQuery = (queryObject) =>{
  if(Object.keys(queryObject).length === 0) return null;
  let encodeQuery = '';
  let keys = Object.keys(queryObject);
  keys.forEach((el,idx) => {
    encodeQuery += `${el}=${queryObject[el]}`;
    if(idx < keys.length-1) encodeQuery +='&';
  });
  return encodeQuery;
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/categories', (req, res) => {
  request(
    { url: 'https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-categories' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: 'Categories Error' });
      }

      res.json(JSON.parse(body));
    }
  )
});

app.get('/books', (req, res) => {
  const query = getEncodeQuery(req.query);
  console.log(query);
  request(
    { url: `https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-books${query?`?${query}`:''}` },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: 'Books error'});
      }

      res.json(JSON.parse(body));
    }
  )
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
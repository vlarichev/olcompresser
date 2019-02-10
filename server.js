const express = require('express');
const compress = require('./compress')
const app = express();

app.get('/', (req, res) => {
	res.send('Hallo, das ist die Api! Mögliche Dienste sind <br> <a href="api/kris">Kristi</a><br> <a href="api/customers">Customers</a>')
});

app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});

app.get('/api/kris', (req,res) => {
	const image = "Hi Kristi! ¯\\_(ツ)_/¯ <br> <img src='http://placekitten.com/400/400'/>"
	res.send(image)
});


app.get('/compress',(req,res) => {
	compress.compress(2);
	res.send("done")
})

const port = 5000;

app.listen(port, () => `Hi Vlad, Server running on port ${port}`);
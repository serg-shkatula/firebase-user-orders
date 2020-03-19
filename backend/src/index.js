const express = require('express')
const app = express()
const port = 3000

app.get('/orders', (req, res) => res.send('get:/orders'))
app.put('/orders/:id', (req, res) => res.send('put:/orders/:id'))
app.get('/orders', (req, res) => res.send('get:/orders'))

app.listen(port, () => console.log(`Listening on port ${port}!`))

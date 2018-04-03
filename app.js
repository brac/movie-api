// jshint asi:true

const express    = require('express')
const app        = express()
const bodyParser = require('body-parser')
const movieApi   = require('./routes/movies')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/movies', movieApi)

app.use('/', (req, res) => {
  res.json({ message: 'Welcome!'})
})

app.listen(3000, () => {
  console.log('App is running on port 3000')
})

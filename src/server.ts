import './config/config'

import express from 'express'
import mongoose from 'mongoose'

import bodyParser from 'body-parser'

import userRoutes from './routes/user'

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//rutas
app.use(userRoutes)

if (process.env.URLDB) {
  process.exit(1)
}

mongoose.connect(process.env.URLDB, (err, res) => {
  if (err) throw err

  console.log('Base de datos ONLINE')
})

app.listen(process.env.PORT, () => {
  console.log('Escuchando puerto: ', process.env.PORT)
})

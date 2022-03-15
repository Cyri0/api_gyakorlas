import express from 'express'
import bodyParser from 'body-parser'

import usersRoutes from './routes/users.js'

const app = express()

const PORT = 5000

app.use(bodyParser.json())
app.use('/users', usersRoutes)

app.get('/', (req, res) => {
    console.log("Somebody call the Homepage...")
    res.send('<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Easter egg</a>')
})

app.listen(PORT, () => {
    console.log(`Users: http://localhost:${PORT}/users`)
})
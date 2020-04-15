const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())

app.use(express.json())

morgan.token('body', req => JSON.stringify(req.body))

const logger = morgan(
  ':method :url :status :res[content-length] - :response-time ms :body'
)

app.use(logger)

app.use(express.static('build'))

app.get('/info', (req, res) => {
  const date = new Date()
  res.send(
    `<p>Phonebook has info for ${persons.length} people.</p><p>${date}</p>`
  )
})

app.get('/api/persons', (req, response) => {
    Person.find({}).then((persons) => {
      response.json(persons.map((p) => p.toJSON()))
    })
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((person) => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((person) => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number are missing',
    })
  }

  // const nameAlreadyExists = persons.find((person) => person.name === body.name)

  // if (nameAlreadyExists) {
  //   return response.status(400).json({
  //     error: 'name must be unique',
  //   })
  // }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then((savedPerson) => {
    response.json(savedPerson.toJSON())
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
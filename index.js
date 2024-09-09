const express = require('express')
const app = express()

app.use(express.json())

const cors = require('cors')

app.use(cors())

let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]


const generateId = () => {
  return Math.floor(Math.random() * 500)
}

 
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})
  
app.get('/info', (request, response) => {
  const timeStamp = new Date().toString(); 
  response.send(`<p>Phonebook has info for ${persons.length} people</p>\
      <p>${timeStamp}</p>`)
})


app.get('/api/persons', (request, response) => {
response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!(body.name && body.number)) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  } else if ((persons.map(person => person.name).filter(name => name === body.name)).length !== 0) {
    return response.status(401).json({ error: 'name must be unique' })
  }
 
  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
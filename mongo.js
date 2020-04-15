const mongoose = require('mongoose')

let mode = 'show'

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

if (process.argv.length === 4) {
  console.log('give number as argument')
  process.exit(1)
}

if (process.argv.length > 4) {
  mode = 'add'
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0-ypjg8.mongodb.net/phonebook-app?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (mode === 'add') {
  const person = new Person({ name, number })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}

if (mode === 'show') {
  console.log('phonebook:')
  Person.find({}).then((result) => {
    result.forEach((p) => {
      console.log(p.name, p.number)
    })
    mongoose.connection.close()
  })
}

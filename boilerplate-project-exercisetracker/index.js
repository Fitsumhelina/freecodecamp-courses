const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// Define Schemas
const userSchema = new mongoose.Schema({
  username: { type: String, required: true }
});

const exerciseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: false }
});

const User = mongoose.model('User', userSchema);
const Exercise = mongoose.model('Exercise', exerciseSchema);

// Routes

// POST /api/users to create a new user
app.post('/api/users', (req, res) => {
  const { username } = req.body
  const newUser = new User({ username })
  newUser.save((err, savedUser) => {
    if (err) return res.json({ error: 'Error creating user' })
    res.json({ username: savedUser.username, _id: savedUser._id })
  })
})

// GET /api/users to get all users
app.get('/api/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.json({ error: 'Error fetching users' })
    res.json(users)
  })
})

// POST /api/users/:_id/exercises to add an exercise
app.post('/api/users/:_id/exercises', (req, res) => {
  const { _id } = req.params
  const { description, duration, date } = req.body
  const exerciseDate = date ? new Date(date) : new Date()

  const newExercise = new Exercise({
    userId: _id,
    description,
    duration: parseInt(duration),
    date: exerciseDate
  })

  newExercise.save((err, savedExercise) => {
    if (err) return res.json({ error: 'Error adding exercise' })

    User.findById(_id, (err, user) => {
      if (err) return res.json({ error: 'User not found' })

      res.json({
        username: user.username,
        description: savedExercise.description,
        duration: savedExercise.duration,
        date: savedExercise.date.toDateString(),
        _id: user._id
      })
    })
  })
})

// GET /api/users/:_id/logs to get a user's exercise log
app.get('/api/users/:_id/logs', (req, res) => {
  const { _id } = req.params
  const { from, to, limit } = req.query

  let dateFilter = {}
  if (from) dateFilter.$gte = new Date(from)
  if (to) dateFilter.$lte = new Date(to)

  Exercise.find({ userId: _id, date: dateFilter })
    .limit(parseInt(limit) || 500)
    .exec((err, exercises) => {
      if (err) return res.json({ error: 'Error fetching exercises' })

      User.findById(_id, (err, user) => {
        if (err) return res.json({ error: 'User not found' })

        res.json({
          username: user.username,
          count: exercises.length,
          _id: user._id,
          log: exercises.map(e => ({
            description: e.description,
            duration: e.duration,
            date: e.date.toDateString()
          }))
        })
      })
    })
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

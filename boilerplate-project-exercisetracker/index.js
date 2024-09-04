require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

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

// POST /api/users to create a new user
app.post('/api/users', async (req, res) => {
  try {
    const { username } = req.body;
    const newUser = new User({ username });
    const savedUser = await newUser.save();
    res.json({ username: savedUser.username, _id: savedUser._id });
  } catch (err) {
    res.json({ error: 'Error creating user' });
  }
});

// GET /api/users to get a list of all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}, 'username _id');
    res.json(users);
  } catch (err) {
    res.json({ error: 'Error fetching users' });
  }
});

// POST /api/users/:_id/exercises to add an exercise
app.post('/api/users/:_id/exercises', async (req, res) => {
  try {
    const { _id } = req.params;
    const { description, duration, date } = req.body;

    let exerciseDate = date ? new Date(date) : new Date();

    const newExercise = new Exercise({
      userId: _id,
      description,
      duration: parseInt(duration),
      date: exerciseDate
    });

    const savedExercise = await newExercise.save();

    const user = await User.findById(_id);
    res.json({
      username: user.username,
      description: savedExercise.description,
      duration: savedExercise.duration,
      date: savedExercise.date.toDateString(),
      _id: user._id
    });
  } catch (err) {
    res.json({ error: 'Error adding exercise' });
  }
});

// GET /api/users/:_id/logs to get a user's exercise log
app.get('/api/users/:_id/logs', async (req, res) => {
    try {
      const { _id } = req.params;
      const { from, to, limit } = req.query;
  
      // Date filter if 'from' and 'to' are provided
      let dateFilter = {};
      if (from || to) {
        dateFilter.date = {};
        if (from) dateFilter.date.$gte = new Date(from);
        if (to) dateFilter.date.$lte = new Date(to);
      }
  
      // Find exercises based on userId and optional date filter
      let exercisesQuery = Exercise.find({ userId: _id, ...dateFilter });
      if (limit) {
        exercisesQuery = exercisesQuery.limit(parseInt(limit));
      }
      const exercises = await exercisesQuery.exec();
  
      const user = await User.findById(_id);
  
      // Build the response
      res.json({
        username: user.username,
        count: exercises.length,  // Total number of exercises
        _id: user._id,
        log: exercises.map(e => ({
          description: e.description,  // Ensure description is a string
          duration: e.duration,  // Ensure duration is a number
          date: e.date.toDateString()  // Format date using toDateString()
        }))
      });
    } catch (err) {
      res.json({ error: 'Error fetching logs' });
    }
  });
  

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
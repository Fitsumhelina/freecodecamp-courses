require('dotenv').config();
const mongoose = require('mongoose');



mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected..."))
.catch(err => {
    console.error("Connection error", err.message);
});

// Define your schema and model here


// Define the person schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "fitsum helina",      
    age: 20,               
    favoriteFoods: ["doro", "firfir", "shiro"] 
  });

  person.save((err, data) => {
    if (err) return done(err);
    done(null, data);          
  });
};


const arrayOfPeople = [
  { name: 'abe ', age: 24, favoriteFoods: ['mojito', 'bread'] },
  { name: 'kebe', age: 21, favoriteFoods: ['burgur', 'chicken'] }
];


const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return done(err);
    done(null, people);
  });
};


const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, people) => {
    if (err) {
      return done(err);
    }
    done(null, people);
  });
};


const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, people) => {
    if (err) {
      return done(err);
    }
    done(null, people);
  });
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

// Export the model and functions
exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

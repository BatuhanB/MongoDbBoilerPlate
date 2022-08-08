const mongoose = require("mongoose");

require("dotenv").config();
const mySecret = process.env["MONGO_URI"];
mongoose.connect(
(MONGO_URI="mongodb+srv://batuhan:batuhan@freecodecamp.gmy6l4b.mongodb.net/FreeCodeCamp?retryWrites=true&w=majority"),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
); //this is our database url to connect

const personSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods : [ String ]
})

const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'Eduardo',
    age: 26,
    favoriteFoods: [
      'Haburguer',
      'Pizza',
      'Churrasco',
      'Massas'
    ]
  });

  person.save( function(err, data) {
    if (err) return done(err)
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data){
    if (err) done(err)
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ personName: personName }, (err, data) => {
    if (err) return done(error);
    done(null, data);
    console.log("Person Has Been Found By personName" + data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function(err, data){
    if (err) done(err)
    done(null, data); 
  });
};

const findPersonById = (personId, done) => {
  Person.findById({ _id:personId }, (err, data) => {
    if (err) return done(err);
    done(null, data);
    console.log("Person Has Been Found By personId" + data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id : personId }, function(err, data){
    if (err) return err
    data.favoriteFoods.push(foodToAdd);
    Person.update(data)
    data.save(function(err, data){
      if (err) done(err)
      done(null, data)
    })
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, { new: true }, function(err, data){
    if (err) done (err)
    done(null, data);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id:personId}, function(err, data){
    if (err) return done(err);
    done(null, data);
    console.log("Person Has Been Deleted By personId" + data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany({ name: nameToRemove }, function(err, data){
    if (err) return done(err);
    done(null, data);
    console.log("Person Has Been Deleted By personName" + data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ foods: foodToSearch })
    .sort("name")
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) return done(err);
    done(null, data);
      console.log("Query Result: " + data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

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
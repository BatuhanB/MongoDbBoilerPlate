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

const Scheme = mongoose.Schema; //we are defining a db scheme(table and fields) to create

const personScheme = new Scheme({
  personName: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
}); //defining a table

const Person = mongoose.model("Person", personScheme); //told mongodb to get as a model

const createAndSavePerson = (done) => {
  const person = new Person({
    personName: "Batuhan Bali",
    age: 22,
    favoriteFoods: ["Apple,Banana"],
  }); //create a new person object
  person.save(function (err, data) {
    done(err, data);
    console.log("Person Has Been Saved" + data);
  }); //save to db table that we have created
};
const arrayOfPeople = [
  { name: 'Adam', age: 24, favoriteFoods: ['indomie noodle'] },
  { name: 'Sola', age: 36, favoriteFoods: ['roasted yam'] },
  { name: 'Colins', age: 48, favoriteFoods: ['Red wine'] },
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    done(err, data);
    console.log("Persons Has Been Saved" + data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ personName: personName }, (err, data) => {
    done(err, data);
    console.log("Person Has Been Found By personName" + data);
  });
};

const findOneByFood = (food, done) => {
  Person.find({ foods: food }, (err, data) => {
    done(err, data);
    console.log("Person Has Been Found By Foods" + data);
  });
};

const findPersonById = (personId, done) => {
  Person.find({ personId }, (err, data) => {
    done(err, data);
    console.log("Person Has Been Found By personId" + data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.find({ personId }, (err, data) => {
    person.foods.push(foodToAdd);

    person.save((err, data) => {
      done(err, data);
      console.log("Person Has Been Edited Food" + data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { personName: personName },
    { $set: { age: ageToSet } },
    (err, data) => {
      done(err, data);
    }
  );
  console.log("Person Has Been Found By name and Updated" + data);
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    done(err, data);
    console.log("Person Has Been Deleted By personId" + data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ personName: nameToRemove }, (err, data) => {
    done(err, data);
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
      done(err, data);
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
//use RESTer in firefox to play with post, get etc and see responses

const express = require("express");
const app = express();
app.use(express.json()); // adding middleware
//express.json returns a piece of middleware
const Joi = require("joi");
//Joi is a class

//
//+++++++++++++++++++++++++++
//GETS

app.get("/", (req, res) => {
  res.send("Helo, work");
});

//'/' represents root of website, second argument is a callback funciton
// req has many properties,
// expressjs.com  - lookup api reference

app.get("/api/forces", (req, res) => {
  res.send(forces);
});

// single parameter
app.get("/api/forces/:id", (req, res) => {
  res.send(req.params.id);
});

//multiple params
app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.params);
});

//query string paramters requested with query string parameters
//like so:
//localhost:3000/api/queryposts/2018/1?sortBy=name

app.get("/api/queryposts/:year/:month", (req, res) => {
  res.send(req.query);
});

//get a particular course
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];
const forces = [{ id: 1, name: "gravitt" }];
app.get("/api/partcourses/:id", (req, res) => {
  console.log(courses, courses[0]);
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("course was not found");
  } //404
  res.send(course);
});

/*

+++++++++++++++++++++++++++++
POST


*/

app.post("/api/courses", (req, res) => {
  const course = { id: courses.length + 1, name: req.body.name };
  console.log(req.body);
  //have to enable parsing of json objects
  // see top of file app.use
  courses.push(course);
  res.send(course);
});

//this one uses input validation
app.post("/api/coursesValid", (req, res) => {
  if (!req.body.name || req.body.name.length < 3) {
    res
      .status(400)
      .send("name is requiered and shoudl be minimum 3 characters");
    return;
    //npm joi is an input validation package, no need to do this here
  }
  const course = { id: courses.length + 1, name: req.body.name };
  //have to enable parsing of json objects
  // see top of file app.use
  courses.push(course);
  res.send(course);
});

//this one uses input validation with joi
app.post("/api/coursesJoiValid", (req, res) => {
  const { error } = validateCourse(req.body); // error is object destructured from result last line

  if (error) {
    res.status(400).send(result.error.message);
    return;
  }
  const course = { id: courses.length + 1, name: req.body.name };
  //have to enable parsing of json objects
  // see top of file app.use
  courses.push(course);
  res.send(course);
});

/*
PUTS
++++++++++++++++++++++++++++++++++++++++++++++
*/

app.put("/api/coursesput/:id", (req, res) => {
  //look up the course
  //if not exist return 404

  const course = courses.find((c) => c.id === parseInt(req.params.id));
  console.log("inapp", req.params);
  if (!course) {
    res.status(404).send("course was not found");
    return;
  }
  //validate return 400 if false
  //const result = validateCourse(req.body)
  const { error } = validateCourse(req.body); // error is object destructured from result last line

  if (error) {
    res.status(400).send(error.message);
    return;
  }

  //update course
  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  //look up the course
  //not exist return 404\
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  console.log("inapp", req.params);
  if (!course) {
    res.status(404).send("course was not found");
  }
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

function validateCourse(course) {
  const schema = { name: Joi.string().min(3).required() };
  return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

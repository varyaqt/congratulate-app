const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/todo-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
mongoose.set("debug", true) // enabling debugging information to be printed to the console for debugging purposes
mongoose.Promise = Promise // setting mongoose's Promise to use Node's Promise
module.exports.Todo = require("./todo")
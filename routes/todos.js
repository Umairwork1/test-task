const express = require("express");
const router = express.Router();
const { Todo, validate } = require("../models/todo");

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort("title");
    res.send(todos);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong! Contact admin!");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const found = await Todo.findById(id);
    if (!found) return res.status(404).send(`Todo with id ${id} not found!`);
    res.send(found);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong! Contact admin!");
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let todo = new Todo({
      title: req.body.title,
      description: req.body.description || "",
    });
    todo = await todo.save();
    res.send(todo);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong! Contact admin!");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description || "",
      },
      { new: true }
    );
    res.send(todo);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong! Contact admin!");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const found = await Todo.findByIdAndRemove(id);
    if (!found) return res.status(404).send(`Todo with id ${id} not found!`);
    res.send(found);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong! Contact admin!");
  }
});

module.exports = router;

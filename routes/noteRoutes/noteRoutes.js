const fs = require("fs")
const path = require("path")
const router = require("express").Router()
const notes = require("../../data/db.json")

//displays all notes data
router.get("/notes", (req, res) => {
    results = notes
    res.json(notes)
})

//post the new note
router.post("/notes", (req, res) => {

    const newNote = {
        id: notes.length +1,
        title: req.body.title,
        text: req.body.text
    }
    notes.push(newNote)

    fs.writeFileSync("./data/db.json", JSON.stringify(notes))
    res.send(notes)
})

//deletes note based on id
router.delete("/notes/:id", (req, res) => {
    const newArray = notes.filter(note => note.id != parseInt(req.params.id))
    fs.writeFileSync("./data/db.json", JSON.stringify(newArray))
    res.json(notes)
})

module.exports = router
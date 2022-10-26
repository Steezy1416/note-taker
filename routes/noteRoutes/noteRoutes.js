const fs = require("fs")
const path = require("path")
const router = require("express").Router()
const notes = require("../../data/db.json")

//displays all notes data
router.get("/notes", (req, res) => {
    results = notes
    res.json(notes)
})

//gets a specific note based on id
router.get("/notes/:id", (req, res) => {
    const noteSelected = notes.filter(note => note.id === parseInt(req.body.id))
    fs.writeFileSync("./data/db.json", JSON.stringify(notes), null, 2 )
    res.json(noteSelected)
})

//post the new note
router.post("/notes", (req, res) => {

    const newNote = {
        id: notes.length +1,
        title: req.body.title,
        text: req.body.text
    }
    notes.push(newNote)

    fs.writeFileSync("./data/db.json", JSON.stringify(notes), null, 2)
    res.send(notes)
})

//deletes note based on id
router.delete("/notes/:id", (req, res) => {
    const newArray = notes.filter(note => note.id != parseInt(req.body.id))
    fs.writeFileSync("./data/db.json", JSON.stringify(notes), null, 2 )
    res.json(newArray)
})

module.exports = router
const fs = require("fs")
const path = require("path")
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3001;
const {notes} = require("./data/db.json")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

//displays all notes data
app.get("/notes", (req, res) => {
    results = notes
    res.json(notes)
})

//gets a specific note based on id
app.get("/notes/:id", (req, res) => {
    const noteSelected = notes.filter(note => note.id === parseInt(req.params.id))
    fs.writeFileSync(path.join(__dirname, "./data/db.json"), JSON.stringify({notes}), null, 2 )
    res.json(noteSelected)
})

//post the new note
app.post("/notes", (req, res) => {

    newNote = req.body
    newNote.id = notes.length + 1
    notes.push(newNote)
    fs.writeFileSync(path.join(__dirname, "./data/db.json"),JSON.stringify({notes}, null, 2))
    res.send(notes)
})

//deletes note based on id
app.delete("/notes/:id", (req, res) => {
    const newArray = notes.filter(note => note.id != parseInt(req.params.id))
    fs.writeFileSync(path.join(__dirname, "./data/db.json"), JSON.stringify({notes}), null, 2 )
    res.json(newArray)
})


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"))
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"))
})


app.listen(PORT, (req, res) => {
    console.log("A request has been made")
})
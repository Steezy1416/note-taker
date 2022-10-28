const express = require("express")
const app = express()
const PORT = process.env.PORT || 3001;
const htmlRoutes = require("./routes/htmlRoutes/html")
const noteRoutes = require("./routes/noteRoutes")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

app.use("/api", noteRoutes)
app.use("/", htmlRoutes)

app.listen(PORT, (req, res) => {
    console.log("A request has been made")
})
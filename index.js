const fs = require("fs");
const yup = require("yup");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const express = require("express");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;

const JSONData = path.join(__dirname, "public/repertoire.json");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/songs", (req, res) => {
  try {
    const songs = JSON.parse(fs.readFileSync(JSONData, "utf-8"));
    res.json(songs);
  } catch (e) {
    console.log(e);
  }
});

const dataSchema = yup.object().shape({
  title: yup.string().required(),
  artist: yup.string().required(),
  key: yup.string().matches(/^([A-G][b#]?|[A-G][b#]?m)$/, "Invalid key"),
});

app.post("/songs", (req, res) => {
  try {
    dataSchema.validateSync(req.body);

    const newSong = { ...req.body, id: uuidv4() };
    const songs = JSON.parse(fs.readFileSync(JSONData));
    songs.push(newSong);
    fs.writeFileSync(JSONData, JSON.stringify(songs));
    res.send("Song successfully registered!");
  } catch (err) {
    console.log(`Error: ${err.message}`);
    res.status(400).send(err.message);
  }
});

app.delete("/songs/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ message: "Missing id parameter" });
  }
  const songs = JSON.parse(fs.readFileSync(JSONData));
  const index = songs.findIndex((s) => s.id == id);
  if (index === -1) {
    return res.status(404).send({ message: "Song not found" });
  }
  songs.splice(index, 1);
  fs.writeFileSync(JSONData, JSON.stringify(songs));
  res.status(204).send();
});

const updateSchema = yup.object().shape({
  title: yup.string().notRequired(),
  artist: yup.string().notRequired(),
  key: yup
    .string()
    .matches(/^([A-G][b#]?|[A-G][b#]?m)$/, "Invalid key")
    .notRequired(),
});

app.put("/songs/:id", (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "Missing id parameter" });
    }

    // Validate the request body using the dataSchema
    updateSchema.validateSync(req.body);

    // Get the list of songs and find the index of the song to update
    const songs = JSON.parse(fs.readFileSync(JSONData));
    const index = songs.findIndex((s) => s.id == id);
    if (index === -1) {
      return res.status(404).send({ message: "Song not found" });
    }

    // Update the song at the specified index
    songs[index] = { ...songs[index], ...req.body };
    fs.writeFileSync(JSONData, JSON.stringify(songs));
    res.status(200).send({ message: "Song successfully edited!" });
  } catch (err) {
    console.log(`Error: ${err.status} - ${err.message}`);
    res.status(400).send({ message: err.message });
  }
});

app.listen(3000, console.log(`¡Server is ON in port ${port}!`));

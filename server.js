const express = require("express");
const app = express();
const port = 4000;
const path = require("path");
app.use(express.static("public"));
app.use(express.json());
const fs = require("fs");

app.get("/", (request, respond) => {
  respond.sendFile(path.join(__dirname + "/public/index.html"));
});
app.get("/notes", (request, respond) => {
  respond.sendFile(path.join(__dirname + "/public/notes.html"));
});

app.get("/api/notes", (request, respond) => {
  let notes = fs.readFileSync("./db/db.json");
  respond.json(JSON.parse(notes));
});
app.post("/api/notes", (request, respond) => {
  let notes = fs.readFileSync("./db/db.json");
  let object = JSON.parse(notes);
  object.push(request.body);
  fs.writeFile("./db/db.json", JSON.stringify(object), () => {
    respond.sendStatus(200);
  });
});

app.delete("/api/notes/:id", (request, respond) => {
  const id = request.params.id;
  let notes = fs.readFileSync("./db/db.json");
  let object = JSON.parse(notes);
  object.splice(id, 1);
  fs.writeFile("./db/db.json", JSON.stringify(object), () => {
    respond.sendStatus(200);
  });
});

app.listen(port, () => console.log("server is working"));

import Database from 'better-sqlite3';
import express from 'express';
import cors from 'cors';

const db = new Database("my_cooking_week.db");
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
    const rows = db.prepare("SELECT * FROM recipes;").all();

    return res.json(rows);
})

app.post('/addRecipe', function (req, res) {
    const insertData = db.prepare("INSERT INTO recipes (name, instructions) VALUES (?, ?)");
    const a = insertData.run(req.body.name, req.body.instructions);
    return res.json({"id": String(a.lastInsertRowid)});
})

app.post('/delRecipe', function(req, res) {
    const delData = db.prepare("DELETE FROM recipes WHERE id=(?)");
    delData.run(parseInt(req.body.id));

    res.send();
})

app.listen(3000);
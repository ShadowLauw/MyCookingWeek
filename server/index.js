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
    insertData.run(req.body.name, req.body.instructions);
})

app.listen(3000);
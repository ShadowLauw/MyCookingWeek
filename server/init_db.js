// const db = require('better-sqlite3')('cooking.db');

// db.prepare(
// `CREATE TABLE recipes (
// 	recipe_id INTEGER PRIMARY KEY,
// 	name TEXT NOT NULL UNIQUE
// );`
// ).run();

import Database from "better-sqlite3";

const db = new Database("my_cooking_week.db");

const query = `
	CREATE TABLE recipes (
		id INTEGER PRIMARY KEY,
		name STRING NOT NULL UNIQUE,
		instructions TEXT 
	);
`;

db.exec(query);
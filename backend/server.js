const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const pool = require("./db");

app.get("/projects", async (req, res) => {
  try{
    const result = await pool.query("SELECT * FROM projects");
    res.status(200).json(result.rows);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.post("/projects", async (req, res) => {

  try{
    const { name, description } = req.body;
    const result = await pool.query(
      "INSERT INTO projects (name, description) VALUES ($1, $2) RETURNING *",
      [name, description]
    );
    res.status(201).json(result.rows[0]);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


app.delete("/projects/:id", async (req, res) => {

  try{
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM projects WHERE id = $1 RETURNING *",
      [id]
    );
    res.status(200).json(result.rows[0]);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
  
});

///////////

app.get("/projects/:id/tasks", async (req, res) => {
  try{
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM tasks WHERE project_id=$1",
    [id]
    );
    res.status(200).json(result.rows);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.post("/projects/:id/tasks", async (req, res) => {
  try{
    const { name, description, status, priority } = req.body;
    const { id } = req.params;
    const result = await pool.query(
      "INSERT INTO tasks (project_id, name, description, status, priority) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [id, name, description, status, priority]
    );
    res.status(201).json(result.rows[0]);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try{
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *",
      [id]
    );
    res.status(200).json(result.rows[0]);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
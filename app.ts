import express from "express";
import { pool } from "./src/repository/etudiantRepository";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  getAllEtudiantsController,
  getAllNamesController,
  postStudentsController,
  deleteEtudiantController,
  patchEtudiantController,
} from "./src/controller/etudiantController";
import { authenticateToken } from "./src/middleware/authMiddleware"; 
dotenv.config();
const app = express();
app.use(express.json());

app.get("/names", getAllNamesController); 
app.get("/etudiants", authenticateToken, getAllEtudiantsController);
app.post("/etudiants", authenticateToken, postStudentsController);
app.delete("/etudiants/:id", authenticateToken, deleteEtudiantController);
app.patch("/etudiants/:id", authenticateToken, patchEtudiantController);
app.post("/login", async (req, res) => {
  const { email } = req.body;
  try {
    const result = await pool.query("SELECT * FROM etudiants WHERE email = $1", [email]);
   
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Unknown mail" });
    }
    const etudiant = result.rows[0];
    
    const token = jwt.sign(
      { id: etudiant.id, email: etudiant.email }, 
      process.env.JWT_SECRET as string,
      { expiresIn: "2h" } 
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Serveur sur http://localhost:${PORT}`));
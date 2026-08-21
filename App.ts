import express from "express";
import { pool } from "./src/repository/StudentRepository";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  getAllStudentsController,
  getAllNamesController,
  postStudentsController,
  deleteStudentController,
  patchStuentController,
  getStudentCountController
} from "./src/controller/StudentController";
import { authenticateToken } from "./src/middleware/authMiddleware"; 
dotenv.config();
const app = express();
app.use(express.json());

app.get("/names", getAllNamesController); 
app.get("/students", authenticateToken, getAllStudentsController);
app.post("/students", authenticateToken, postStudentsController);
app.get("/students/count", authenticateToken, getStudentCountController);
app.delete("/students/:id", authenticateToken, deleteStudentController);
app.patch("/students/:id", authenticateToken, patchStuentController);
app.post("/login", async (req, res) => {
  const { email } = req.body;
  try {
    const result = await pool.query("SELECT * FROM students WHERE email = $1", [email]);
   
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Unknown mail" });
    }
    const student = result.rows[0];
    
    const token = jwt.sign(
      { id: student.id, email: student.email }, 
      process.env.JWT_SECRET as string,
      { expiresIn: "2h" } 
    );
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Serveur sur http://localhost:${PORT}`));
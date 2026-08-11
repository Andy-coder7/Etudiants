import express from "express";
import dotenv from "dotenv";
import {
  getAllEtudiantsController,
  getAllNamesController,
  postStudentsController,
  deleteEtudiantController,
  patchEtudiantController,
} from "./src/controller/etudiantController";

dotenv.config();

const app = express();
app.use(express.json()); 

app.get("/etudiants", getAllEtudiantsController);
app.get("/names", getAllNamesController);
app.post("/etudiants", postStudentsController);
app.delete("/etudiants/:id", deleteEtudiantController);
app.patch("/etudiants/:id", patchEtudiantController);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Serveur sur http://localhost:${PORT}`));
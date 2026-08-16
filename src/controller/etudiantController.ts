import { Request, Response } from "express";
import {
  getAllEtudiants,
  getAllNames,
  createStudent,
  deleteStudent,
  updateStudent,
} from "../service/etudiantService";

export const getAllEtudiantsController = async(req: Request, res: Response) => {
  const etudiants = await getAllEtudiants();
  res.json(etudiants);
}

export const getAllNamesController = async(req: Request, res: Response) => {
  const names = await getAllNames();
  res.json(names);
}

export const postStudentsController = async(req: Request, res: Response) => {
  try {
    const { nom, prenom, email } = req.body;
    if (!nom || !prenom || !email) {
      return res.status(400).json({ error: "nom, prenom et email sont requis" });
    }
    const newEtudiant = await createStudent({ nom, prenom, email });
    res.status(201).json(newEtudiant);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export const deleteEtudiantController = async(req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "id invalide" });
    await deleteStudent(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export const patchEtudiantController = async(req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "id invalide" });
    const updated = await updateStudent(id, req.body);
    if (!updated) return res.status(404).json({ error: "Étudiant non trouvé" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
}
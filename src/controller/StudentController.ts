import { Request, Response } from "express";
import {
  getAllStudentsService,
  getAllNamesService,
  createStudentService,
  deleteStudentService,
  updateStudentService,
  getStudentCountService
} from "../service/StudentService";

export const getAllStudentsController = async(req: Request, res: Response) => {
  const students = await getAllStudentsService();
  res.json(students);
}

export const getAllNamesController = async(req: Request, res: Response) => {
  const names = await getAllNamesService();
  res.json(names);
}

export const postStudentsController = async(req: Request, res: Response) => {
  try {
    const { lastName, firstName, email } = req.body;
    if (!lastName || !firstName || !email) {
      return res.status(400).json({ error: "firstName, lastName and mails are required" });
    }
    const newStudent = await createStudentService({ lastName, firstName, email });
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

export const deleteStudentController = async(req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "id undefined" });
    await deleteStudentService(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

export const patchStuentController = async(req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "id undefined" });
    const updated = await updateStudentService(id, req.body);
    if (!updated) return res.status(404).json({ error: "Student not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
export const getStudentCountController = async(req: Request, res: Response) => {
  try {
    const count = await getStudentCountService();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
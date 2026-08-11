import { findAll, findName, insertEtudiant, deleteEtudiant, updateEtudiant } from "../repository/etudiantRepository";
import { Etudiant } from "../models/etudiantModels";

export async function getAllEtudiants(): Promise<Etudiant[]> {
  return await findAll();
}

export async function getAllNames(): Promise<string[]> {
  return await findName();
}

export async function createStudent(etudiant: Omit<Etudiant, "id">): Promise<Etudiant> {
  return await insertEtudiant(etudiant);
}

export async function deleteStudent(id: number): Promise<void> {
  return await deleteEtudiant(id);
}

export async function updateStudent(id: number, etudiant: Partial<Etudiant>): Promise<Etudiant | null> {
  return await updateEtudiant(id, etudiant);
}
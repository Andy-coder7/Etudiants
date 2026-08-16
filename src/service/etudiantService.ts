import { findAll, findName, insertEtudiant, deleteEtudiant, updateEtudiant } from "../repository/etudiantRepository";
import { Etudiant } from "../models/etudiantModels";

export const getAllEtudiants = async (): Promise<Etudiant[]> => {
  return await findAll();
}

export const getAllNames= async(): Promise<string[]> => {
  return await findName();
}

export const createStudent= async(etudiant: Omit<Etudiant, "id">): Promise<Etudiant> => {
  return await insertEtudiant(etudiant);
}

export const deleteStudent = async(id: number): Promise<void> =>{
  return await deleteEtudiant(id);
}

export const updateStudent = async(id: number, etudiant: Partial<Etudiant>): Promise<Etudiant | null> =>{
  return await updateEtudiant(id, etudiant);
}
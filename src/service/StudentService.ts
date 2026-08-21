import { findAll, findName, insertStudent, deleteStudent, updateStudent, countStudents } from "../repository/StudentRepository";
import { Student } from "../models/StudentModels";

export const getAllStudentsService = async (): Promise<Student[]> => {
  return await findAll();
}

export const getAllNamesService= async(): Promise<string[]> => {
  return await findName();
}

export const createStudentService= async(student: Omit<Student, "id">): Promise<Student> => {
  return await insertStudent(student);
}

export const deleteStudentService = async(id: number): Promise<void> =>{
  return await deleteStudent(id);
}

export const updateStudentService = async(id: number, student: Partial<Student>): Promise<Student | null> =>{
  return await updateStudent(id, student);
}
export const getStudentCountService = async (): Promise<number> => {
  return await countStudents();
}
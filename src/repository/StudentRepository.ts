import { Pool } from "pg";
import dotenv from "dotenv";
import { Student } from "../models/StudentModels";

dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
});

export  const findAll = async(): Promise<Student[]> => {
  const result = await pool.query("SELECT * FROM students");
  return result.rows;
}

export const findName= async (): Promise<string[]> =>{
  const resultNames = await pool.query("SELECT lastName FROM students");
  return resultNames.rows.map(x => x.lastName);
}

export const  insertStudent = async(student: Omit<Student, "id">): Promise<Student> =>{
  const result = await pool.query(
    "INSERT INTO students (lastName, firstName, email) VALUES ($1, $2, $3) RETURNING *",
    [student.lastName, student.firstName, student.email]
  );
  return result.rows[0];
}

export const  deleteStudent= async(id: number): Promise<void> => {
  await pool.query("DELETE FROM students WHERE id = $1", [id]);
}

export const updateStudent = async(id: number, student: Partial<Student>): Promise<Student | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  for (const [key, value] of Object.entries(student)) {
    if (key === "id") continue;
    fields.push(`${key} = $${idx}`);
    values.push(value);
    idx++;
  }

  if (fields.length === 0) return null;

  values.push(id);
  const result = await pool.query(
    `UPDATE students SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *`,
    values
  );
  return result.rows[0] || null;
}
export const countStudents = async (): Promise<number> => {
  const result = await pool.query("SELECT COUNT(*) AS count FROM students");
  return parseInt(result.rows[0].count, 10);
}
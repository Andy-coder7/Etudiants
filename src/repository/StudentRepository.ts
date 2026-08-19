import { Pool } from "pg";
import dotenv from "dotenv";
import { Etudiant } from "../models/etudiantModels";

dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
});

export  const findAll = async(): Promise<Etudiant[]> => {
  const result = await pool.query("SELECT * FROM etudiants");
  return result.rows;
}

export const findName= async (): Promise<string[]> =>{
  const resultNames = await pool.query("SELECT nom FROM etudiants");
  return resultNames.rows.map(x => x.nom);
}

export const  insertEtudiant = async(etudiant: Omit<Etudiant, "id">): Promise<Etudiant> =>{
  const result = await pool.query(
    "INSERT INTO etudiants (nom, prenom, email) VALUES ($1, $2, $3) RETURNING *",
    [etudiant.nom, etudiant.prenom, etudiant.email]
  );
  return result.rows[0];
}

export const  deleteEtudiant= async(id: number): Promise<void> => {
  await pool.query("DELETE FROM etudiants WHERE id = $1", [id]);
}

export const updateEtudiant = async(id: number, etudiant: Partial<Etudiant>): Promise<Etudiant | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  for (const [key, value] of Object.entries(etudiant)) {
    if (key === "id") continue;
    fields.push(`${key} = $${idx}`);
    values.push(value);
    idx++;
  }

  if (fields.length === 0) return null;

  values.push(id);
  const result = await pool.query(
    `UPDATE etudiants SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *`,
    values
  );
  return result.rows[0] || null;
}
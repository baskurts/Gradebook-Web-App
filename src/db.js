// src/db.js
import Dexie from "dexie";

// Veritabanını oluştur
export const db = new Dexie("GradebookDB");

db.version(1).stores({
  courses: "++id, name",
  students: "++id, fullname, email, courseId",
  assignments: "++id, name, totalPoints, courseId",
  grades: "++id, assignmentId, studentId, score"
});

// Kursları getir
export const getCourses = async () => {
  return await db.courses.toArray();
};

// Öğrencileri getir
export const getStudents = async () => {
  return await db.students.toArray();
};

// Ödevleri getir
export const getAssignments = async () => {
  return await db.assignments.toArray();
};
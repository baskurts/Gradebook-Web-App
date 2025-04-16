import Dexie from 'dexie';

export const db = new Dexie('gradebookDB');

db.version(1).stores({
  courses: '++id,name',
  students: '++id,fullname,email',
  assignments: '++id,name,totalPoints'
});
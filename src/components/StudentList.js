import React, { useState } from 'react';
import { db } from '../db';
import { useLiveQuery } from 'dexie-react-hooks';

function StudentList() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const students = useLiveQuery(() => db.students.toArray(), []);

  const addStudent = async () => {
    if (fullName.trim() === '' || email.trim() === '') return;
    await db.students.add({ fullname: fullName, email: email });
    setFullName('');
    setEmail('');
  };

  const deleteStudent = async (id) => {
    await db.students.delete(id);
  };

  return (
    <div className="section">
      <h2>👤 Students</h2>
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Full name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button className="add" onClick={addStudent}>Add</button>
      <ul>
        {students?.map(student => (
          <li key={student.id}>
            {student.fullname} - {student.email}
            <button className="delete" onClick={() => deleteStudent(student.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;